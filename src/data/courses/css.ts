import { Lesson } from '../../types';

export const cssLessons: Lesson[] = [
  {
    id: 'css-01',
    courseId: 'css',
    order: 1,
    title: 'Bài 1: Cú pháp CSS & Bộ chọn Phần tử (Element Selector)',
    description: 'Tìm hiểu cách CSS thay đổi màu sắc, cỡ chữ của các thẻ HTML.',
    target: 'Biết cách viết khối quy tắc CSS với Bộ chọn (Selector), Thuộc tính (Property) và Giá trị (Value).',
    theory: `CSS (Cascading Style Sheets) định nghĩa cách các phần tử HTML hiển thị trên màn hình.
Cú pháp cơ bản:
selector {
  property: value;
}
Ví dụ:
h1 {
  color: blue;
  font-size: 24px;
}
Trong HTML, ta có thể đặt CSS trong thẻ <style> bên trong phần <head>.`,
    examples: [
      {
        title: 'Đổi màu tiêu đề thành màu xanh biển',
        code: `<style>
  h1 {
    color: #2563eb;
    text-align: center;
  }
</style>
<h1>Tiêu đề màu xanh được canh giữa</h1>`
      }
    ],
    task: 'Viết CSS trong thẻ <style> để đổi màu chữ của thẻ <h1> thành màu đỏ ("red" hoặc "#ef4444") và thẻ <p> có cỡ chữ 18px ("font-size: 18px;").',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Viết quy tắc CSS cho h1 và p vào đây */
      
    </style>
  </head>
  <body>
    <h1>Tiêu đề quan trọng</h1>
    <p>Đoạn văn hướng dẫn bài tập.</p>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: red;
      }
      p {
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <h1>Tiêu đề quan trọng</h1>
    <p>Đoạn văn hướng dẫn bài tập.</p>
  </body>
</html>`,
    hints: [
      'Viết h1 { color: red; } để đổi màu chữ tiêu đề.',
      'Viết p { font-size: 18px; } để chỉnh cỡ chữ đoạn văn.',
      'Mỗi thuộc tính kết thúc bằng dấu chấm phẩy (;).'
    ],
    advancedChallenge: 'Thêm thuộc tính text-align: center; cho thẻ h1.',
    htmlCssRules: [
      { ruleId: 'rule-h1-color', description: 'Thẻ <h1> có màu chữ đỏ (red hoặc #ef4444)', selector: 'h1', cssProperty: { prop: 'color', value: 'red' } },
      { ruleId: 'rule-p-font', description: 'Thẻ <p> có font-size: 18px', selector: 'p', cssProperty: { prop: 'font-size', value: '18px' } }
    ],
    xpReward: 50
  },
  {
    id: 'css-02',
    courseId: 'css',
    order: 2,
    title: 'Bài 2: Bộ chọn Lớp (.class) và Định danh (#id)',
    description: 'Phân biệt cách chọn phần tử cụ thể bằng class và id.',
    target: 'Áp dụng kiểu dáng cho một nhóm phần tử bằng class hoặc một phần tử duy nhất bằng id.',
    theory: `- Class (.ten-lop): Dùng dấu chấm trước tên lớp. Một class có thể dùng cho NHIỀU thẻ khác nhau.
- ID (#ten-id): Dùng dấu thăng trước tên id. ID là DUY NHẤT cho một phần tử trên trang.
Ví dụ:
.highlight {
  background-color: yellow;
}
#main-btn {
  font-weight: bold;
}`,
    examples: [
      {
        title: 'Áp dụng class và id',
        code: `<style>
  .badge {
    background-color: #e0e7ff;
    color: #3730a3;
    padding: 4px 8px;
  }
  #author-name {
    color: #059669;
  }
</style>
<span class="badge">Lập trình viên</span>
<p id="author-name">Nguyễn Văn A</p>`
      }
    ],
    task: 'Tạo class ".highlight" có màu nền "yellow" (background-color: yellow;) và áp dụng class này cho thẻ <p>.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Định nghĩa class .highlight tại đây */
      
    </style>
  </head>
  <body>
    <h1>Chào mừng</h1>
    <!-- Thêm class="highlight" vào thẻ p -->
    <p>Dòng chữ này cần được làm nổi bật với màu nền vàng.</p>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .highlight {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <h1>Chào mừng</h1>
    <p class="highlight">Dòng chữ này cần được làm nổi bật với màu nền vàng.</p>
  </body>
</html>`,
    hints: [
      'Định nghĩa trong style: .highlight { background-color: yellow; }',
      'Trong body: <p class="highlight">...',
      'Dấu chấm (.) chỉ dùng trong CSS, trong HTML chỉ viết class="highlight".'
    ],
    advancedChallenge: 'Tạo thêm id #special cho thẻ h1 với màu chữ tím.',
    htmlCssRules: [
      { ruleId: 'rule-class-applied', description: 'Có phần tử mang class="highlight"', selector: '.highlight' },
      { ruleId: 'rule-highlight-bg', description: 'Class .highlight có background-color là yellow', selector: '.highlight', cssProperty: { prop: 'background-color', value: 'yellow' } }
    ],
    xpReward: 50
  },
  {
    id: 'css-03',
    courseId: 'css',
    order: 3,
    title: 'Bài 3: Màu sắc và Phông chữ (Colors & Fonts)',
    description: 'Sử dụng mã màu HEX, RGB và các thuộc tính font chữ phong phú.',
    target: 'Tùy biến typography: font-family, font-weight, line-height, text-transform.',
    theory: `Màu sắc trong CSS có nhiều định dạng:
- Tên màu: red, blue, green, coral...
- Mã HEX: #1e293b, #3b82f6...
- Mã RGB/RGBA: rgb(59, 130, 246), rgba(0, 0, 0, 0.5)

Thuộc tính phông chữ:
- font-family: 'Segoe UI', Tahoma, sans-serif...
- font-weight: bold, normal, 600, 700...
- line-height: khoảng cách giữa các dòng (ví dụ: 1.6).`,
    examples: [
      {
        title: 'Định dạng chữ',
        code: `body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #334155;
}`
      }
    ],
    task: 'Thiết lập thẻ <body> có font-family là "Arial, sans-serif" và thẻ <h2> có màu chữ "#2563eb" kèm font-weight là "bold".',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Viết CSS cho body và h2 */
    </style>
  </head>
  <body>
    <h2>Khám phá CSS Hiện đại</h2>
    <p>Nội dung bài viết với phông chữ rõ ràng, dễ đọc.</p>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h2 {
        color: #2563eb;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h2>Khám phá CSS Hiện đại</h2>
    <p>Nội dung bài viết với phông chữ rõ ràng, dễ đọc.</p>
  </body>
</html>`,
    hints: [
      'Viết body { font-family: Arial, sans-serif; }',
      'Viết h2 { color: #2563eb; font-weight: bold; }',
      'Đảm bảo mã màu #2563eb có dấu thăng (#) phía trước.'
    ],
    advancedChallenge: 'Thêm text-transform: uppercase; cho thẻ h2 để biến tất cả thành chữ in hoa.',
    htmlCssRules: [
      { ruleId: 'rule-body-font', description: 'Body sử dụng font-family sans-serif hoặc Arial', selector: 'body', cssProperty: { prop: 'font-family', value: 'Arial' } },
      { ruleId: 'rule-h2-style', description: 'Thẻ <h2> có màu #2563eb hoặc blue', selector: 'h2', cssProperty: { prop: 'color', value: '#2563eb' } }
    ],
    xpReward: 60
  },
  {
    id: 'css-04',
    courseId: 'css',
    order: 4,
    title: 'Bài 4: Mô hình Hộp (The CSS Box Model)',
    description: 'Hiểu rõ 4 lớp cấu tạo phần tử: Content, Padding, Border, Margin.',
    target: 'Biết cách căn chỉnh khoảng cách trong và khoảng cách ngoài của các khối giao diện.',
    theory: `Mọi phần tử trong HTML đều là một chiếc hộp chữ nhật:
1. Content: Vùng chứa nội dung chữ hoặc hình ảnh.
2. Padding: Khoảng cách đệm từ nội dung đến đường viền (bên trong viền).
3. Border: Đường viền bao quanh phần tử.
4. Margin: Khoảng cách cách ly từ đường viền ra các phần tử xung quanh (bên ngoài viền).`,
    examples: [
      {
        title: 'Một chiếc thẻ Card hoàn chỉnh',
        code: `.card {
  padding: 20px;
  border: 2px solid #cbd5e1;
  margin: 15px;
  background-color: #f8fafc;
}`
      }
    ],
    task: 'Thiết lập cho class ".card" có: padding: 20px;, border: 2px solid blue; và margin: 10px;.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .card {
        /* Bổ sung padding, border, margin */
        
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h3>Thẻ thông tin học sinh</h3>
      <p>Lớp 10A1 - Phòng máy tính.</p>
    </div>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .card {
        padding: 20px;
        border: 2px solid blue;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h3>Thẻ thông tin học sinh</h3>
      <p>Lớp 10A1 - Phòng máy tính.</p>
    </div>
  </body>
</html>`,
    hints: [
      'Ghi đúng cú pháp padding: 20px;',
      'Đường viền: border: 2px solid blue;',
      'Khoảng cách ngoài: margin: 10px;'
    ],
    advancedChallenge: 'Thêm border-radius: 8px; để bo tròn góc của thẻ card.',
    htmlCssRules: [
      { ruleId: 'rule-padding', description: 'Class .card có padding là 20px', selector: '.card', cssProperty: { prop: 'padding', value: '20px' } },
      { ruleId: 'rule-border', description: 'Class .card có border 2px solid', selector: '.card', cssProperty: { prop: 'border-width', value: '2px' } },
      { ruleId: 'rule-margin', description: 'Class .card có margin là 10px', selector: '.card', cssProperty: { prop: 'margin', value: '10px' } }
    ],
    xpReward: 70
  },
  {
    id: 'css-05',
    courseId: 'css',
    order: 5,
    title: 'Bài 5: Đường viền và Bo tròn góc (Border & Border-Radius)',
    description: 'Trang trí khung khối và nút bấm hiện đại với border-radius.',
    target: 'Tạo nút bấm mềm mại hoặc khung ảnh hình tròn bằng border-radius: 50%.',
    theory: `- border: <kích_thước> <kiểu_viền> <màu_sắc>;
  Các kiểu viền: solid (liền), dashed (nét đứt), dotted (chấm).
- border-radius: Bo tròn các góc.
  Ví dụ: border-radius: 8px; bo nhẹ, border-radius: 50%; tạo hình tròn hoàn hảo.`,
    examples: [
      {
        title: 'Nút bấm đẹp mắt',
        code: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
}`
      }
    ],
    task: 'Viết CSS cho class ".btn" có: background-color: green;, color: white;, padding: 12px 24px; và border-radius: 8px;.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .btn {
        /* Tạo kiểu dáng nút bấm */
      }
    </style>
  </head>
  <body>
    <button class="btn">Bắt đầu học</button>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .btn {
        background-color: green;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        border: none;
      }
    </style>
  </head>
  <body>
    <button class="btn">Bắt đầu học</button>
  </body>
</html>`,
    hints: [
      'Thiết lập background-color: green; và color: white;',
      'Đặt padding: 12px 24px;',
      'Thiết lập border-radius: 8px;'
    ],
    advancedChallenge: 'Thêm hiệu ứng rê chuột :hover thay đổi màu nền.',
    htmlCssRules: [
      { ruleId: 'rule-btn-bg', description: 'Nút .btn có màu nền xanh lá (green)', selector: '.btn', cssProperty: { prop: 'background-color', value: 'green' } },
      { ruleId: 'rule-btn-radius', description: 'Nút .btn có bo góc 8px', selector: '.btn', cssProperty: { prop: 'border-radius', value: '8px' } }
    ],
    xpReward: 70
  },
  {
    id: 'css-06',
    courseId: 'css',
    order: 6,
    title: 'Bài 6: Bố cục Flexbox 1 chiều (CSS Flexbox)',
    description: 'Sử dụng display: flex, justify-content, align-items, gap để dàn trang chuyên nghiệp.',
    target: 'Dễ dàng canh giữa phần tử và sắp xếp các mục thành hàng ngang.',
    theory: `Flexbox là công nghệ bố cục mạnh mẽ nhất của CSS:
- display: flex;: Kích hoạt thùng chứa cha thành flex container.
- justify-content: Căn chỉnh theo trục ngang (flex-start, center, space-between, space-around).
- align-items: Căn chỉnh theo trục dọc (center, flex-start, flex-end).
- gap: Khoảng cách giữa các phần tử con.`,
    examples: [
      {
        title: 'Thanh menu ngang tự động cách đều',
        code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #1e293b;
  color: white;
}`
      }
    ],
    task: 'Thiết lập cho class ".container" có: display: flex;, justify-content: center;, align-items: center; và gap: 15px;.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        /* Thêm các thuộc tính Flexbox */
      }
      .box {
        background-color: #3b82f6;
        color: white;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box">Khối 1</div>
      <div class="box">Khối 2</div>
      <div class="box">Khối 3</div>
    </div>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
      }
      .box {
        background-color: #3b82f6;
        color: white;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box">Khối 1</div>
      <div class="box">Khối 2</div>
      <div class="box">Khối 3</div>
    </div>
  </body>
</html>`,
    hints: [
      'Ghi display: flex; để kích hoạt Flexbox.',
      'Canh giữa trục ngang: justify-content: center;',
      'Khoảng cách giữa các khối: gap: 15px;'
    ],
    advancedChallenge: 'Thêm flex-direction: column; để xếp các khối thành cột dọc.',
    htmlCssRules: [
      { ruleId: 'rule-flex', description: 'Class .container có display: flex', selector: '.container', cssProperty: { prop: 'display', value: 'flex' } },
      { ruleId: 'rule-justify', description: 'justify-content là center', selector: '.container', cssProperty: { prop: 'justify-content', value: 'center' } },
      { ruleId: 'rule-gap', description: 'gap là 15px', selector: '.container', cssProperty: { prop: 'gap', value: '15px' } }
    ],
    xpReward: 80
  },
  {
    id: 'css-07',
    courseId: 'css',
    order: 7,
    title: 'Bài 7: Lưới Bố cục 2 chiều (CSS Grid)',
    description: 'Tạo lưới hàng và cột với display: grid và grid-template-columns.',
    target: 'Chia giao diện thành các cột đều nhau (ví dụ: bộ sưu tập ảnh, danh sách sản phẩm).',
    theory: `CSS Grid là hệ thống bố cục 2 chiều (hàng và cột):
- display: grid;: Khởi tạo lưới.
- grid-template-columns: repeat(3, 1fr);: Tạo 3 cột bằng nhau (1fr = 1 phần phân số tử).
- gap: Khoảng cách giữa các ô lưới.`,
    examples: [
      {
        title: 'Lưới 3 cột',
        code: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`
      }
    ],
    task: 'Viết CSS cho class ".grid-box" có: display: grid;, grid-template-columns: repeat(2, 1fr); và gap: 10px;.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .grid-box {
        /* Bổ sung các thuộc tính Grid */
      }
      .item {
        background-color: #f59e0b;
        color: white;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="grid-box">
      <div class="item">Ô 1</div>
      <div class="item">Ô 2</div>
      <div class="item">Ô 3</div>
      <div class="item">Ô 4</div>
    </div>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .grid-box {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .item {
        background-color: #f59e0b;
        color: white;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="grid-box">
      <div class="item">Ô 1</div>
      <div class="item">Ô 2</div>
      <div class="item">Ô 3</div>
      <div class="item">Ô 4</div>
    </div>
  </body>
</html>`,
    hints: [
      'Ghi display: grid;',
      'Thiết lập cột: grid-template-columns: repeat(2, 1fr); (hoặc 1fr 1fr;)',
      'Thiết lập khoảng trống: gap: 10px;'
    ],
    advancedChallenge: 'Thử thay đổi thành repeat(4, 1fr) để xem 4 ô dàn trên cùng 1 hàng.',
    htmlCssRules: [
      { ruleId: 'rule-grid', description: 'Có display: grid', selector: '.grid-box', cssProperty: { prop: 'display', value: 'grid' } },
      { ruleId: 'rule-grid-gap', description: 'Có gap: 10px', selector: '.grid-box', cssProperty: { prop: 'gap', value: '10px' } }
    ],
    xpReward: 80
  },
  {
    id: 'css-08',
    courseId: 'css',
    order: 8,
    title: 'Bài 8: Thiết kế Thích ứng (Responsive với Media Queries)',
    description: 'Tùy biến giao diện cho màn hình máy tính bảng và điện thoại với @media.',
    target: 'Biết cách viết quy tắc đổi màu hoặc thay đổi số cột khi kích thước màn hình thu nhỏ.',
    theory: `Media Query cho phép áp dụng CSS riêng tùy thuộc vào độ rộng màn hình (viewport width):
@media (max-width: 600px) {
  /* Các quy tắc chỉ áp dụng khi màn hình <= 600px */
  body {
    background-color: lightblue;
  }
}`,
    examples: [
      {
        title: 'Chuyển cột trên di động',
        code: `@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}`
      }
    ],
    task: 'Viết một quy tắc @media (max-width: 600px) để đổi màu nền của <body> thành màu "lightblue" khi màn hình nhỏ.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-color: white;
      }
      /* Viết @media query tại đây */
    </style>
  </head>
  <body>
    <h2>Thử nghiệm Responsive</h2>
    <p>Khi màn hình dưới 600px, màu nền sẽ chuyển sang xanh nhạt (lightblue).</p>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-color: white;
      }
      @media (max-width: 600px) {
        body {
          background-color: lightblue;
        }
      }
    </style>
  </head>
  <body>
    <h2>Thử nghiệm Responsive</h2>
    <p>Khi màn hình dưới 600px, màu nền sẽ chuyển sang xanh nhạt (lightblue).</p>
  </body>
</html>`,
    hints: [
      'Cấu trúc: @media (max-width: 600px) { body { background-color: lightblue; } }',
      'Đảm bảo có đủ ngoặc nhọn mở và đóng cho cả khối media.',
      'Từ khóa chính xác: max-width: 600px'
    ],
    advancedChallenge: 'Thêm quy tắc ẩn một phần tử trên điện thoại bằng display: none;.',
    htmlCssRules: [
      { ruleId: 'rule-media', description: 'Có định nghĩa @media (max-width: 600px)', selector: 'style', textContains: '@media' }
    ],
    xpReward: 90
  },
  {
    id: 'css-09',
    courseId: 'css',
    order: 9,
    title: 'Bài 9: Hiệu ứng Chuyển động (Transition & Hover)',
    description: 'Làm giao diện sống động với transition, transform: scale và hiệu ứng rê chuột.',
    target: 'Tạo nút bấm phóng to nhẹ nhàng và đổi màu mượt mà khi di chuột.',
    theory: `- :hover: Pseudo-class kích hoạt khi chuột lướt qua phần tử.
- transition: <thuộc_tính> <thời_gian> <kiểu_chuyển_động>;
  Ví dụ: transition: all 0.3s ease;
- transform: scale(1.05); phóng to 5%;
- transform: rotate(10deg); xoay 10 độ.`,
    examples: [
      {
        title: 'Nút bấm có hiệu ứng chuyển màu mượt',
        code: `.btn-magic {
  background-color: #6366f1;
  color: white;
  transition: all 0.3s ease;
}
.btn-magic:hover {
  background-color: #4338ca;
  transform: translateY(-3px);
}`
      }
    ],
    task: 'Viết CSS cho class ".card-box" có: transition: transform 0.3s ease; và khi hover (.card-box:hover) thì transform: scale(1.05);.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .card-box {
        background-color: #ec4899;
        color: white;
        padding: 30px;
        text-align: center;
        /* Thêm transition */
      }
      /* Thêm quy tắc .card-box:hover */
    </style>
  </head>
  <body>
    <div class="card-box">Rê chuột lên tôi!</div>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .card-box {
        background-color: #ec4899;
        color: white;
        padding: 30px;
        text-align: center;
        transition: transform 0.3s ease;
      }
      .card-box:hover {
        transform: scale(1.05);
      }
    </style>
  </head>
  <body>
    <div class="card-box">Rê chuột lên tôi!</div>
  </body>
</html>`,
    hints: [
      'Trong .card-box thêm: transition: transform 0.3s ease;',
      'Tạo thêm selector mới: .card-box:hover { transform: scale(1.05); }',
      'Đừng quên dấu hai chấm :hover.'
    ],
    advancedChallenge: 'Thêm bóng đổ box-shadow khi hover để thẻ nổi lên.',
    htmlCssRules: [
      { ruleId: 'rule-trans', description: 'Có thuộc tính transition', selector: '.card-box', cssProperty: { prop: 'transition', value: 'transform' } },
      { ruleId: 'rule-hover', description: 'Có định nghĩa selector :hover', selector: 'style', textContains: ':hover' }
    ],
    xpReward: 90
  },
  {
    id: 'css-10',
    courseId: 'css',
    order: 10,
    title: 'Bài 10: Dự án Thiết kế Giao diện Website Hoàn chỉnh',
    description: 'Kết hợp Flexbox, Box Model, Bo góc và Màu sắc để tạo một trang đích hoàn chỉnh.',
    target: 'Hoàn thiện giao diện hiện đại, chuyên nghiệp cho trang giới thiệu phòng máy.',
    theory: `Một trang web chuyên nghiệp cần có tính thống nhất:
- Bảng màu hài hòa (màu chủ đạo, màu nền, màu chữ).
- Khoảng cách nhất quán (spacing rhythm).
- Thanh điều hướng (Navigation Bar) đẹp mắt với Flexbox.
- Khung nội dung chính với thẻ Card nổi bật.`,
    examples: [
      {
        title: 'Bố cục chuẩn',
        code: `nav { display: flex; justify-content: space-between; align-items: center; }
.hero { text-align: center; padding: 40px 20px; }
.features { display: flex; gap: 20px; justify-content: center; }`
      }
    ],
    task: 'Thiết kế trang web gồm: thanh nav có display: flex, ít nhất 2 thẻ card có border-radius: 8px và padding: 16px, nút bấm nổi bật có màu nền.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: sans-serif;
        margin: 0;
      }
      /* Viết CSS hoàn chỉnh tại đây */
    </style>
  </head>
  <body>
    <nav class="navbar">
      <div class="logo">CodeLab</div>
      <div class="links">Trang chủ | Khóa học</div>
    </nav>
    <div class="cards-container">
      <div class="card">
        <h3>Bài học 1</h3>
        <p>Kiến thức nền tảng</p>
      </div>
      <div class="card">
        <h3>Bài học 2</h3>
        <p>Thực hành nâng cao</p>
      </div>
    </div>
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: sans-serif;
        margin: 0;
        background-color: #f1f5f9;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        padding: 16px 24px;
        background-color: #1e293b;
        color: white;
      }
      .cards-container {
        display: flex;
        gap: 20px;
        padding: 24px;
        justify-content: center;
      }
      .card {
        background-color: white;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        width: 200px;
      }
    </style>
  </head>
  <body>
    <nav class="navbar">
      <div class="logo">CodeLab</div>
      <div class="links">Trang chủ | Khóa học</div>
    </nav>
    <div class="cards-container">
      <div class="card">
        <h3>Bài học 1</h3>
        <p>Kiến thức nền tảng</p>
      </div>
      <div class="card">
        <h3>Bài học 2</h3>
        <p>Thực hành nâng cao</p>
      </div>
    </div>
  </body>
</html>`,
    hints: [
      'Cho .navbar có display: flex; và justify-content: space-between;',
      'Cho .card có border-radius: 8px; và padding: 16px;',
      'Cho .cards-container có display: flex; và gap: 20px;'
    ],
    advancedChallenge: 'Thêm bóng đổ box-shadow cho thẻ .card.',
    htmlCssRules: [
      { ruleId: 'rule-nav-flex', description: 'Thanh navbar sử dụng display: flex', selector: '.navbar', cssProperty: { prop: 'display', value: 'flex' } },
      { ruleId: 'rule-card-radius', description: 'Thẻ card có bo góc border-radius: 8px', selector: '.card', cssProperty: { prop: 'border-radius', value: '8px' } },
      { ruleId: 'rule-card-padding', description: 'Thẻ card có padding: 16px', selector: '.card', cssProperty: { prop: 'padding', value: '16px' } }
    ],
    xpReward: 100
  }
];
