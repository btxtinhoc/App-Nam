import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Lock,
  Unlock,
  HardDrive,
  Download,
  PlusCircle,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  Trash2,
  Sparkles,
  Search,
} from 'lucide-react';
import { StorageService, defaultTeacherClasses } from '../services/storageService';
import { SubmissionRecord, TeacherAssignment } from '../types';

export const TeacherMode: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');

  const [selectedClass, setSelectedClass] = useState<string>('class-10A1');
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);

  // Create assignment form states
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCourseId, setNewCourseId] = useState<'python' | 'cpp' | 'html' | 'css'>('python');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newDuration, setNewDuration] = useState<number>(45);
  const [newTestInput, setNewTestInput] = useState<string>('');
  const [newTestOutput, setNewTestOutput] = useState<string>('');

  useEffect(() => {
    setSubmissions(StorageService.getSubmissions());
    setAssignments(StorageService.getTeacherAssignments());
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pin === '1234') {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('Mã PIN không chính xác! (Mặc định: 1234)');
    }
  };

  // Mock student roster for sample matrix
  const studentRoster = [
    { id: 'HS1001', name: 'Nguyễn Văn An' },
    { id: 'HS1002', name: 'Trần Thị Mai' },
    { id: 'HS1003', name: 'Lê Hoàng Long' },
    { id: 'HS1004', name: 'Phạm Minh Đức' },
    { id: 'HS1005', name: 'Hoàng Thu Trang' },
  ];

  // Export CSV Gradebook
  const handleExportCsv = () => {
    let csv = 'Mã Học Sinh,Họ Và Tên,Lớp,Bài Học,Ngôn Ngữ,Điểm Số,Số Test Đúng,Thời Gian\n';
    submissions.forEach((sub) => {
      csv += `"${sub.studentId}","${sub.studentName}","${sub.className}","${sub.lessonId}","${sub.courseId}",${sub.score},"${sub.passedTests}/${sub.totalTests}","${sub.timestamp}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bang_Diem_CodeLab_${selectedClass}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Create assignment action
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAss: TeacherAssignment = {
      id: `ass_${Date.now()}`,
      title: newTitle,
      courseId: newCourseId,
      description: newDescription,
      durationMinutes: newDuration,
      testCases: [
        {
          input: newTestInput,
          expectedOutput: newTestOutput,
          description: 'Test case chuẩn giáo viên',
        },
      ],
      createdAt: new Date().toISOString(),
      isExam: true,
    };

    const updated = [newAss, ...assignments];
    setAssignments(updated);
    StorageService.saveTeacherAssignments(updated);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewTestInput('');
    setNewTestOutput('');
  };

  // Export teacher assignment to USB package
  const handleExportAssignmentToUsb = (ass: TeacherAssignment) => {
    const payload = {
      type: 'CODELAB_TEACHER_ASSIGNMENT',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      assignments: [ass],
    };

    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `De_Thi_GiaoVien_${ass.title.replace(/\s+/g, '_')}.codelab`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // PIN Lock Screen
  if (!isUnlocked) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900 text-slate-100 p-6 select-none">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-lg font-black text-white">Chế Độ Quản Trị Dành Cho Giáo Viên</h2>
            <p className="text-xs text-slate-400 mt-1">
              Nhập mã PIN để truy cập Bảng điểm cả lớp, chấm điểm qua USB và tạo đề thi phòng máy.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Nhập mã PIN (Mặc định: 1234)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest text-white outline-none focus:border-indigo-500"
                autoFocus
              />
              {pinError && <div className="text-xs text-rose-400 mt-2 font-medium">{pinError}</div>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-900/40 transition active:scale-98"
            >
              Mở Khóa Bảng Điều Khiển
            </button>
          </form>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
            Ghi chú: Mã PIN mặc định khởi tạo là <code className="text-indigo-300 font-bold">1234</code>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Bảng Điều Khiển Giáo Viên (Teacher Mode)</span>
          </h1>
          <p className="text-xs text-slate-400">
            Quản lý học sinh phòng máy không có Internet: thu bài nộp qua USB, xem ma trận điểm và phát đề bài.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo Đề Thi / Bài Tập Mới</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Xuất Bảng Điểm (Excel/CSV)</span>
          </button>

          <button
            onClick={() => setIsUnlocked(false)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
            title="Khóa lại"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Class Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Chọn lớp giảng dạy:</span>
        <div className="flex items-center gap-2">
          {defaultTeacherClasses.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedClass === cls.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cls.name} ({cls.room})
            </button>
          ))}
        </div>
      </div>

      {/* Gradebook Matrix */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Ma Trận Điểm Số Thực Hành Lớp {selectedClass.replace('class-', '')}
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            Dữ liệu tổng hợp từ các máy trạm phòng máy
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <th className="p-3">Mã HS</th>
                <th className="p-3">Họ và Tên</th>
                <th className="p-3 text-center">HTML-01</th>
                <th className="p-3 text-center">CSS-01</th>
                <th className="p-3 text-center">PY-01</th>
                <th className="p-3 text-center">PY-02</th>
                <th className="p-3 text-center">CPP-01</th>
                <th className="p-3 text-center">Điểm TB</th>
                <th className="p-3 text-center">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {studentRoster.map((st, sIdx) => {
                // Determine grade for student
                const studentSubs = submissions.filter((s) => s.studentId === st.id);
                const hasHtml = studentSubs.some((s) => s.lessonId.startsWith('html') && s.score === 100);
                const hasPy = studentSubs.some((s) => s.lessonId.startsWith('py') && s.score === 100);
                const hasCpp = studentSubs.some((s) => s.lessonId.startsWith('cpp') && s.score === 100);

                const avgScore = sIdx === 0 ? '9.5' : sIdx === 1 ? '8.0' : sIdx === 2 ? '8.5' : '7.0';

                return (
                  <tr key={st.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3 font-mono font-bold text-slate-400">{st.id}</td>
                    <td className="p-3 font-semibold text-white">{st.name}</td>
                    <td className="p-3 text-center font-mono">
                      <span className="text-emerald-400 font-bold">100</span>
                    </td>
                    <td className="p-3 text-center font-mono">
                      <span className="text-emerald-400 font-bold">100</span>
                    </td>
                    <td className="p-3 text-center font-mono">
                      <span className="text-emerald-400 font-bold">100</span>
                    </td>
                    <td className="p-3 text-center font-mono">
                      <span className={sIdx < 3 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                        {sIdx < 3 ? '100' : '—'}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono">
                      <span className={sIdx === 0 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                        {sIdx === 0 ? '100' : '—'}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-amber-300 font-mono">
                      {avgScore}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Đang làm tốt
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Created Assignments List */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Đề Thi & Bài Tập Giáo Viên Đã Tạo ({assignments.length})
            </h3>
            <p className="text-[11px] text-slate-400">
              Xuất đề bài ra file .codelab trên USB để phân phối cho các máy trạm học sinh.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
          >
            + Tạo Đề Mới
          </button>
        </div>

        {assignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {assignments.map((ass) => (
              <div
                key={ass.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                      {ass.courseId} • {ass.durationMinutes} phút
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(ass.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{ass.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{ass.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {ass.testCases.length} Test cases tự động
                  </span>
                  <button
                    onClick={() => handleExportAssignmentToUsb(ass)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold transition"
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Xuất Đề ra USB</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-slate-500 text-xs">
            Chưa có đề thi tự tạo nào. Nhấn "+ Tạo Đề Mới" để thiết lập đề thi phòng máy.
          </div>
        )}
      </div>

      {/* Modal: Create Assignment */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-indigo-400" />
                <span>Tạo Đề Thi / Bài Kiểm Tra Mới</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded"
              >
                ✕ Đóng
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tên bài kiểm tra:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Kiểm tra 15 phút - Vòng lặp Python"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Ngôn ngữ:</label>
                  <select
                    value={newCourseId}
                    onChange={(e: any) => setNewCourseId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
                  >
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Thời gian (phút):</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    min={5}
                    max={120}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Mô tả & Nhiệm vụ đề bài:</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Mô tả chi tiết yêu cầu bài tập cho học sinh..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Test Case Input:</label>
                  <input
                    type="text"
                    value={newTestInput}
                    onChange={(e) => setNewTestInput(e.target.value)}
                    placeholder="Ví dụ: 5"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 font-mono text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Test Case Expected Output:</label>
                  <input
                    type="text"
                    value={newTestOutput}
                    onChange={(e) => setNewTestOutput(e.target.value)}
                    placeholder="Ví dụ: 25"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 font-mono text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-semibold hover:bg-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold shadow"
                >
                  Lưu Đề Thi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
