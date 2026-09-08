import React, { useState } from 'react';
import { FileCode2, CheckCircle2, Circle, ArrowRight, Search, Filter } from 'lucide-react';
import { courses } from '../data/courses';
import { StudentProfile, Language, Lesson } from '../types';

interface ExercisesViewProps {
  profile: StudentProfile;
  onSelectLesson: (lessonId: string) => void;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({ profile, onSelectLesson }) => {
  const [selectedFilterLang, setSelectedFilterLang] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const completedSet = new Set(profile.completedLessons);
  const allLessons: (Lesson & { courseName: string })[] = courses.flatMap((c) =>
    c.lessons.map((l) => ({ ...l, courseName: c.name }))
  );

  const filteredLessons = allLessons.filter((l) => {
    if (selectedFilterLang !== 'all' && l.courseId !== selectedFilterLang) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.courseId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <FileCode2 className="w-5 h-5 text-emerald-400" />
          <span>Kho Bài Tập Thực Hành (40 Bài Chuẩn Hóa)</span>
        </h1>
        <p className="text-xs text-slate-400">
          Danh mục toàn bộ các bài tập thực hành kèm bộ test case tự động trên máy tính cục bộ.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'html', 'css', 'python', 'cpp'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilterLang(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition uppercase ${
                selectedFilterLang === f
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f === 'all' ? 'Tất cả (40)' : f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài tập..."
            className="bg-transparent border-none text-xs text-slate-200 outline-none w-full"
          />
        </div>
      </div>

      {/* Exercises Table / Grid */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-900/80 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <div className="col-span-1">STT</div>
          <div className="col-span-2">Môn học</div>
          <div className="col-span-6">Tên bài học & Nhiệm vụ</div>
          <div className="col-span-2 text-center">Phần thưởng</div>
          <div className="col-span-1 text-right">Làm bài</div>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredLessons.map((lesson, idx) => {
            const isCompleted = completedSet.has(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className="grid grid-cols-12 px-4 py-3 items-center text-xs hover:bg-slate-900/60 cursor-pointer transition group"
              >
                <div className="col-span-1 font-mono text-slate-500 font-bold flex items-center gap-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500">
                      {idx + 1}
                    </span>
                  )}
                </div>

                <div className="col-span-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-900 border border-slate-800 text-slate-300">
                    {lesson.courseId}
                  </span>
                </div>

                <div className="col-span-6 pr-2">
                  <div className="font-bold text-white group-hover:text-emerald-300 transition">
                    {lesson.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {lesson.description}
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40 font-semibold">
                    +{lesson.xpReward} XP
                  </span>
                </div>

                <div className="col-span-1 text-right">
                  <span className="p-1 rounded bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-emerald-600 transition inline-block">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
