import React, { useState } from 'react';
import { Rocket, Award, CheckCircle2, Play, Code2, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectItem } from '../types';

interface ProjectsViewProps {
  onLoadProject: (project: ProjectItem) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onLoadProject }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(projects[0]);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 p-6 space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Rocket className="w-5 h-5 text-amber-400" />
          <span>Dự Án Thực Tế (Capstone Projects)</span>
        </h1>
        <p className="text-xs text-slate-400">
          Ứng dụng tổng hợp kiến thức để xây dựng các sản phẩm phần mềm thực thụ không cần mạng Internet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Projects List */}
        <div className="lg:col-span-5 space-y-3">
          {projects.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold uppercase">
                    {proj.courseId.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                    +{proj.xpReward} XP
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1">{proj.title}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Project Details & Action */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <span>Độ khó: {selectedProject.difficulty}</span>
                <span>•</span>
                <span>+{selectedProject.xpReward} XP</span>
              </div>
              <h2 className="text-base font-black text-white">{selectedProject.title}</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedProject.description}</p>
            </div>

            {/* Requirements list */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                📋 Yêu cầu kỹ thuật cần đạt:
              </h4>
              <div className="space-y-1.5">
                {selectedProject.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints */}
            {selectedProject.hints && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  💡 Gợi ý thực hiện:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {selectedProject.hints.map((hint, idx) => (
                    <li key={idx}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Nhấn nút bên cạnh để nạp khung sườn dự án vào Code Editor.
            </span>
            <button
              onClick={() => onLoadProject(selectedProject)}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs shadow-md shadow-amber-900/20 transition active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Bắt Đầu Làm Dự Án</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
