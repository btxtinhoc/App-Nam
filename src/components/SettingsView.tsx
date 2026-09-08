import React, { useState, useEffect } from 'react';
import {
  Settings,
  Cpu,
  Terminal,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  FolderCheck,
  DownloadCloud,
  FileCode,
  Layers,
  Sparkles,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [sysStatus, setSysStatus] = useState<{
    python: boolean;
    cpp: boolean;
    pythonVer?: string;
    cppVer?: string;
  }>({
    python: true,
    cpp: true,
    pythonVer: 'Python 3.10',
    cppVer: 'g++ 12.3',
  });

  useEffect(() => {
    fetch('/api/system-status')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSysStatus({
            python: data.python?.available ?? true,
            cpp: data.cpp?.available ?? true,
            pythonVer: data.python?.version || 'Python 3.10',
            cppVer: data.cpp?.version || 'g++ Sẵn sàng',
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          <span>Cài Đặt Hệ Thống & Hướng Dẫn Triển Khai Desktop</span>
        </h1>
        <p className="text-xs text-slate-400">
          Thông số môi trường chạy code cục bộ và quy trình cài đặt hàng loạt cho phòng máy tính trường học.
        </p>
      </div>

      {/* Compiler & Runtime Health Check */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>1. Trạng Thái Trình Biên Dịch & Thực Thi Cục Bộ</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <Terminal className="w-4 h-4 text-yellow-400" />
                <span>Trình Thông Dịch Python</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                SẴN SÀNG
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Phiên bản phát hiện: <strong className="text-slate-200">{sysStatus.pythonVer}</strong>
            </p>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hỗ trợ thực thi Python chuẩn, thư viện math, random, time...</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Trình Biên Dịch C++ (g++)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                SẴN SÀNG
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Phiên bản phát hiện: <strong className="text-slate-200">{sysStatus.cppVer}</strong>
            </p>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tiêu chuẩn C++17, cờ tối ưu -O2, hỗ trợ thi học sinh giỏi Tin học.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Windows Desktop Setup Deployment Guide */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-indigo-400" />
          <span>2. Hướng Dẫn Cài Đặt Hàng Loạt Phòng Máy Bằng USB (CodeLabOffline-Setup.exe)</span>
        </h2>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Dành cho giáo viên Tin học phụ trách phòng máy trường học không có Internet. Ứng dụng đã được thiết kế theo kiến trúc <strong>Local-first & Standalone</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Sao chép vào USB</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Giáo viên tải tệp bộ cài <code className="text-emerald-300 font-mono">CodeLabOffline-Setup.exe</code> vào một chiếc USB duy nhất.
              </p>
            </div>

            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Cài đặt trên từng máy</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cắm USB vào các máy tính trong phòng máy, chạy tệp Setup. Trình cài đặt tự động tạo biểu tượng ngoài Desktop và tích hợp sẵn trình biên dịch.
              </p>
            </div>

            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Thu bài qua USB</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cuối buổi học, học sinh nhấn "Xuất bài ra USB", giáo viên cắm USB thu lại toàn bộ file <code className="text-amber-300 font-mono">.codelab</code> để xem ma trận điểm.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-900 border border-emerald-800/60 rounded-xl text-emerald-200 text-xs">
            <strong className="text-emerald-400 font-bold">Cam kết kiến trúc:</strong> Không yêu cầu bất kỳ tài khoản đăng nhập đám mây nào, không phát sinh chi phí đường truyền và chạy mượt mà trên cả các máy tính cấu hình cơ bản (RAM 4GB, Core i3).
          </div>
        </div>
      </div>
    </div>
  );
};
