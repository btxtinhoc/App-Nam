import React, { useState } from 'react';
import { User, Check, X, Shield, Award, Calendar } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { StudentProfile } from '../types';

interface StudentProfileModalProps {
  onClose: () => void;
  onProfileUpdated: (profile: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  onClose,
  onProfileUpdated,
}) => {
  const current = StorageService.getProfile();
  const [name, setName] = useState<string>(current.name);
  const [className, setClassName] = useState<string>(current.className);
  const [studentId, setStudentId] = useState<string>(current.studentId);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated = StorageService.updateProfileInfo(name.trim(), studentId.trim(), className.trim());
    onProfileUpdated(updated);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl p-6 text-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <User className="w-5 h-5 text-emerald-400" />
            <span>Thông Tin Học Sinh Phòng Máy</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Họ và tên học sinh:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Nguyễn Văn An"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Lớp học:</label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Ví dụ: 10A1"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Mã học sinh:</label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Ví dụ: HS1001"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500 font-semibold uppercase"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">Thông số hồ sơ:</div>
            <div>• Tổng điểm tích lũy: <strong className="text-amber-400">{current.totalXp} XP</strong></div>
            <div>• Đã hoàn thành: <strong className="text-emerald-400">{current.completedLessons.length} bài</strong></div>
            <div>• Lưu trữ: Cục bộ trên ổ cứng máy này (Offline Database)</div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold hover:bg-slate-700"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1.5 shadow"
            >
              {saved ? <Check className="w-4 h-4" /> : null}
              <span>{saved ? 'Đã Lưu Thành Công' : 'Cập Nhật Thông Tin'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
