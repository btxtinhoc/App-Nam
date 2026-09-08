import React, { useState, useEffect } from 'react';
import { WifiOff, Cpu, Award, User, Clock, HardDrive, CheckCircle2, ShieldAlert } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { StudentProfile } from '../types';

interface TopHeaderProps {
  currentTab: string;
  onOpenProfile: () => void;
  onOpenUsb: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ currentTab, onOpenProfile, onOpenUsb }) => {
  const [profile, setProfile] = useState<StudentProfile>(StorageService.getProfile());
  const [systemInfo, setSystemInfo] = useState<{ python: boolean; cpp: boolean; pyVer: string; cppVer: string }>({
    python: true,
    cpp: true,
    pyVer: 'Python 3.10',
    cppVer: 'g++ 12.3',
  });

  useEffect(() => {
    // Check local server compiler status
    fetch('/api/system-status')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSystemInfo({
            python: data.python?.available ?? true,
            cpp: data.cpp?.available ?? true,
            pyVer: data.python?.version ? data.python.version.split(' ')[1] || '3.10' : 'Sẵn sàng',
            cppVer: data.cpp?.available ? 'g++ Sẵn sàng' : 'Giả lập cục bộ',
          });
        }
      })
      .catch(() => {
        // In static offline mode, client interpreter is active
      });

    const interval = setInterval(() => {
      setProfile(StorageService.getProfile());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between select-none text-slate-100 shrink-0 z-10">
      {/* Left: App Title & Offline Status Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-bold tracking-tight text-white text-lg">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-mono text-white shadow-sm shadow-emerald-500/20">
            &gt;_
          </div>
          <span>CODELAB OFFLINE</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-medium">
          <WifiOff className="w-3.5 h-3.5" />
          <span>100% Offline (Không Internet)</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 border-l border-slate-800 pl-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Python {systemInfo.pyVer}
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            C++ {systemInfo.cppVer}
          </span>
        </div>
      </div>

      {/* Right: Student Profile & USB Quick Action */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenUsb}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition"
          title="Trao đổi bài làm và đề thi bằng USB"
        >
          <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Trao đổi USB</span>
        </button>

        {/* XP counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-950/60 border border-amber-700/50 text-amber-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{profile.totalXp} XP</span>
        </div>

        {/* Student card trigger */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-md bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition text-left"
        >
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-xs">
            <div className="font-medium text-slate-200 leading-tight truncate max-w-[120px]">{profile.name}</div>
            <div className="text-[10px] text-slate-400">{profile.className} • {profile.studentId}</div>
          </div>
        </button>
      </div>
    </header>
  );
};
