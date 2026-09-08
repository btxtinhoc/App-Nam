import { Language, RunResult, GradeResult, TestCase, HtmlCssRule } from '../types';

// Safe in-browser Python fallback interpreter for basic THCS/THPT curriculum
function runClientSidePython(code: string, stdin: string): RunResult {
  const startTime = Date.now();
  let stdout = '';
  let stderr = '';
  const lines = code.split('\n');
  const stdinLines = stdin.split('\n');
  let stdinIndex = 0;

  try {
    // Basic state machine for variables and simple expressions
    const vars: Record<string, any> = {};

    function evaluateExpr(expr: string): any {
      expr = expr.trim();
      // string literal
      if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
        return expr.slice(1, -1);
      }
      // int/float literal
      if (!isNaN(Number(expr))) {
        return Number(expr);
      }
      // boolean
      if (expr === 'True') return true;
      if (expr === 'False') return false;

      // input()
      if (expr.startsWith('input(') || expr === 'input()') {
        return stdinLines[stdinIndex++] || '';
      }
      // int(input())
      if (expr.startsWith('int(input(') || expr === 'int(input())') {
        const val = stdinLines[stdinIndex++] || '0';
        return parseInt(val.trim(), 10) || 0;
      }
      // float(input())
      if (expr.startsWith('float(input(') || expr === 'float(input())') {
        const val = stdinLines[stdinIndex++] || '0';
        return parseFloat(val.trim()) || 0;
      }

      // Variable lookup
      if (vars[expr] !== undefined) {
        return vars[expr];
      }

      // Simple arithmetic with two operands
      const binaryMatch = expr.match(/^(.+?)\s*([\+\-\*\/%]|==|!=|>=|<=|>|<|\*\*|\/\/)\s*(.+)$/);
      if (binaryMatch) {
        const left = evaluateExpr(binaryMatch[1]);
        const op = binaryMatch[2];
        const right = evaluateExpr(binaryMatch[3]);
        switch (op) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/': return left / right;
          case '//': return Math.floor(left / right);
          case '%': return left % right;
          case '**': return Math.pow(left, right);
          case '==': return left === right;
          case '!=': return left !== right;
          case '>': return left > right;
          case '<': return left < right;
          case '>=': return left >= right;
          case '<=': return left <= right;
        }
      }

      return expr;
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;

      // print(...)
      if (line.startsWith('print(') && line.endsWith(')')) {
        const inner = line.slice(6, -1);
        // split arguments by comma outside quotes
        const args = inner.split(',').map(a => evaluateExpr(a));
        stdout += args.join(' ') + '\n';
        continue;
      }

      // Assignment: var = val
      const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const varExpr = assignMatch[2];
        vars[varName] = evaluateExpr(varExpr);
        continue;
      }
    }

    return {
      stdout,
      stderr: '',
      exitCode: 0,
      executionTimeMs: Date.now() - startTime,
    };
  } catch (err: any) {
    return {
      stdout,
      stderr: `Client Python Runtime Error: ${err.message}`,
      exitCode: 1,
      executionTimeMs: Date.now() - startTime,
    };
  }
}

// 1. Run single execution
export async function executeCode(language: Language, code: string, stdin: string = ''): Promise<RunResult> {
  if (language === 'html' || language === 'css') {
    // HTML / CSS preview
    return {
      stdout: 'Đã cập nhật khung xem trước (Live Preview).',
      stderr: '',
      exitCode: 0,
      executionTimeMs: 15,
      compiled: true,
    };
  }

  const endpoint = language === 'python' ? '/api/execute/python' : '/api/execute/cpp';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, stdin }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data: RunResult = await response.json();
    return data;
  } catch (err: any) {
    // Server is unreachable - fallback client runner if Python
    if (language === 'python') {
      return runClientSidePython(code, stdin);
    }

    return {
      stdout: '',
      stderr: `Không thể kết nối đến trình thực thi cục bộ: ${err.message}. Đảm bảo máy chủ CodeLab đang chạy.`,
      exitCode: 1,
      executionTimeMs: 0,
      error: err.message,
    };
  }
}

