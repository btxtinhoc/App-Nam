import React from 'react';
import {
  Home,
  BookOpen,
  Milestone,
  Code2,
  FileCode2,
  Rocket,
  Trophy,
  BarChart3,
  GraduationCap,
  Timer,
  Settings,
  HardDrive,
  CheckCircle,
} from 'lucide-react';

export type NavTab =
  | 'home'
  | 'courses'
  | 'roadmap'
  | 'editor'
  | 'exercises'
  | 'projects'
  | 'achievements'
  | 'progress'
  | 'teacher'
  | 'exam'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenUsb: () => void;
  completedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenUsb,
  completedCount,
}) => {
  const menuItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-4 h-4" /> },
    { id: 'courses', label: 'Khóa học', icon: <BookOpen className="w-4 h-4" />, badge: '4 Môn' },
    { id: 'roadmap', label: 'Lộ trình học', icon: <Milestone className="w-4 h-4" /> },
    { id: 'editor', label: 'Code Editor', icon: <Code2 className="w-4 h-4 text-emerald-400" />, badge: 'Chính' },
    { id: 'exercises', label: 'Bài tập', icon: <FileCode2 className="w-4 h-4" />, badge: `${completedCount}/40` },
    { id: 'projects', label: 'Dự án thực tế', icon: <Rocket className="w-4 h-4 text-amber-400" /> },
    { id: 'achievements', label: 'Thành tích & Huy hiệu', icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
    { id: 'progress', label: 'Tiến độ học tập', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'exam', label: 'Chế độ Kiểm tra (Exam)', icon: <Timer className="w-4 h-4 text-rose-400" /> },
    { id: 'teacher', label: 'Chế độ Giáo viên', icon: <GraduationCap className="w-4 h-4 text-indigo-400" />, badge: 'PIN' },
    { id: 'settings', label: 'Cài đặt & Triển khai', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-60 bg-slate-950 border-r border-slate-800 flex flex-col justify-between select-none shrink-0">
      <div className="py-3 px-2">
        <div className="px-3 pb-2 mb-2 border-b border-slate-800/80">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Menu Học Tập
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-emerald-500/30 text-emerald-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* USB and Quick Status Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/40">
        <button
          onClick={onOpenUsb}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition shadow-sm mb-2"
        >
          <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
          <span>Xuất / Nhập USB</span>
        </button>

        <div className="text-[10px] text-slate-400 flex items-center justify-between px-1">
          <span>Phiên bản v1.0 Offline</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Cục bộ
          </span>
        </div>
      </div>
    </aside>
  );
};
