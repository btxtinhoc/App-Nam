import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { spawn, execSync } from 'child_process';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Temp directory for safe execution
const TEMP_DIR = path.join(os.tmpdir(), 'codelab_offline_sandbox');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Check system tools on startup
let pythonAvailable = false;
let pythonVersion = '';
let cppAvailable = false;
let cppVersion = '';

try {
  const pyOut = execSync('python3 --version', { encoding: 'utf8' }).trim();
  pythonAvailable = true;
  pythonVersion = pyOut;
} catch (e) {
  pythonAvailable = false;
}

try {
  const cppOut = execSync('g++ --version', { encoding: 'utf8' }).split('\n')[0];
  cppAvailable = true;
  cppVersion = cppOut;
} catch (e) {
  cppAvailable = false;
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', offline: true, timestamp: Date.now() });
});

// 2. System status (detect local compilers)
app.get('/api/system-status', (req, res) => {
  res.json({
    platform: process.platform,
    python: {
      available: pythonAvailable,
      version: pythonVersion,
    },
    cpp: {
      available: cppAvailable,
      version: cppVersion,
    },
    tempDir: TEMP_DIR,
  });
});

// Safety checks for code execution
function checkSecurityRisk(code: string, lang: 'python' | 'cpp'): string | null {
  if (lang === 'python') {
    const dangerous = [
      /\bimport\s+os\b/,
      /\bimport\s+subprocess\b/,
      /\bimport\s+shutil\b/,
      /\b__import__\b/,
      /\bos\.system\b/,
      /\bos\.remove\b/,
      /\bos\.rmdir\b/,
      /\bopen\s*\(\s*['"]\/(etc|sys|proc|root|boot)/,
    ];
    for (const pattern of dangerous) {
      if (pattern.test(code)) {
        return 'Lệnh bị hạn chế vì lý do an toàn môi trường phòng máy.';
      }
    }
  } else if (lang === 'cpp') {
    const dangerous = [
      /\bsystem\s*\(/,
      /\bfork\s*\(/,
      /\bexecl\s*\(/,
      /\bexecv\s*\(/,
      /\bkill\s*\(/,
      /\bremove\s*\(\s*["']\/(etc|sys|proc|root)/,
    ];
    for (const pattern of dangerous) {
      if (pattern.test(code)) {
        return 'Lệnh bị hạn chế vì lý do an toàn môi trường phòng máy.';
      }
    }
  }
  return null;
}

// 3. Execute Python Code
app.post('/api/execute/python', async (req, res) => {
  const { code, stdin = '' } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Mã nguồn không hợp lệ.' });
  }

  const securityErr = checkSecurityRisk(code, 'python');
  if (securityErr) {
    return res.json({
      stdout: '',
      stderr: `[Security Warning] ${securityErr}`,
      exitCode: 1,
      executionTimeMs: 0,
      error: securityErr,
    });
  }

  const fileId = `py_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const filePath = path.join(TEMP_DIR, `${fileId}.py`);

  try {
    fs.writeFileSync(filePath, code, 'utf8');
  } catch (err: any) {
    return res.status(500).json({ error: 'Không thể ghi file thực thi tạm.' });
  }

  const startTime = Date.now();
  const timeoutMs = 5000; // 5 seconds timeout
  let stdout = '';
  let stderr = '';
  let timedOut = false;

  const child = spawn('python3', [filePath], {
    cwd: TEMP_DIR,
    env: { ...process.env, PYTHONUNBUFFERED: '1' },
  });

  if (stdin) {
    child.stdin.write(stdin);
    child.stdin.end();
  } else {
    child.stdin.end();
  }

  const timer = setTimeout(() => {
    timedOut = true;
    try {
      child.kill('SIGKILL');
    } catch (_) {}
  }, timeoutMs);

  child.stdout.on('data', (data) => {
    if (stdout.length < 50000) {
      stdout += data.toString();
    }
  });

  child.stderr.on('data', (data) => {
    if (stderr.length < 50000) {
      stderr += data.toString();
    }
  });

  child.on('close', (exitCode) => {
    clearTimeout(timer);
    const executionTimeMs = Date.now() - startTime;
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (_) {}

    if (timedOut) {
      return res.json({
        stdout,
        stderr: stderr + '\n[Lỗi Timeout] Chương trình chạy quá thời gian cho phép (5s). Có thể có vòng lặp vô tận.',
        exitCode: 124,
        executionTimeMs,
        error: 'Timeout (Vòng lặp vô tận hoặc đang chờ dữ liệu đầu vào)',
      });
    }

    res.json({
      stdout,
      stderr,
      exitCode: exitCode ?? 0,
      executionTimeMs,
    });
  });

  child.on('error', (err) => {
    clearTimeout(timer);
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (_) {}
    res.json({
      stdout: '',
      stderr: `Lỗi khởi chạy Python: ${err.message}`,
      exitCode: 1,
      executionTimeMs: Date.now() - startTime,
      error: err.message,
    });
  });
});

// 4. Execute C++ Code (Compile + Run)
app.post('/api/execute/cpp', async (req, res) => {
  const { code, stdin = '' } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Mã nguồn không hợp lệ.' });
  }

  const securityErr = checkSecurityRisk(code, 'cpp');
  if (securityErr) {
    return res.json({
      stdout: '',
      stderr: `[Security Warning] ${securityErr}`,
      exitCode: 1,
      executionTimeMs: 0,
      compiled: false,
      error: securityErr,
    });
  }

  const fileId = `cpp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const srcPath = path.join(TEMP_DIR, `${fileId}.cpp`);
  const binPath = path.join(TEMP_DIR, `${fileId}.out`);

  try {
    fs.writeFileSync(srcPath, code, 'utf8');
  } catch (err: any) {
    return res.status(500).json({ error: 'Không thể ghi file C++ tạm.' });
  }

  // Step 1: Compile with g++
  const compileStartTime = Date.now();
  let compileStderr = '';
  let compileSuccess = false;

  try {
    const compileChild = spawn('g++ -O2 -std=c++17 "' + srcPath + '" -o "' + binPath + '"', {
      shell: true,
      cwd: TEMP_DIR,
    });

    compileChild.stderr.on('data', (d) => {
      compileStderr += d.toString();
    });

    await new Promise<void>((resolve) => {
      compileChild.on('close', (cCode) => {
        compileSuccess = cCode === 0;
        resolve();
      });
      compileChild.on('error', (err) => {
        compileStderr += err.message;
        resolve();
      });
    });
  } catch (err: any) {
    compileStderr += err.message;
  }

  if (!compileSuccess) {
    try {
      if (fs.existsSync(srcPath)) fs.unlinkSync(srcPath);
      if (fs.existsSync(binPath)) fs.unlinkSync(binPath);
    } catch (_) {}

    return res.json({
      stdout: '',
      stderr: compileStderr || 'Lỗi biên dịch C++ (Compile Error).',
      exitCode: 1,
      executionTimeMs: Date.now() - compileStartTime,
      compiled: false,
      error: 'Compile Error',
    });
  }

  // Step 2: Execute compiled binary
  const runStartTime = Date.now();
  let runStdout = '';
  let runStderr = '';
  let timedOut = false;
  const timeoutMs = 5000;

  const runChild = spawn(binPath, [], {
    cwd: TEMP_DIR,
  });

  if (stdin) {
    runChild.stdin.write(stdin);
    runChild.stdin.end();
  } else {
    runChild.stdin.end();
  }

  const timer = setTimeout(() => {
    timedOut = true;
    try {
      runChild.kill('SIGKILL');
    } catch (_) {}
  }, timeoutMs);

  runChild.stdout.on('data', (data) => {
    if (runStdout.length < 50000) {
      runStdout += data.toString();
    }
  });

  runChild.stderr.on('data', (data) => {
    if (runStderr.length < 50000) {
      runStderr += data.toString();
    }
  });

  runChild.on('close', (exitCode) => {
    clearTimeout(timer);
    const executionTimeMs = Date.now() - runStartTime;
    try {
      if (fs.existsSync(srcPath)) fs.unlinkSync(srcPath);
      if (fs.existsSync(binPath)) fs.unlinkSync(binPath);
    } catch (_) {}

    if (timedOut) {
      return res.json({
        stdout: runStdout,
        stderr: runStderr + '\n[Lỗi Timeout] Chương trình chạy quá thời gian (5s). Có thể gặp vòng lặp vô tận.',
        exitCode: 124,
        executionTimeMs,
        compiled: true,
        error: 'Timeout / Infinite loop',
      });
    }

    res.json({
      stdout: runStdout,
      stderr: runStderr,
      exitCode: exitCode ?? 0,
      executionTimeMs,
      compiled: true,
    });
  });

  runChild.on('error', (err) => {
    clearTimeout(timer);
    try {
      if (fs.existsSync(srcPath)) fs.unlinkSync(srcPath);
      if (fs.existsSync(binPath)) fs.unlinkSync(binPath);
    } catch (_) {}

    res.json({
      stdout: '',
      stderr: `Lỗi thực thi: ${err.message}`,
      exitCode: 1,
      executionTimeMs: Date.now() - runStartTime,
      compiled: true,
      error: err.message,
    });
  });
});

// Vite & Static file setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CodeLab Offline] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
