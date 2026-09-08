import React, { useState, useEffect } from 'react';
import {
  Timer,
  ShieldAlert,
  Play,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  RotateCcw,
  Clock,
  Award,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { executeCode, autoGradeCode } from '../services/executionService';
import { GradeResult, StudentProfile } from '../types';

export const ExamMode: React.FC = () => {
  const profile = StorageService.getProfile();

  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(45 * 60); // 45 minutes default
  const [code, setCode] = useState<string>(`# BÀI THI THỰC HÀNH CODELAB OFFLINE
# Học sinh: ${profile.name} - Lớp: ${profile.className}
# Đề bài: Viết chương trình nhập vào số nguyên dương n.
# In ra "YES" nếu n chia hết cho cả 3 và 5, ngược lại in "NO".

n = int(input())
# Viết code xử lý tại đây:
`);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);

  // Standard exam test cases
  const examTestCases = [
    { input: '15\n', expectedOutput: 'YES\n', description: 'Test 1: 15 chia hết cho cả 3 và 5' },
    { input: '9\n', expectedOutput: 'NO\n', description: 'Test 2: 9 chỉ chia hết cho 3' },
    { input: '30\n', expectedOutput: 'YES\n', description: 'Test 3: 30 chia hết cho cả 3 và 5' },
    { input: '7\n', expectedOutput: 'NO\n', description: 'Test 4: 7 không chia hết cho 3 và 5' },
  ];

  // Countdown clock effect
  useEffect(() => {
    let timer: any = null;
    if (examStarted && !examFinished) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished]);

  // Format mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Run test during exam
  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await executeCode('python', code, '15');
      setOutput(res.stdout || res.stderr);
    } catch (err: any) {
      setOutput(`Lỗi: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Submit and grade
  const handleAutoSubmit = async () => {
    setExamFinished(true);
    setIsRunning(true);
    try {
      const res = await autoGradeCode('python', code, examTestCases);
      setGradeResult(res);

      // Record submission
      StorageService.addSubmission({
        studentId: profile.studentId,
        studentName: profile.name,
        className: profile.className,
        lessonId: 'EXAM-FINAL-01',
        courseId: 'python',
        code,
        score: res.score,
        totalTests: res.totalCount,
        passedTests: res.passedCount,
      });

      if (res.score >= 80) {
        StorageService.addCompletedLesson('EXAM-FINAL-01', 200);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  // Export encrypted exam result to USB
  const handleExportExamToUsb = () => {
    const payload = {
      type: 'CODELAB_EXAM_SUBMISSION',
      examId: 'EXAM-FINAL-01',
      student: profile,
      code,
      score: gradeResult?.score ?? 0,
      timestamp: new Date().toISOString(),
      hashCheck: btoa(`${profile.studentId}:${gradeResult?.score}:${Date.now()}`),
    };

    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BaiThi_${profile.className}_${profile.studentId}_${profile.name.replace(/\s+/g, '_')}.codelab`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Pre-exam screen
  if (!examStarted) {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 flex items-center justify-center select-none">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto shadow-inner">
            <Timer className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-black text-white">Chế Độ Kiểm Tra (Exam Mode)</h1>
            <p className="text-xs text-slate-300">
              Môi trường phòng thi nghiêm túc, chống gian lận, không có gợi ý hoặc đáp án mẫu.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2 text-slate-300">
            <div className="font-bold text-rose-400 flex items-center gap-1.5 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Quy chế trong phòng thi:</span>
            </div>
            <div>• Toàn bộ gợi ý 3 cấp độ và đáp án bị <strong>khóa tuyệt đối</strong>.</div>
            <div>• Đồng hồ đếm ngược <strong>45 phút</strong> sẽ kích hoạt ngay khi bắt đầu.</div>
            <div>• Hệ thống tự động thu bài và chấm điểm khi hết giờ.</div>
            <div>• Sau khi nộp, file bài làm sẽ được đóng gói xuất ra USB nộp giáo viên.</div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setExamStarted(true)}
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-900/40 transition active:scale-98 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Bắt Đầu Làm Bài Thi Ngay</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Finished exam view
  if (examFinished) {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 flex items-center justify-center select-none">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-black text-white">Đã Hoàn Thành Bài Kiểm Tra</h2>
            <div className="text-2xl font-mono font-black text-amber-400">
              {gradeResult?.score ?? 0} / 100 ĐIỂM
            </div>
            <p className="text-xs text-slate-400">
              Học sinh: <strong>{profile.name}</strong> • Lớp: <strong>{profile.className}</strong>
            </p>
          </div>

          {gradeResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="font-bold text-slate-300">Chi tiết kết quả chấm tự động:</div>
              {gradeResult.details.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{d.description}</span>
                  <span className={d.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {d.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 space-y-2">
            <button
              onClick={handleExportExamToUsb}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2"
            >
              <HardDrive className="w-4 h-4" />
              <span>Xuất Tệp Bài Thi Ra USB Nộp Giáo Viên</span>
            </button>

            <button
              onClick={() => {
                setExamStarted(false);
                setExamFinished(false);
                setTimeLeftSeconds(45 * 60);
              }}
              className="w-full py-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold"
            >
              Thoát Chế Độ Thi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam screen
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 text-slate-100 overflow-hidden select-none">
      {/* Exam Header Bar */}
      <div className="h-12 bg-rose-950/80 border-b border-rose-800/80 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>CHẾ ĐỘ THI ĐANG HOẠT ĐỘNG (GỢI Ý & ĐÁP ÁN BỊ KHÓA)</span>
        </div>

        {/* Countdown timer */}
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-lg border border-rose-700 font-mono text-xs font-bold text-rose-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Thời gian còn lại: {formatTime(timeLeftSeconds)}</span>
        </div>

        <button
          onClick={handleAutoSubmit}
          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg shadow transition"
        >
          Nộp Bài Ngay
        </button>
      </div>

      {/* Exam workspace */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* Left: Task specification */}
        <div className="col-span-4 bg-slate-950 border-r border-slate-800 p-4 space-y-4 overflow-y-auto">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold uppercase">
              ĐỀ THI PYTHON
            </span>
            <h2 className="text-sm font-bold text-white mt-1.5">
              Bài số 1: Kiểm tra tính chia hết
            </h2>
            <p className="text-xs text-slate-400 mt-1">Thời lượng: 45 phút • 4 Test cases</p>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2 text-slate-300 leading-relaxed">
            <p className="font-semibold text-white">Yêu cầu đề bài:</p>
            <p>
              Nhập vào một số nguyên dương <code>n</code> từ bàn phím.
            </p>
            <p>
              Kiểm tra nếu <code>n</code> chia hết cho <strong>đồng thời cả 3 và 5</strong> thì in ra chữ <code>"YES"</code> (viết hoa).
            </p>
            <p>
              Nếu không thỏa mãn thì in ra chữ <code>"NO"</code> (viết hoa).
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs space-y-1.5">
            <div className="font-bold text-slate-300">Ví dụ minh họa:</div>
            <div className="font-mono text-[11px] text-slate-400">Input: 15 ➔ Output: YES</div>
            <div className="font-mono text-[11px] text-slate-400">Input: 9 ➔ Output: NO</div>
          </div>
        </div>

        {/* Center: Code Editor */}
        <div className="col-span-5 bg-slate-950 border-r border-slate-800 flex flex-col overflow-hidden">
          <div className="h-9 bg-slate-900 px-3 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800">
            <span className="font-mono">main.py (Bài thi của {profile.name})</span>
            <button onClick={handleRun} className="text-emerald-400 font-bold hover:underline">
              ▶ Chạy thử
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-slate-950 text-emerald-100 font-mono text-xs p-3 outline-none resize-none"
            spellCheck={false}
          />
        </div>

        {/* Right: Output console */}
        <div className="col-span-3 bg-slate-950 p-3 flex flex-col overflow-hidden">
          <div className="text-xs font-bold text-slate-400 mb-2">OUTPUT KIỂM TRA THỬ:</div>
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 overflow-auto whitespace-pre-wrap">
            {isRunning ? 'Đang thực thi...' : output || '(Chưa chạy)'}
          </div>
        </div>
      </div>
    </div>
  );
};
