import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  CheckCircle2,
  Lightbulb,
  Save,
  RotateCcw,
  Copy,
  Download,
  Terminal,
  Eye,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  KeyRound,
  FileCode,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Lesson, Language, RunResult, GradeResult } from '../types';
import { courses } from '../data/courses';
import { executeCode, autoGradeCode } from '../services/executionService';
import { StorageService } from '../services/storageService';
import { analyzeCodeOffline, DiagnosticIssue } from '../utils/offlineTutor';

interface CodeEditorViewProps {
  initialLessonId?: string;
  onLessonCompleted?: (lessonId: string) => void;
}

export const CodeEditorView: React.FC<CodeEditorViewProps> = ({
  initialLessonId,
  onLessonCompleted,
}) => {
  // Find initial lesson or default to python-01
  const findLesson = (id?: string): { courseId: Language; lesson: Lesson } => {
    if (id) {
      for (const c of courses) {
        const found = c.lessons.find((l) => l.id === id);
        if (found) return { courseId: c.id, lesson: found };
      }
    }
    return { courseId: 'python', lesson: courses.find((c) => c.id === 'python')!.lessons[0] };
  };

  const initial = findLesson(initialLessonId);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initial.courseId);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(initial.lesson);

  const currentCourse = courses.find((c) => c.id === selectedLanguage)!;

  // Code editor states
  const [code, setCode] = useState<string>(() => {
    return StorageService.getSavedCode(initial.lesson.id) || initial.lesson.initialCode;
  });
  const [stdin, setStdin] = useState<string>('');

  // Execution & Grading states
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [rightTab, setRightTab] = useState<'output' | 'tests' | 'tutor' | 'preview'>('output');

  // Lesson helper states
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const [hasRevealedSolution, setHasRevealedSolution] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [issues, setIssues] = useState<DiagnosticIssue[]>([]);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync when lesson changes
  useEffect(() => {
    const saved = StorageService.getSavedCode(selectedLesson.id);
    setCode(saved || selectedLesson.initialCode);
    setRunResult(null);
    setGradeResult(null);
    setActiveHintLevel(0);
    setHasRevealedSolution(false);
    setStdin(selectedLesson.testCases?.[0]?.input || '');

    if (selectedLanguage === 'html' || selectedLanguage === 'css') {
      setRightTab('preview');
    } else {
      setRightTab('output');
    }
  }, [selectedLesson.id, selectedLanguage]);

  // Analyze code for offline tutor whenever code changes
  useEffect(() => {
    const detected = analyzeCodeOffline(code, selectedLanguage);
    setIssues(detected);
  }, [code, selectedLanguage]);

  // Handle Tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const spaces = '    ';
      const newCode = code.substring(0, start) + spaces + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + spaces.length;
      }, 0);
    }
  };

  // Sync scroll for line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // 1. Run code action
  const handleRun = async () => {
    setIsRunning(true);
    if (selectedLanguage === 'html' || selectedLanguage === 'css') {
      setRightTab('preview');
    } else {
      setRightTab('output');
    }

    try {
      const res = await executeCode(selectedLanguage, code, stdin);
      setRunResult(res);
      // Auto switch to tutor if syntax error detected
      if (res.exitCode !== 0 && issues.length > 0) {
        // Can offer tutor tab
      }
    } catch (err: any) {
      setRunResult({
        stdout: '',
        stderr: err.message,
        exitCode: 1,
        executionTimeMs: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // 2. Grade code action
  const handleGrade = async () => {
    setIsGrading(true);
    setRightTab('tests');
    try {
      const result = await autoGradeCode(
        selectedLanguage,
        code,
        selectedLesson.testCases,
        selectedLesson.htmlCssRules
      );
      setGradeResult(result);

      if (result.score === 100) {
        // Mark completed and award XP
        StorageService.addCompletedLesson(selectedLesson.id, selectedLesson.xpReward);
        StorageService.addSubmission({
          studentId: StorageService.getProfile().studentId,
          studentName: StorageService.getProfile().name,
          className: StorageService.getProfile().className,
          lessonId: selectedLesson.id,
          courseId: selectedLanguage,
          code,
          score: 100,
          totalTests: result.totalCount,
          passedTests: result.passedCount,
        });
        if (onLessonCompleted) {
          onLessonCompleted(selectedLesson.id);
        }
      }
    } catch (err: any) {
      console.error('Grading error', err);
    } finally {
      setIsGrading(false);
    }
  };

  // Save draft
  const handleSave = () => {
    StorageService.saveCode(selectedLesson.id, code);
    setSaveSuccessMsg('Đã lưu bài làm vào máy cục bộ!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Reset to initial
  const handleReset = () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại mã nguồn về ban đầu?')) {
      setCode(selectedLesson.initialCode);
      StorageService.saveCode(selectedLesson.id, selectedLesson.initialCode);
    }
  };

  // Copy code
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Download file
  const handleDownload = () => {
    const ext = selectedLanguage === 'python' ? 'py' : selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage;
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedLesson.id}.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-hidden select-none">
      {/* Top lesson selector toolbar */}
      <div className="h-11 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedLanguage(c.id);
                  setSelectedLesson(c.lessons[0]);
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  selectedLanguage === c.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Lesson select dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Bài:</span>
            <select
              value={selectedLesson.id}
              onChange={(e) => {
                const found = currentCourse.lessons.find((l) => l.id === e.target.value);
                if (found) setSelectedLesson(found);
              }}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-md px-2 py-1 outline-none focus:border-emerald-500 max-w-[280px]"
            >
              {currentCourse.lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation prev/next buttons */}
        <div className="flex items-center gap-2">
          {saveSuccessMsg && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              {saveSuccessMsg}
            </span>
          )}
          <button
            disabled={selectedLesson.order <= 1}
            onClick={() => {
              const prev = currentCourse.lessons.find((l) => l.order === selectedLesson.order - 1);
              if (prev) setSelectedLesson(prev);
            }}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none"
            title="Bài trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 font-mono">
            {selectedLesson.order}/10
          </span>
          <button
            disabled={selectedLesson.order >= currentCourse.lessons.length}
            onClick={() => {
              const next = currentCourse.lessons.find((l) => l.order === selectedLesson.order + 1);
              if (next) setSelectedLesson(next);
            }}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none"
            title="Bài tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3-column classroom workspace */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* ============================================================
            COLUMN 1: BÀI HỌC (Lesson Guide, Theory, Examples, Tasks)
           ============================================================ */}
        <div className="col-span-12 lg:col-span-4 border-r border-slate-800 bg-slate-950 flex flex-col overflow-hidden">
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Hướng dẫn Bài học
              </h2>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
              +{selectedLesson.xpReward} XP
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-300 text-xs leading-relaxed select-text">
            {/* Title & Target */}
            <div>
              <h1 className="text-sm font-bold text-white mb-1.5">{selectedLesson.title}</h1>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-xs">
                <span className="font-semibold text-emerald-400">🎯 Mục tiêu:</span> {selectedLesson.target}
              </div>
            </div>

            {/* Theory */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                📖 1. Kiến thức trọng tâm
              </h3>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 whitespace-pre-line text-slate-300">
                {selectedLesson.theory}
              </div>
            </div>

            {/* Examples */}
            {selectedLesson.examples && selectedLesson.examples.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  💡 2. Ví dụ mẫu
                </h3>
                {selectedLesson.examples.map((ex, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{ex.title}</span>
                      <button
                        onClick={() => setCode(ex.code)}
                        className="text-[11px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 hover:bg-indigo-900 transition"
                      >
                        Nạp vào Editor
                      </button>
                    </div>
                    <pre className="bg-slate-950 p-2.5 rounded text-[11px] font-mono text-emerald-300 overflow-x-auto border border-slate-800/80">
                      {ex.code}
                    </pre>
                    {ex.explanation && (
                      <p className="text-[11px] text-slate-400">{ex.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Task */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                ⚡ 3. Nhiệm vụ của em
              </h3>
              <div className="p-3 bg-amber-950/30 border border-amber-700/50 rounded-lg text-amber-100 font-medium">
                {selectedLesson.task}
              </div>
            </div>

            {/* 3 Hints level */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                4. Gợi ý bài làm (3 Cấp độ)
              </h3>
              <div className="space-y-1.5">
                {[1, 2, 3].map((lvl) => {
                  const isOpened = activeHintLevel >= lvl;
                  const label = lvl === 1 ? 'Mức 1: Gợi ý chung' : lvl === 2 ? 'Mức 2: Vị trí & cú pháp' : 'Mức 3: Gần lời giải';
                  return (
                    <div key={lvl} className="border border-slate-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setActiveHintLevel((prev) => (prev >= lvl ? lvl - 1 : lvl))}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${
                          isOpened ? 'bg-slate-800 text-yellow-300' : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{label}</span>
                        <span>{isOpened ? '▲ Thu gọn' : '▼ Mở'}</span>
                      </button>
                      {isOpened && (
                        <div className="p-2.5 bg-slate-950 text-xs text-slate-300 border-t border-slate-800">
                          {selectedLesson.hints[lvl - 1]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Solution reveal */}
            <div className="pt-2 border-t border-slate-800">
              {hasRevealedSolution ? (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400">Đáp án tham khảo:</span>
                    <button
                      onClick={() => setCode(selectedLesson.solutionCode)}
                      className="text-[10px] px-2 py-0.5 rounded bg-emerald-700 text-white hover:bg-emerald-600"
                    >
                      Dán vào Editor
                    </button>
                  </div>
                  <pre className="p-2 bg-slate-950 rounded text-[11px] font-mono text-slate-200 overflow-x-auto border border-slate-800">
                    {selectedLesson.solutionCode}
                  </pre>
                </div>
              ) : (
                <button
                  onClick={() => setShowSolutionModal(true)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Xem Đáp án Mẫu (Chỉ khi cần)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================
            COLUMN 2: CODE EDITOR (Center workspace)
           ============================================================ */}
        <div className="col-span-12 lg:col-span-5 border-r border-slate-800 bg-slate-900 flex flex-col overflow-hidden">
          {/* Editor Header / Action Buttons */}
          <div className="h-10 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono text-slate-300 font-semibold">
                {selectedLanguage === 'python'
                  ? 'main.py'
                  : selectedLanguage === 'cpp'
                  ? 'solution.cpp'
                  : selectedLanguage === 'html'
                  ? 'index.html'
                  : 'style.css'}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                title="Sao chép toàn bộ code"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                title="Khôi phục code ban đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                title="Tải tệp tin về máy tính"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded border border-slate-700 transition"
                title="Lưu bài làm cục bộ"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lưu</span>
              </button>
            </div>
          </div>

          {/* Editor Core with synced line numbers */}
          <div className="flex-1 flex overflow-hidden bg-slate-950 font-mono text-sm relative">
            {/* Line numbers column */}
            <div
              ref={lineNumbersRef}
              className="w-10 py-3 bg-slate-950 text-slate-600 text-right pr-2 select-none border-r border-slate-800/80 overflow-hidden shrink-0 text-xs font-mono"
            >
              {Array.from({ length: Math.max(lineCount, 20) }).map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code input area */}
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              spellCheck={false}
              className="flex-1 h-full py-3 px-3 bg-transparent text-emerald-100 font-mono text-xs leading-6 resize-none outline-none overflow-auto whitespace-pre tab-4"
              placeholder="Nhập mã nguồn của bạn tại đây..."
            />
          </div>

          {/* Optional Stdin input bar for Python / C++ */}
          {(selectedLanguage === 'python' || selectedLanguage === 'cpp') && (
            <div className="h-12 bg-slate-950 border-t border-slate-800 px-3 flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">Input (stdin):</span>
              <input
                type="text"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Nhập dữ liệu đầu vào cho lệnh input() hoặc cin >> (ví dụ: 10 hoặc 5 7)"
                className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-200 outline-none focus:border-emerald-500"
              />
            </div>
          )}
        </div>

        {/* ============================================================
            COLUMN 3: KẾT QUẢ & PREVIEW & CHẤM BÀI (Right workspace)
           ============================================================ */}
        <div className="col-span-12 lg:col-span-3 bg-slate-950 flex flex-col overflow-hidden">
          {/* Tab selector */}
          <div className="h-10 bg-slate-950 border-b border-slate-800 px-2 flex items-center gap-1 shrink-0">
            {(selectedLanguage === 'html' || selectedLanguage === 'css') && (
              <button
                onClick={() => setRightTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition ${
                  rightTab === 'preview'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem trước (Preview)</span>
              </button>
            )}

            {(selectedLanguage === 'python' || selectedLanguage === 'cpp') && (
              <button
                onClick={() => setRightTab('output')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  rightTab === 'output'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Màn hình Output</span>
              </button>
            )}

            <button
              onClick={() => setRightTab('tests')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                rightTab === 'tests'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Chấm bài {gradeResult ? `(${gradeResult.score}đ)` : ''}</span>
            </button>

            <button
              onClick={() => setRightTab('tutor')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition relative ${
                rightTab === 'tutor'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Trợ lý</span>
              {issues.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Right tab contents */}
          <div className="flex-1 overflow-auto p-3 text-xs">
            {/* 1. Live Preview for HTML/CSS */}
            {rightTab === 'preview' && (
              <div className="h-full flex flex-col bg-white rounded-lg overflow-hidden border border-slate-700 shadow-inner">
                <div className="h-7 bg-slate-200 border-b border-slate-300 px-2 flex items-center justify-between text-[11px] text-slate-600 font-mono">
                  <span>Trình duyệt xem trước</span>
                  <span className="text-[10px] text-emerald-600 font-bold">● Trực tiếp</span>
                </div>
                <iframe
                  title="CodeLab Live Preview"
                  sandbox="allow-scripts"
                  srcDoc={
                    selectedLanguage === 'html'
                      ? code
                      : `<!DOCTYPE html><html><head><style>${code}</style></head><body><div class="card"><h3>Ví dụ xem trước CSS</h3><p>Đang áp dụng kiểu dáng của bạn.</p><button class="btn">Nút thử nghiệm</button></div></body></html>`
                  }
                  className="w-full flex-1 border-none bg-white"
                />
              </div>
            )}

            {/* 2. Terminal Output for Python/C++ */}
            {rightTab === 'output' && (
              <div className="h-full flex flex-col font-mono">
                <div className="flex items-center justify-between text-slate-400 mb-2 font-semibold">
                  <span>TERMINAL OUTPUT</span>
                  {runResult && (
                    <span className="text-[11px] text-slate-500">
                      Thời gian: {runResult.executionTimeMs}ms
                    </span>
                  )}
                </div>

                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-100 overflow-auto whitespace-pre-wrap select-text leading-5">
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Đang biên dịch và thực thi chương trình...</span>
                    </div>
                  ) : runResult ? (
                    <>
                      {runResult.stdout && (
                        <div className="text-emerald-300">{runResult.stdout}</div>
                      )}
                      {runResult.stderr && (
                        <div className="text-rose-400 mt-2 p-2 bg-rose-950/40 rounded border border-rose-900/60">
                          {runResult.stderr}
                        </div>
                      )}
                      {!runResult.stdout && !runResult.stderr && (
                        <span className="text-slate-500 italic">
                          (Chương trình kết thúc không có dữ liệu in ra màn hình)
                        </span>
                      )}
                      <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-500">
                        Exit code: {runResult.exitCode} • Thực thi trên máy cục bộ
                      </div>
                    </>
                  ) : (
                    <div className="text-slate-500 italic">
                      Nhấn nút "▶ Chạy chương trình" bên dưới để xem kết quả xuất ra màn hình.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Test Cases & Auto-Grading */}
            {rightTab === 'tests' && (
              <div className="h-full flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">KẾT QUẢ CHẤM BÀI</span>
                  {gradeResult && (
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                        gradeResult.score === 100
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {gradeResult.passedCount}/{gradeResult.totalCount} Test đúng – {gradeResult.score} điểm
                    </span>
                  )}
                </div>

                {isGrading ? (
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-center text-emerald-400">
                    <span className="animate-spin inline-block mr-2">⚙</span>
                    Đang tự động chạy bộ test kiểm tra...
                  </div>
                ) : gradeResult ? (
                  <div className="flex-1 overflow-auto space-y-2.5">
                    {gradeResult.details.map((d, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-xs ${
                          d.passed
                            ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                            : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            {d.passed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                            )}
                            {d.description}
                          </span>
                          <span className="text-[10px] uppercase font-bold">
                            {d.passed ? 'ĐÚNG' : 'SAI'}
                          </span>
                        </div>

                        {d.input && (
                          <div className="text-[11px] font-mono text-slate-400">
                            Input: <span className="text-slate-200">{d.input}</span>
                          </div>
                        )}
                        {d.expected && (
                          <div className="text-[11px] font-mono text-slate-400">
                            Kỳ vọng: <span className="text-emerald-300">{d.expected}</span>
                          </div>
                        )}
                        {d.actual && (
                          <div className="text-[11px] font-mono text-slate-400">
                            Thực tế: <span className={d.passed ? 'text-emerald-300' : 'text-rose-300'}>{d.actual}</span>
                          </div>
                        )}
                      </div>
                    ))}

                    {gradeResult.score === 100 && (
                      <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-600 text-center space-y-1">
                        <div className="text-emerald-300 font-bold flex items-center justify-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>Xuất sắc! Bạn đã hoàn thành bài học!</span>
                        </div>
                        <p className="text-[11px] text-emerald-400">
                          +{selectedLesson.xpReward} XP đã được cộng vào thành tích của bạn.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-center">
                    Nhấn nút <strong className="text-white">"✓ Chấm bài tự động"</strong> để hệ thống chấm thử các trường hợp dữ liệu (test cases).
                  </div>
                )}
              </div>
            )}

            {/* 4. Offline Tutor Diagnostic Assistant */}
            {rightTab === 'tutor' && (
              <div className="h-full flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    Offline Coding Tutor
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">100% Cục bộ</span>
                </div>

                <div className="flex-1 overflow-auto space-y-2.5">
                  {issues.length > 0 ? (
                    issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-900 border border-amber-800/60 space-y-1.5"
                      >
                        <div className="font-bold text-amber-300 flex items-center justify-between">
                          <span>{issue.title}</span>
                          {issue.line && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-amber-950 rounded text-amber-200">
                              Dòng {issue.line}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-300">
                          <strong>Gợi ý 1:</strong> {issue.hint1}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          <strong>Gợi ý 2:</strong> {issue.hint2}
                        </div>
                        <div className="text-[11px] text-emerald-300 bg-slate-950 p-1.5 rounded">
                          <strong>Cách sửa (Mức 3):</strong> {issue.hint3}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-center space-y-2">
                      <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p className="text-emerald-300 font-semibold">Cú pháp hoàn chỉnh!</p>
                      <p className="text-[11px] text-slate-400">
                        Chưa phát hiện lỗi cú pháp rõ ràng. Bạn có thể tự tin nhấn "Chạy" hoặc "Chấm bài"!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================
          BOTTOM ACTION BAR (▶ Chạy, ✓ Kiểm tra, 💡 Gợi ý, 💾 Lưu, 🚀 Nộp bài)
         ============================================================ */}
      <div className="h-14 bg-slate-950 border-t border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {/* RUN BUTTON */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs shadow-md shadow-emerald-900/30 transition active:scale-95 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isRunning ? 'Đang chạy...' : '▶ Chạy chương trình'}</span>
          </button>

          {/* AUTO GRADE BUTTON */}
          <button
            onClick={handleGrade}
            disabled={isGrading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs shadow-md shadow-indigo-900/30 transition active:scale-95 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isGrading ? 'Đang chấm...' : '✓ Chấm bài tự động'}</span>
          </button>

          {/* TUTOR QUICK TOGGLE */}
          <button
            onClick={() => setRightTab('tutor')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-semibold border border-slate-700 transition"
          >
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span>Trợ lý Gợi ý {issues.length > 0 ? `(${issues.length})` : ''}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* SAVE DRAFT BUTTON */}
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 transition"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Lưu bài nháp</span>
          </button>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleGrade}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-xs shadow-md shadow-amber-900/20 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Nộp bài & Nhận XP</span>
          </button>
        </div>
      </div>

      {/* MODAL: XÁC NHẬN XEM ĐÁP ÁN */}
      {showSolutionModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-md w-full shadow-2xl space-y-4 text-slate-200">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <KeyRound className="w-5 h-5" />
              <span>Xác nhận Xem Đáp án</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Học lập trình hiệu quả nhất khi em tự mình suy nghĩ, viết code và sửa lỗi. Em có muốn xem gợi ý cấp độ 3 trước không?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowSolutionModal(false);
                  setActiveHintLevel(3);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Xem Gợi ý Cấp 3 trước
              </button>
              <button
                onClick={() => {
                  setShowSolutionModal(false);
                  setHasRevealedSolution(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold"
              >
                Vẫn muốn xem đáp án
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
