import { Course, Language } from '../../types';
import { htmlLessons } from './html';
import { cssLessons } from './css';
import { pythonLessons } from './python';
import { cppLessons } from './cpp';

export const courses: Course[] = [
  {
    id: 'html',
    name: 'HTML Cơ Bản & Nâng Cao',
    icon: 'Layout',
    color: '#e34f26',
    description: 'Xây dựng cấu trúc trang web, từ thẻ tiêu đề, đoạn văn đến bảng dữ liệu, form và Semantic HTML.',
    lessons: htmlLessons,
  },
  {
    id: 'css',
    name: 'CSS Thiết Kế Giao Diện',
    icon: 'Palette',
    color: '#1572b6',
    description: 'Làm đẹp trang web với màu sắc, typography, Flexbox hiện đại, CSS Grid và hiệu ứng tương tác.',
    lessons: cssLessons,
  },
  {
    id: 'python',
    name: 'Python Lập Trình Cơ Bản',
    icon: 'Terminal',
    color: '#3776ab',
    description: 'Học ngôn ngữ lập trình số 1 thế giới: print, biến, rẽ nhánh if/else, vòng lặp, list và thuật toán.',
    lessons: pythonLessons,
  },
  {
    id: 'cpp',
    name: 'C++ & Giải Thuật Thực Hành',
    icon: 'Cpu',
    color: '#00599c',
    description: 'Nền tảng thi học sinh giỏi Tin học: nhập xuất cin/cout tốc độ cao, mảng, chuỗi và tối ưu thuật toán.',
    lessons: cppLessons,
  },
];

export function getCourseById(id: Language): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getLessonById(lessonId: string) {
  for (const course of courses) {
    const found = course.lessons.find((l) => l.id === lessonId);
    if (found) return { course, lesson: found };
  }
  return null;
}
