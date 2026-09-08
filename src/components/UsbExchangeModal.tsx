import React, { useState } from 'react';
import { HardDrive, Upload, Download, CheckCircle2, AlertCircle, FileText, FolderUp, Check } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { StudentProfile } from '../types';

interface UsbExchangeModalProps {
  onClose: () => void;
  profile: StudentProfile;
}

export const UsbExchangeModal: React.FC<UsbExchangeModalProps> = ({ onClose, profile }) => {
  const [activeTab, setActiveTab] = useState<'export-student' | 'import-student' | 'import-teacher'>('export-student');
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  // 1. Học sinh xuất file kết quả nộp bài ra USB
  const handleExportStudent = () => {
    const dataStr = StorageService.exportStudentDataPackage();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `ket_qua_${profile.className}_${profile.studentId}_${profile.name.replace(/\s+/g, '_')}.codelab`;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 2. Import file (Học sinh nhận đề bài giáo viên hoặc Giáo viên nạp bài học sinh)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let successCount = 0;
    let failCount = 0;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const result = StorageService.importDataPackage(content);
          if (result.success) {
            successCount++;
            setImportStatus({
              success: true,
              message: result.message,
            });
          } else {
            failCount++;
            setImportStatus({
              success: false,
              message: result.message,
            });
          }
        } catch (err: any) {
          setImportStatus({
            success: false,
            message: `Lỗi đọc file: ${err.message}`,
          });
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-slate-200">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Trạm Trao Đổi Dữ Liệu Bằng USB</h2>
              <p className="text-[11px] text-slate-400">Phục vụ phòng máy học tập hoàn toàn Offline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded text-xs"
          >
            ✕ Đóng
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 pt-2 gap-2 text-xs">
          <button
            onClick={() => {
              setActiveTab('export-student');
              setImportStatus(null);
            }}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition ${
              activeTab === 'export-student'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            1. Học sinh nộp bài ra USB
          </button>
          <button
            onClick={() => {
              setActiveTab('import-student');
              setImportStatus(null);
            }}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition ${
              activeTab === 'import-student'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            2. Nạp đề bài từ USB
          </button>
          <button
            onClick={() => {
              setActiveTab('import-teacher');
              setImportStatus(null);
            }}
            className={`pb-2.5 px-3 font-semibold border-b-2 transition ${
              activeTab === 'import-teacher'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            3. Thu bài cả lớp (Giáo viên)
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 space-y-4 text-xs">
          {/* TAB 1: Học sinh xuất bài */}
          {activeTab === 'export-student' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="font-bold text-white text-sm">Gói Dữ Liệu Nộp Bài Của Em:</div>
                <div className="text-slate-400 space-y-1 text-xs">
                  <div>• Họ tên: <strong className="text-white">{profile.name}</strong></div>
                  <div>• Lớp: <strong className="text-white">{profile.className}</strong> • Mã HS: <strong className="text-white">{profile.studentId}</strong></div>
                  <div>• Số bài hoàn thành: <strong className="text-emerald-400">{profile.completedLessons.length} bài</strong></div>
                  <div>• Tổng điểm tích lũy: <strong className="text-amber-400">{profile.totalXp} XP</strong></div>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Nhấn nút bên dưới để tải tệp tin <code className="text-emerald-300 font-mono">.codelab</code> về máy, sau đó sao chép tệp này vào USB của giáo viên hoặc gửi vào thư mục chung của phòng máy.
              </p>

              <button
                onClick={handleExportStudent}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Xuất Tệp Nộp Bài (File .codelab)</span>
              </button>
            </div>
          )}

          {/* TAB 2: Nạp đề bài giáo viên */}
          {activeTab === 'import-student' && (
            <div className="space-y-4">
              <p className="text-slate-400 leading-relaxed">
                Nếu giáo viên đã phát file đề thi hoặc bài tập mới dạng <code className="text-indigo-300 font-mono">.codelab</code> trên USB, em hãy chọn file đó tại đây để nạp trực tiếp vào ứng dụng:
              </p>

              <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 transition group">
                <FolderUp className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 mb-2 transition" />
                <span className="font-bold text-slate-300 group-hover:text-white">
                  Chọn tệp bài tập từ USB (.codelab / .json)
                </span>
                <span className="text-[11px] text-slate-500 mt-1">Hỗ trợ kéo thả hoặc bấm để duyệt</span>
                <input
                  type="file"
                  accept=".codelab,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* TAB 3: Giáo viên thu bài cả lớp */}
          {activeTab === 'import-teacher' && (
            <div className="space-y-4">
              <p className="text-slate-400 leading-relaxed">
                Giáo viên có thể chọn <strong>cùng lúc nhiều file .codelab</strong> từ USB của các học sinh trong lớp. Hệ thống sẽ tự động tổng hợp vào ma trận Bảng điểm cả lớp!
              </p>

              <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 transition group">
                <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 mb-2 transition" />
                <span className="font-bold text-slate-300 group-hover:text-white">
                  Chọn hàng loạt file nộp bài (.codelab) từ USB
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Có thể giữ phím Ctrl / Shift để chọn tất cả bài nộp của lớp
                </span>
                <input
                  type="file"
                  multiple
                  accept=".codelab,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Import Notification Banner */}
          {importStatus && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                importStatus.success
                  ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-800 text-rose-200'
              }`}
            >
              {importStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{importStatus.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