// 2. Chấm bài tự động (Offline Auto Grading)
export async function autoGradeCode(
  language: Language,
  code: string,
  testCases?: TestCase[],
  htmlCssRules?: HtmlCssRule[]
): Promise<GradeResult> {
  // Case 1: HTML / CSS grading via DOM inspector
  if (language === 'html' || language === 'css') {
    return gradeHtmlCss(code, htmlCssRules || []);
  }

  // Case 2: Python / C++ grading via multiple test cases
  if (!testCases || testCases.length === 0) {
    return {
      score: 100,
      passedCount: 1,
      totalCount: 1,
      details: [{ description: 'Không có test case tự động.', passed: true }],
    };
  }

  const details: GradeResult['details'] = [];
  let passedCount = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    try {
      const runRes = await executeCode(language, code, tc.input);
      const cleanActual = runRes.stdout.replace(/\r\n/g, '\n').trim();
      const cleanExpected = tc.expectedOutput.replace(/\r\n/g, '\n').trim();

      const passed = cleanActual === cleanExpected && runRes.exitCode === 0;
      if (passed) passedCount++;

      details.push({
        description: tc.description || `Test case ${i + 1}`,
        passed,
        input: tc.input.trim() || '(Không có input)',
        expected: cleanExpected,
        actual: cleanActual || (runRes.stderr ? `[Lỗi] ${runRes.stderr.trim()}` : '(Trống)'),
        error: runRes.stderr || undefined,
      });
    } catch (err: any) {
      details.push({
        description: tc.description || `Test case ${i + 1}`,
        passed: false,
        input: tc.input.trim(),
        expected: tc.expectedOutput.trim(),
        actual: 'Lỗi thực thi',
        error: err.message,
      });
    }
  }

  const score = Math.round((passedCount / testCases.length) * 100);
  return {
    score,
    passedCount,
    totalCount: testCases.length,
    details,
  };
}

// DOM & CSS grading function
function gradeHtmlCss(code: string, rules: HtmlCssRule[]): GradeResult {
  if (rules.length === 0) {
    return {
      score: 100,
      passedCount: 1,
      totalCount: 1,
      details: [{ description: 'Trang HTML/CSS hợp lệ.', passed: true }],
    };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(code, 'text/html');
  const details: GradeResult['details'] = [];
  let passedCount = 0;

  for (const rule of rules) {
    let passed = false;
    let actualMsg = 'Không tìm thấy phần tử yêu cầu';

    try {
      if (rule.selector) {
        const elements = doc.querySelectorAll(rule.selector);
        if (elements.length > 0) {
          passed = true;
          actualMsg = `Đã tìm thấy ${elements.length} phần tử phù hợp selector "${rule.selector}"`;

          // If textContains check
          if (rule.textContains) {
            const hasText = Array.from(elements).some(el =>
              (el.textContent || '').toLowerCase().includes(rule.textContains!.toLowerCase())
            );
            passed = hasText;
            actualMsg = hasText
              ? `Phần tử có chứa chữ "${rule.textContains}"`
              : `Phần tử chưa chứa đúng nội dung "${rule.textContains}"`;
          }

          // If CSS property check inside inline style or <style> tags
          if (rule.cssProperty) {
            const lowerCode = code.toLowerCase();
            const prop = rule.cssProperty.prop.toLowerCase();
            const val = rule.cssProperty.value ? rule.cssProperty.value.toLowerCase() : '';
            const hasProp = lowerCode.includes(prop) && (!val || lowerCode.includes(val));
            passed = hasProp;
            actualMsg = hasProp
              ? `Đã áp dụng thuộc tính ${rule.cssProperty.prop}: ${rule.cssProperty.value}`
              : `Chưa tìm thấy quy tắc CSS ${rule.cssProperty.prop}: ${rule.cssProperty.value}`;
          }
        }
      } else if (rule.tag) {
        const elements = doc.getElementsByTagName(rule.tag);
        if (elements.length > 0) {
          passed = true;
          actualMsg = `Đã tìm thấy thẻ <${rule.tag}>`;

          if (rule.textContains) {
            const hasText = Array.from(elements).some(el =>
              (el.textContent || '').toLowerCase().includes(rule.textContains!.toLowerCase())
            );
            passed = hasText;
            actualMsg = hasText
              ? `Thẻ <${rule.tag}> có chứa nội dung yêu cầu`
              : `Thẻ <${rule.tag}> chưa có nội dung "${rule.textContains}"`;
          }
        }
      }
    } catch (e: any) {
      passed = false;
      actualMsg = `Lỗi kiểm tra: ${e.message}`;
    }

    if (passed) passedCount++;
    details.push({
      description: rule.description,
      passed,
      actual: actualMsg,
    });
  }

  const score = Math.round((passedCount / rules.length) * 100);
  return {
    score,
    passedCount,
    totalCount: rules.length,
    details,
  };
}
