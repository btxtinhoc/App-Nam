import React, { useState } from 'react';
import { BarChart3, CheckCircle2, Clock, Calendar, FileCode, Search, Award } from 'lucide-react';
import { courses } from '../data/courses';
import { StudentProfile, SubmissionRecord } from '../types';
import { StorageService } from '../services/storageService';

interface ProgressViewProps {
  profile: StudentProfile;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ profile }) => {
  const [submissions] = useState<SubmissionRecord[]>(() => StorageService.getSubmissions());
  const [selectedSub, setSelectedSub] = useState<SubmissionRecord | null>(null);

  const completedSet = new Set(profile.completedLessons);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <span>Tiến Độ Học Tập & Nhật Ký Luyện Tập</span>
        </h1>
        <p className="text-xs text-slate-400">
          Theo dõi chi tiết số lượng bài đã làm, tỉ lệ hoàn thành và nhật ký các lần nộp bài thực hành.
        </p>
      </div>

      {/* Progress Bars per Language */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => {
          const completedInCourse = course.lessons.filter((l) => completedSet.has(l.id)).length;
          const pct = Math.round((completedInCourse / course.lessons.length) * 100);

          return (
            <div key={course.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-white font-mono">{course.id}</span>
                <span className="text-xs font-bold text-emerald-400">{pct}%</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-300 truncate">{course.name}</h4>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Đã làm: {completedInCourse} bài</span>
                <span>Tổng: {course.lessons.length} bài</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submissions History Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Nhật Ký Các Lần Chấm & Nộp Bài Cục Bộ ({submissions.length} lần)</span>
          </h3>
          <span className="text-[11px] text-slate-400">Lưu trữ trên máy học sinh</span>
        </div>

        {submissions.length > 0 ? (
          <div className="divide-y divide-slate-800/60">
            <div className="grid grid-cols-12 px-4 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-900/40">
              <div className="col-span-3">Thời gian</div>
              <div className="col-span-2">Môn học</div>
              <div className="col-span-3">Mã bài học</div>
              <div className="col-span-2 text-center">Kết quả test</div>
              <div className="col-span-2 text-right">Chi tiết</div>
            </div>

            {submissions.map((sub) => {
              const dateStr = new Date(sub.timestamp).toLocaleString('vi-VN');
              const isPassed = sub.score === 100;

              return (
                <div
                  key={sub.id}
                  className="grid grid-cols-12 px-4 py-3 items-center text-xs hover:bg-slate-900/40 transition"
                >
                  <div className="col-span-3 text-slate-400 font-mono text-[11px]">{dateStr}</div>
                  <div className="col-span-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-900 border border-slate-800 text-slate-300">
                      {sub.courseId}
                    </span>
                  </div>
                  <div className="col-span-3 text-slate-200 font-semibold">{sub.lessonId}</div>
                  <div className="col-span-2 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        isPassed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {sub.passedTests}/{sub.totalTests} ({sub.score}đ)
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <button
                      onClick={() => setSelectedSub(sub)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      Xem lại code
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 text-xs">
            Chưa có lượt nộp bài nào được ghi nhận. Hãy hoàn thành các bài học trong Code Editor!
          </div>
        )}
      </div>

      {/* Code Review Modal */}
      {selectedSub && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-2xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-white text-sm">
                  Mã nguồn bài nộp: {selectedSub.lessonId} ({selectedSub.courseId.toUpperCase()})
                </h4>
                <div className="text-xs text-slate-400">
                  Điểm số: <strong className="text-emerald-400">{selectedSub.score} điểm</strong> • Ngày: {new Date(selectedSub.timestamp).toLocaleString('vi-VN')}
                </div>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded"
              >
                ✕ Đóng
              </button>
            </div>

            <pre className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-300 max-h-96 overflow-auto border border-slate-800 select-text">
              {selectedSub.code}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
