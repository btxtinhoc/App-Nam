import { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  {
    id: 'proj-html-01',
    title: 'Website Giới Thiệu Bản Thân (Portfolio)',
    courseId: 'html',
    difficulty: 'Cơ bản',
    description: 'Xây dựng một trang web cá nhân hoàn chỉnh bao gồm thông tin giới thiệu, ảnh đại diện, kỹ năng lập trình và liên kết liên hệ.',
    requirements: [
      'Sử dụng các thẻ Semantic: <header>, <main>, <section>, <footer>',
      'Có thẻ <h1> hiển thị tên của bạn',
      'Có danh sách <ul> liệt kê các sở thích hoặc kỹ năng',
      'Có ít nhất 1 hình ảnh <img> và 1 liên kết <a>',
    ],
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Trang Cá Nhân Của Tôi</title>
</head>
<body>
  <!-- Bắt đầu thiết kế website của bạn tại đây -->
  
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Trang Cá Nhân Của Tôi</title>
</head>
<body>
  <header>
    <h1>Xin chào, tôi là Nguyễn Văn A</h1>
    <p>Học sinh trường THPT - Lập trình viên tương lai</p>
  </header>
  <main>
    <section>
      <h2>Kỹ năng Lập trình</h2>
      <ul>
        <li>HTML & CSS Cơ bản</li>
        <li>Python Tư duy Thuật toán</li>
        <li>C++ Nhập môn Tin học</li>
      </ul>
    </section>
    <section>
      <h2>Liên hệ</h2>
      <a href="mailto:email@codelab.vn">Gửi thư cho tôi</a>
    </section>
  </main>
  <footer>
    <p>© 2026 CodeLab Offline Portfolio</p>
  </footer>
</body>
</html>`,
    hints: [
      'Sắp xếp các thẻ theo thứ tự logic: header -> main -> footer.',
      'Sử dụng các thẻ h1, h2 cho từng phần nội dung.',
      'Dùng danh sách ul và li để liệt kê các kỹ năng.'
    ],
    xpReward: 200,
  },
  {
    id: 'proj-css-01',
    title: 'Website Lớp Học & Thời Khóa Biểu',
    courseId: 'css',
    difficulty: 'Trung bình',
    description: 'Thiết kế giao diện bảng điều khiển lớp học hiện đại với thanh Menu điều hướng ngang Flexbox và lưới các môn học CSS Grid.',
    requirements: [
      'Thanh navbar sử dụng display: flex và justify-content: space-between',
      'Khu vực thẻ môn học sử dụng display: grid hoặc flexbox',
      'Các thẻ môn học có bo góc border-radius: 8px và hiệu ứng hover nhẹ',
      'Màu sắc trang nhã, phông chữ sans-serif dễ đọc',
    ],
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; background: #f8fafc; }
    /* Viết CSS tại đây */
  </style>
</head>
<body>
  <div class="navbar">
    <h2>Lớp 10A1</h2>
    <div>Phòng máy số 1</div>
  </div>
  <div class="grid">
    <div class="card">Toán học</div>
    <div class="card">Tin học</div>
    <div class="card">Vật lý</div>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; background: #f1f5f9; }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      color: white;
      padding: 16px 32px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 32px;
      max-width: 900px;
      margin: 0 auto;
    }
    .card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      text-align: center;
      font-weight: bold;
      color: #334155;
      transition: transform 0.2s ease;
    }
    .card:hover {
      transform: translateY(-4px);
    }
  </style>
</head>
<body>
  <div class="navbar">
    <h2>Lớp 10A1 - Cổng Thông Tin</h2>
    <div>Năm học 2025-2026</div>
  </div>
  <div class="grid">
    <div class="card">Môn Toán Học</div>
    <div class="card">Môn Tin Học (CodeLab)</div>
    <div class="card">Môn Vật Lý</div>
  </div>
</body>
</html>`,
    hints: [
      'Áp dụng display: flex cho .navbar và display: grid cho .grid.',
      'Sử dụng border-radius: 12px để tạo góc tròn hiện đại.',
      'Tạo hiệu ứng :hover với transform: translateY(-4px).'
    ],
    xpReward: 250,
  },
  {
    id: 'proj-py-01',
    title: 'Máy Tính Bỏ Túi Đa Năng (CLI Calculator)',
    courseId: 'python',
    difficulty: 'Cơ bản',
    description: 'Xây dựng chương trình máy tính nhận vào 2 số a, b và 1 phép toán (+, -, *, /), sau đó in ra kết quả phép tính.',
    requirements: [
      'Đọc 2 số nguyên a, b',
      'Đọc ký tự phép toán (+, -, *, /)',
      'Sử dụng if/elif/else để tính toán đúng theo phép toán',
      'Xử lý trường hợp chia cho 0',
    ],
    initialCode: `# Máy tính bỏ túi Python
a = float(input())
b = float(input())
phep_toan = input().strip()

# Viết logic tính toán tại đây
`,
    solutionCode: `a = float(input())
b = float(input())
pt = input().strip()

if pt == '+':
    print(a + b)
elif pt == '-':
    print(a - b)
elif pt == '*':
    print(a * b)
elif pt == '/':
    if b == 0:
        print("KHONG THE CHIA CHO 0")
    else:
        print(a / b)
else:
    print("PHEP TOAN KHONG HOP LE")`,
    hints: [
      'Dùng cấu trúc if pt == "+": ... elif pt == "-": ...',
      'Kiểm tra b == 0 trước khi thực hiện phép chia /.'
    ],
    xpReward: 200,
  },
  {
    id: 'proj-py-02',
    title: 'Trò Chơi Đoán Số Bí Mật (Number Guessing)',
    courseId: 'python',
    difficulty: 'Trung bình',
    description: 'Chương trình đặt một số bí mật. Người dùng nhập các số dự đoán cho đến khi đoán đúng. Chương trình gợi ý "LON HON" hoặc "NHO HON".',
    requirements: [
      'Sử dụng vòng lặp while',
      'So sánh số đoán với số bí mật',
      'In "LON HON" nếu số bí mật lớn hơn số người dùng nhập',
      'In "NHO HON" nếu số bí mật nhỏ hơn số người dùng nhập',
      'In "CHINH XAC" khi đoán trúng và kết thúc',
    ],
    initialCode: `# Trò chơi đoán số
so_bi_mat = 42

while True:
    doan = int(input())
    # So sánh và in gợi ý
`,
    solutionCode: `so_bi_mat = 42

while True:
    doan = int(input())
    if doan == so_bi_mat:
        print("CHINH XAC")
        break
    elif doan < so_bi_mat:
        print("LON HON")
    else:
        print("NHO HON")`,
    hints: [
      'Dùng break để thoát vòng lặp khi doan == so_bi_mat.',
      'Sử dụng câu lệnh elif để kiểm tra các trường hợp còn lại.'
    ],
    xpReward: 250,
  },
  {
    id: 'proj-cpp-01',
    title: 'Hệ Thống Thống Kê Điểm Học Sinh',
    courseId: 'cpp',
    difficulty: 'Trung bình',
    description: 'Nhập số học sinh n và danh sách điểm. Tính điểm trung bình, điểm cao nhất (Max), điểm thấp nhất (Min) và số học sinh đạt điểm giỏi (>= 8.0).',
    requirements: [
      'Nhập số nguyên n',
      'Duyệt nhập mảng điểm các học sinh',
      'Tìm Max, Min, tính Tổng để chia trung bình',
      'Đếm số học sinh có điểm >= 8.0',
    ],
    initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        // Viết chương trình thống kê điểm
        
    }
    return 0;
}`,
    solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    if (cin >> n && n > 0) {
        double diem[1005];
        double tong = 0;
        double maxDiem = -1;
        double minDiem = 100;
        int demGioi = 0;

        for (int i = 0; i < n; i++) {
            cin >> diem[i];
            tong += diem[i];
            if (diem[i] > maxDiem) maxDiem = diem[i];
            if (diem[i] < minDiem) minDiem = diem[i];
            if (diem[i] >= 8.0) demGioi++;
        }

        cout << "Max: " << maxDiem << endl;
        cout << "Min: " << minDiem << endl;
        cout << "TB: " << fixed << setprecision(1) << (tong / n) << endl;
        cout << "Gioi: " << demGioi << endl;
    }
    return 0;
}`,
    hints: [
      'Khởi tạo maxDiem nhỏ nhất có thể, minDiem lớn nhất có thể.',
      'Trong vòng lặp: cộng dồn vào tong và kiểm tra >= 8.0.'
    ],
    xpReward: 300,
  },
];
