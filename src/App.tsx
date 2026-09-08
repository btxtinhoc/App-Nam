/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopHeader } from './components/TopHeader';
import { Sidebar, NavTab } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { CoursesView } from './components/CoursesView';
import { LearningPathView } from './components/LearningPathView';
import { CodeEditorView } from './components/CodeEditorView';
import { ExercisesView } from './components/ExercisesView';
import { ProjectsView } from './components/ProjectsView';
import { AchievementsView } from './components/AchievementsView';
import { ProgressView } from './components/ProgressView';
import { TeacherMode } from './components/TeacherMode';
import { ExamMode } from './components/ExamMode';
import { SettingsView } from './components/SettingsView';
import { UsbExchangeModal } from './components/UsbExchangeModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { StorageService } from './services/storageService';
import { StudentProfile, ProjectItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeLessonId, setActiveLessonId] = useState<string>('py-01');
  const [profile, setProfile] = useState<StudentProfile>(() => StorageService.getProfile());

  const [isUsbModalOpen, setIsUsbModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Sync profile when window gets focus or periodic
  useEffect(() => {
    const handleStorage = () => {
      setProfile(StorageService.getProfile());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab('editor');
  };

  const handleLoadProject = (project: ProjectItem) => {
    // Navigate to editor with this language
    const langDefaultLesson =
      project.courseId === 'html'
        ? 'html-01'
        : project.courseId === 'css'
        ? 'css-01'
        : project.courseId === 'python'
        ? 'py-01'
        : 'cpp-01';

    // Store custom starter code
    StorageService.saveCode(langDefaultLesson, project.initialCode);
    setActiveLessonId(langDefaultLesson);
    setActiveTab('editor');
  };

  const handleLessonCompleted = (lessonId: string) => {
    setProfile(StorageService.getProfile());
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Top Application Header */}
      <TopHeader
        currentTab={activeTab}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenUsb={() => setIsUsbModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenUsb={() => setIsUsbModalOpen(true)}
          completedCount={profile.completedLessons.length}
        />

        {/* View Router */}
        <main className="flex-1 flex overflow-hidden relative">
          {activeTab === 'home' && (
            <HomeView
              profile={profile}
              onNavigate={(tab, lessonId) => {
                if (lessonId) setActiveLessonId(lessonId);
                setActiveTab(tab);
              }}
              onOpenUsb={() => setIsUsbModalOpen(true)}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView
              profile={profile}
              onSelectLesson={handleSelectLesson}
            />
          )}

          {activeTab === 'roadmap' && (
            <LearningPathView
              profile={profile}
              onSelectLesson={handleSelectLesson}
            />
          )}

          {activeTab === 'editor' && (
            <CodeEditorView
              key={activeLessonId}
              initialLessonId={activeLessonId}
              onLessonCompleted={handleLessonCompleted}
            />
          )}

          {activeTab === 'exercises' && (
            <ExercisesView
              profile={profile}
              onSelectLesson={handleSelectLesson}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView onLoadProject={handleLoadProject} />
          )}

          {activeTab === 'achievements' && (
            <AchievementsView profile={profile} />
          )}

          {activeTab === 'progress' && (
            <ProgressView profile={profile} />
          )}

          {activeTab === 'teacher' && <TeacherMode />}

          {activeTab === 'exam' && <ExamMode />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Modals */}
      {isUsbModalOpen && (
        <UsbExchangeModal
          profile={profile}
          onClose={() => setIsUsbModalOpen(false)}
        />
      )}

      {isProfileModalOpen && (
        <StudentProfileModal
          onClose={() => setIsProfileModalOpen(false)}
          onProfileUpdated={(updated) => setProfile(updated)}
        />
      )}
    </div>
  );
}

