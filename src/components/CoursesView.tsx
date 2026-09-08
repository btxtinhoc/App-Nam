import React, { useState } from 'react';
import { courses } from '../data/courses';
import { Language, Lesson, StudentProfile } from '../types';
import { CheckCircle2, Circle, ArrowRight, Play, Award, Code2, Layout, Palette, Terminal, Cpu } from 'lucide-react';
import { NavTab } from './Sidebar';

interface CoursesViewProps {
  profile: StudentProfile;
  onSelectLesson: (lessonId: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ profile, onSelectLesson }) => {
  const [selectedLang, setSelectedLang] = useState<Language>('python');
  const activeCourse = courses.find((c) => c.id === selectedLang)!;

  const completedSet = new Set(profile.completedLessons);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight">Danh Sách Khóa Học & Bài Học</h1>
        <p className="text-xs text-slate-400">
          Chương trình học chuẩn hóa cho học sinh THCS và THPT, bao gồm 4 môn học lập trình thực chiến.
        </p>
      </div>

      {/* 4 Language Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {courses.map((course) => {
          const isSelected = selectedLang === course.id;
          const completedCount = course.lessons.filter((l) => completedSet.has(l.id)).length;

          const icon =
            course.id === 'html' ? (
              <Layout className="w-5 h-5 text-orange-400" />
            ) : course.id === 'css' ? (
              <Palette className="w-5 h-5 text-blue-400" />
            ) : course.id === 'python' ? (
              <Terminal className="w-5 h-5 text-yellow-400" />
            ) : (
              <Cpu className="w-5 h-5 text-cyan-400" />
            );

          return (
            <button
              key={course.id}
              onClick={() => setSelectedLang(course.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-950 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-slate-900">{icon}</div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  {completedCount}/{course.lessons.length}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white mb-1">{course.name}</h3>
              <p className="text-[10px] text-slate-400 line-clamp-1">{course.description}</p>
            </button>
          );
        })}
      </div>

      {/* Lessons List for Selected Language */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {activeCourse.name} — 10 Bài Học Thực Hành
            </h2>
            <p className="text-xs text-slate-400">{activeCourse.description}</p>
          </div>
          <button
            onClick={() => onSelectLesson(activeCourse.lessons[0].id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Vào Học Ngay</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeCourse.lessons.map((lesson) => {
            const isCompleted = completedSet.has(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 group ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-900/60 hover:border-emerald-700'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400 font-mono font-bold shrink-0">
                        {lesson.order}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                      {lesson.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40 font-semibold">
                        +{lesson.xpReward} XP
                      </span>
                      {lesson.testCases && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {lesson.testCases.length} Test cases
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <span className="p-1.5 rounded bg-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:bg-slate-700 transition inline-block">
                    <ArrowRight className="w-4 h-4" />
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
