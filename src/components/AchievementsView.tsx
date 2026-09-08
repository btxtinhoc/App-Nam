import React from 'react';
import { Trophy, Award, Zap, Flame, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { badges } from '../data/badges';
import { StudentProfile } from '../types';

interface AchievementsViewProps {
  profile: StudentProfile;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ profile }) => {
  // Determine level
  // Level 1: 0-199 XP
  // Level 2: 200-499 XP
  // Level 3: 500-999 XP
  // Level 4: 1000-1999 XP
  // Level 5: 2000+ XP
  let currentLevel = 1;
  let nextLevelXp = 200;
  let levelTitle = 'Tập sự Lập trình';

  if (profile.totalXp >= 2000) {
    currentLevel = 5;
    nextLevelXp = 5000;
    levelTitle = 'Bậc Thầy CodeLab';
  } else if (profile.totalXp >= 1000) {
    currentLevel = 4;
    nextLevelXp = 2000;
    levelTitle = 'Chiến Binh Giải Thuật';
  } else if (profile.totalXp >= 500) {
    currentLevel = 3;
    nextLevelXp = 1000;
    levelTitle = 'Thợ Xây Mã Nguồn';
  } else if (profile.totalXp >= 200) {
    currentLevel = 2;
    nextLevelXp = 500;
    levelTitle = 'Học Sinh Chăm Chỉ';
  }

  const levelProgress = Math.min(100, Math.round((profile.totalXp / nextLevelXp) * 100));

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span>Hệ Thống Điểm Kinh Nghiệm (XP) & Huy Hiệu</span>
        </h1>
        <p className="text-xs text-slate-400">
          Ghi nhận nỗ lực học tập của học sinh qua từng bài code, bài tập và dự án hoàn thành.
        </p>
      </div>

      {/* Level Card */}
      <div className="bg-linear-to-r from-amber-950/60 via-slate-950 to-slate-950 border border-amber-800/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-2xl shadow-inner">
            Lv.{currentLevel}
          </div>
          <div className="space-y-1 text-left">
            <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
              Danh hiệu hiện tại
            </span>
            <h2 className="text-xl font-black text-white">{levelTitle}</h2>
            <p className="text-xs text-slate-400">
              {profile.name} • {profile.className} • Tổng tích lũy:{' '}
              <strong className="text-amber-300">{profile.totalXp} XP</strong>
            </p>
          </div>
        </div>

        <div className="w-full md:w-72 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400">Tiến độ lên Cấp {currentLevel + 1}</span>
            <span className="text-amber-400">{profile.totalXp} / {nextLevelXp} XP</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${levelProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Huy Hiệu Thành Tích Của Em ({profile.earnedBadges.length}/{badges.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const isEarned = profile.earnedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                  isEarned
                    ? 'bg-slate-950 border-amber-500/60 shadow-md ring-1 ring-amber-500/20'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isEarned
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  <Trophy className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                    {isEarned && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                        ĐÃ ĐẠT
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{badge.description}</p>
                  <div className="text-[10px] text-slate-500 pt-1 font-mono">
                    Điều kiện: {badge.requirement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rules for XP breakdown */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Cơ chế tính điểm kinh nghiệm (XP Matrix)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <div className="text-emerald-400 font-bold text-base">+50 - 100 XP</div>
            <div className="text-slate-400 mt-1">Hoàn thành bài thực hành</div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <div className="text-blue-400 font-bold text-base">+100 XP</div>
            <div className="text-slate-400 mt-1">Bài tập nâng cao & thử thách</div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <div className="text-indigo-400 font-bold text-base">+200 XP</div>
            <div className="text-slate-400 mt-1">Vượt qua bài kiểm tra (Exam)</div>
          </div>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <div className="text-amber-400 font-bold text-base">+300 XP</div>
            <div className="text-slate-400 mt-1">Hoàn thành dự án thực tế</div>
          </div>
        </div>
      </div>
    </div>
  );
};
