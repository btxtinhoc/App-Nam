import React from 'react';
import { Milestone, CheckCircle2, ArrowRight, Play, Award, Zap, Code2, Lock } from 'lucide-react';
import { courses } from '../data/courses';
import { StudentProfile } from '../types';

interface LearningPathViewProps {
  profile: StudentProfile;
  onSelectLesson: (lessonId: string) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({ profile, onSelectLesson }) => {
  const completedSet = new Set(profile.completedLessons);

  const stages = [
    {
      stage: 1,
      title: 'Giai đoạn 1: Nền tảng Thiết Kế Web (HTML5 & CSS3)',
      subtitle: 'Xây dựng trang web đầu tiên, rèn luyện cấu trúc Semantic và giao diện Flexbox hiện đại.',
      courseIds: ['html', 'css'],
      badgeRequirement: 'Web Builder',
    },
    {
      stage: 2,
      title: 'Giai đoạn 2: Lập Trình Tư Duy & Giải Quyết Vấn Đề (Python)',
      subtitle: 'Học cú pháp Python chuẩn, xử lý biến số, cấu trúc rẽ nhánh if/else, vòng lặp for/while và danh sách.',
      courseIds: ['python'],
      badgeRequirement: 'Python Beginner',
    },
    {
      stage: 3,
      title: 'Giai đoạn 3: Lập Trình Thi Đấu & Tối Ưu Thuật Toán (C++)',
      subtitle: 'Chuẩn bị cho kỳ thi Học sinh giỏi Tin học THCS & THPT: cin/cout tốc độ cao, mảng, chuỗi và tối ưu thuật toán.',
      courseIds: ['cpp'],
      badgeRequirement: 'Algorithm Solver',
    },
    {
      stage: 4,
      title: 'Giai đoạn 4: Dự Án Thực Tế & Thi Đấu Kiểm Tra',
      subtitle: 'Xây dựng website cá nhân, máy tính bỏ túi CLI, quản lý điểm học sinh và thử sức với chế độ kiểm tra giới hạn thời gian.',
      courseIds: [],
      badgeRequirement: 'Coding Master',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Milestone className="w-5 h-5 text-emerald-400" />
          <span>Lộ Trình Học Lập Trình Thực Hành (Roadmap)</span>
        </h1>
        <p className="text-xs text-slate-400">
          Lộ trình từng bước bài bản, từ người mới bắt đầu đến khi tự tin làm chủ tư duy giải thuật và tạo ra phần mềm thực thụ.
        </p>
      </div>

      {/* Interactive Stages Roadmap */}
      <div className="space-y-6">
        {stages.map((stage, sIdx) => {
          const matchedCourses = courses.filter((c) => stage.courseIds.includes(c.id));
          const totalInStage = matchedCourses.reduce((acc, c) => acc + c.lessons.length, 0);
          const completedInStage = matchedCourses.reduce(
            (acc, c) => acc + c.lessons.filter((l) => completedSet.has(l.id)).length,
            0
          );
          const pct = totalInStage > 0 ? Math.round((completedInStage / totalInStage) * 100) : 100;

          return (
            <div
              key={stage.stage}
              className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
                    {stage.stage}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">{stage.title}</h2>
                    <p className="text-xs text-slate-400">{stage.subtitle}</p>
                  </div>
                </div>

                {totalInStage > 0 && (
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-400">{pct}%</div>
                      <div className="text-[10px] text-slate-500">
                        {completedInStage}/{totalInStage} bài
                      </div>
                    </div>
                    <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Lessons Grid in this stage */}
              {matchedCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {matchedCourses.flatMap((c) =>
                    c.lessons.map((lesson) => {
                      const isDone = completedSet.has(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson.id)}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            isDone
                              ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                              {lesson.courseId.toUpperCase()} • Bài {lesson.order}
                            </span>
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-slate-700" />
                            )}
                          </div>
                          <div className="text-[11px] font-semibold truncate">{lesson.title.split(':')[1] || lesson.title}</div>
                        </button>
                      );
                    })
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    Giai đoạn ứng dụng: Hãy hoàn thành các bài học ở các giai đoạn trước để làm các dự án lớn và tham gia kiểm tra định kỳ!
                  </div>
                  <Award className="w-6 h-6 text-amber-400 shrink-0" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
