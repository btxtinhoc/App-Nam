import { StudentProfile, SubmissionRecord, TeacherAssignment, Language } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'codelab_student_profile',
  SUBMISSIONS: 'codelab_submissions',
  SAVED_CODES: 'codelab_saved_codes',
  TEACHER_CLASSES: 'codelab_teacher_classes',
  TEACHER_ASSIGNMENTS: 'codelab_teacher_assignments',
  EXAM_STATE: 'codelab_exam_state',
};

// Default profile for immediate use in offline computer lab
export const defaultProfile: StudentProfile = {
  name: 'Học sinh CodeLab',
  studentId: 'HS1001',
  className: '10A1',
  totalXp: 120,
  completedLessons: ['html-01', 'py-01'],
  earnedBadges: ['badge-beginner', 'badge-runner'],
  lastActive: new Date().toISOString(),
};

// Default sample classes for teacher mode
export const defaultTeacherClasses = [
  { id: 'class-10A1', name: 'Lớp 10A1', room: 'Phòng Máy 1', studentsCount: 35 },
  { id: 'class-10A2', name: 'Lớp 10A2', room: 'Phòng Máy 1', studentsCount: 32 },
  { id: 'class-11B1', name: 'Lớp 11B1', room: 'Phòng Máy 2', studentsCount: 38 },
];

export class StorageService {
  static getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!data) {
        this.saveProfile(defaultProfile);
        return defaultProfile;
      }
      return JSON.parse(data);
    } catch {
      return defaultProfile;
    }
  }

  static saveProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }

  static updateProfileInfo(name: string, studentId: string, className: string): StudentProfile {
    const profile = this.getProfile();
    profile.name = name;
    profile.studentId = studentId;
    profile.className = className;
    profile.lastActive = new Date().toISOString();
    this.saveProfile(profile);
    return profile;
  }

  static addCompletedLesson(lessonId: string, xpEarned: number): StudentProfile {
    const profile = this.getProfile();
    if (!profile.completedLessons.includes(lessonId)) {
      profile.completedLessons.push(lessonId);
      profile.totalXp += xpEarned;
    }
    // Check badges
    if (!profile.earnedBadges.includes('badge-beginner')) {
      profile.earnedBadges.push('badge-beginner');
    }
    if (profile.completedLessons.length >= 5 && !profile.earnedBadges.includes('badge-web-builder')) {
      profile.earnedBadges.push('badge-web-builder');
    }
    if (profile.totalXp >= 1000 && !profile.earnedBadges.includes('badge-master')) {
      profile.earnedBadges.push('badge-master');
    }
    this.saveProfile(profile);
    return profile;
  }

  // Saved code draft
  static getSavedCode(lessonId: string): string | null {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_CODES) || '{}');
      return all[lessonId] || null;
    } catch {
      return null;
    }
  }

  static saveCode(lessonId: string, code: string): void {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_CODES) || '{}');
      all[lessonId] = code;
      localStorage.setItem(STORAGE_KEYS.SAVED_CODES, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save code', e);
    }
  }

  // Submissions
  static getSubmissions(): SubmissionRecord[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
    } catch {
      return [];
    }
  }

  static addSubmission(sub: Omit<SubmissionRecord, 'id' | 'timestamp'>): SubmissionRecord {
    const submissions = this.getSubmissions();
    const newRecord: SubmissionRecord = {
      ...sub,
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    submissions.unshift(newRecord);
    try {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions.slice(0, 100))); // Keep latest 100
    } catch (e) {
      console.error('Failed to save submission', e);
    }
    return newRecord;
  }

  // Teacher assignments
  static getTeacherAssignments(): TeacherAssignment[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.TEACHER_ASSIGNMENTS) || '[]');
    } catch {
      return [];
    }
  }

  static saveTeacherAssignments(assignments: TeacherAssignment[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TEACHER_ASSIGNMENTS, JSON.stringify(assignments));
    } catch (e) {
      console.error('Failed to save teacher assignments', e);
    }
  }

  // USB Data Exchange helpers
  static exportStudentDataPackage(): string {
    const profile = this.getProfile();
    const submissions = this.getSubmissions();
    const codes = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_CODES) || '{}');

    const payload = {
      type: 'CODELAB_STUDENT_EXPORT',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      student: profile,
      submissions,
      savedCodes: codes,
    };

    return JSON.stringify(payload, null, 2);
  }

  static exportClassGradebookPackage(className: string): string {
    const submissions = this.getSubmissions().filter(s => !className || s.className === className);
    const payload = {
      type: 'CODELAB_TEACHER_GRADEBOOK',
      version: '1.0',
      className,
      exportedAt: new Date().toISOString(),
      submissions,
    };
    return JSON.stringify(payload, null, 2);
  }

  static importDataPackage(jsonString: string): { success: boolean; message: string; count?: number } {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'File không đúng định dạng dữ liệu CodeLab.' };
      }

      if (data.type === 'CODELAB_STUDENT_EXPORT') {
        // Teacher importing student's USB file
        const incomingSubs: SubmissionRecord[] = data.submissions || [];
        const currentSubs = this.getSubmissions();
        const existingIds = new Set(currentSubs.map(s => s.id));
        let added = 0;

        for (const sub of incomingSubs) {
          if (!existingIds.has(sub.id)) {
            currentSubs.push(sub);
            added++;
          }
        }
        localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(currentSubs));
        return {
          success: true,
          message: `Đã nhập thành công kết quả của học sinh "${data.student?.name || 'Vô danh'}" (${added} bài nộp mới).`,
          count: added,
        };
      }

      if (data.type === 'CODELAB_TEACHER_ASSIGNMENT') {
        // Student importing teacher's assignment from USB
        const assignments: TeacherAssignment[] = data.assignments || [];
        const current = this.getTeacherAssignments();
        const merged = [...assignments, ...current.filter(c => !assignments.some(a => a.id === c.id))];
        this.saveTeacherAssignments(merged);
        return {
          success: true,
          message: `Đã nạp thành công ${assignments.length} bài tập từ USB của giáo viên!`,
          count: assignments.length,
        };
      }

      return { success: false, message: 'Gói dữ liệu không xác định hoặc không tương thích.' };
    } catch (err: any) {
      return { success: false, message: `Lỗi đọc file: ${err.message}` };
    }
  }
}
