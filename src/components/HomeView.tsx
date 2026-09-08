import React from 'react';
import {
  BookOpen,
  Code2,
  Award,
  Zap,
  Play,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Terminal,
  Palette,
  Layout,
  HardDrive,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { courses } from '../data/courses';
import { StudentProfile, Language } from '../types';
import { NavTab } from './Sidebar';

interface HomeViewProps {
  profile: StudentProfile;
  onNavigate: (tab: NavTab, initialLessonId?: string) => void;
  onOpenUsb: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ profile, onNavigate, onOpenUsb }) => {
  const totalLessons = 40;
  const completedCount = profile.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Find next uncompleted lesson
  let nextLesson = courses[2].lessons[0]; // default python 1
  for (const c of courses) {
    const uncompleted = c.lessons.find((l) => !profile.completedLessons.includes(l.id));
    if (uncompleted) {
      nextLesson = uncompleted;
      break;
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      {/* Welcome & Continue Banner */}
      <div className="bg-linear-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-800/50 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Phần Mềm Học Lập Trình Thực Hành Phòng Máy (100% Offline)
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">
            Xin chào, {profile.name}!
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            Học lập trình thật, gõ code thật và chấm bài tự động không cần kết nối Internet. Em đã tích lũy{' '}
            <strong className="text-amber-400 font-bold">{profile.totalXp} XP</strong> và hoàn thành{' '}
            <strong className="text-emerald-400 font-bold">{completedCount}/{totalLessons} bài thực hành</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('editor', nextLesson.id)}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/40 transition active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Tiếp tục học: {nextLesson.title}</span>
            </button>

            <button
              onClick={() => onNavigate('roadmap')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs border border-slate-700 transition"
            >
              <span>Xem Lộ trình</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenUsb}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs border border-slate-700 transition"
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>Xuất bài ra USB</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-white">{completedCount} / {totalLessons}</div>
            <div className="text-[11px] text-slate-400">Bài học hoàn thành</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-white">{profile.totalXp} XP</div>
            <div className="text-[11px] text-slate-400">Điểm kinh nghiệm</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-white">{profile.earnedBadges.length} Huy hiệu</div>
            <div className="text-[11px] text-slate-400">Thành tích đạt được</div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-white">{progressPercent}%</div>
            <div className="text-[11px] text-slate-400">Tiến độ tổng quan</div>
          </div>
        </div>
      </div>

      {/* 4 Main Course Tracks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            4 Khóa Học Lập Trình Trọng Tâm
          </h2>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
          >
            <span>Xem tất cả khóa học</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => {
            const completedInCourse = course.lessons.filter((l) =>
              profile.completedLessons.includes(l.id)
            ).length;
            const pct = Math.round((completedInCourse / course.lessons.length) * 100);

            const iconComponent =
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
              <div
                key={course.id}
                onClick={() => onNavigate('editor', course.lessons[0].id)}
                className="bg-slate-950 border border-slate-800 hover:border-emerald-600/50 rounded-xl p-4.5 cursor-pointer transition-all hover:translate-y-[-2px] group space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center group-hover:scale-105 transition">
                    {iconComponent}
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-emerald-300 transition">
                    {course.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-900">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{completedInCourse}/10 bài xong</span>
                    <span className="font-semibold text-white">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offline Lab Advantage Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Hoạt động độc lập 100% trong phòng máy</h4>
            <p className="text-[11px] text-slate-400">
              Không gửi dữ liệu ra ngoài Internet. Toàn bộ mã nguồn, dữ liệu chấm bài, trình biên dịch C++ và Python chạy trực tiếp trên máy trạm của học sinh.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('exam')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 whitespace-nowrap"
        >
          Vào Chế độ Kiểm tra
        </button>
      </div>
    </div>
  );
};
