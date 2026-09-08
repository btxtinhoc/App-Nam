import { Badge } from '../types';

export const badges: Badge[] = [
  {
    id: 'badge-beginner',
    title: 'Người Mới Bắt Đầu',
    icon: 'Award',
    description: 'Bắt đầu hành trình học lập trình tại phòng máy.',
    requirement: 'Hoàn thành bài học đầu tiên.',
  },
  {
    id: 'badge-runner',
    title: 'Code Runner',
    icon: 'Zap',
    description: 'Chạy thử chương trình đầu tiên trên máy tính thật.',
    requirement: 'Nhấn nút Chạy chương trình ít nhất 3 lần.',
  },
  {
    id: 'badge-web-builder',
    title: 'Web Builder',
    icon: 'Globe',
    description: 'Làm chủ HTML và CSS để xây dựng giao diện web.',
    requirement: 'Hoàn thành 5 bài học HTML hoặc CSS.',
  },
  {
    id: 'badge-python-beginner',
    title: 'Python Beginner',
    icon: 'Terminal',
    description: 'Khởi động tư duy lập trình với ngôn ngữ Python.',
    requirement: 'Vượt qua 5 bài học Python đạt 100 điểm test.',
  },
  {
    id: 'badge-algo-solver',
    title: 'Algorithm Solver',
    icon: 'Flame',
    description: 'Giải quyết các thuật toán C++ và cấu trúc dữ liệu.',
    requirement: 'Hoàn thành 5 bài học C++ chuẩn xác.',
  },
  {
    id: 'badge-master',
    title: 'Coding Master',
    icon: 'Trophy',
    description: 'Chinh phục hơn 20 bài học và dự án thực hành.',
    requirement: 'Đạt từ 1000 XP trở lên.',
  },
];
