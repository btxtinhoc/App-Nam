import { Lesson } from '../../types';

export const htmlLessons: Lesson[] = [
  {
    id: 'html-01',
    courseId: 'html',
    order: 1,
    title: 'Bài 1: Cấu trúc cơ bản của trang HTML',
    description: 'Làm quen với thẻ <!DOCTYPE>, <html>, <head>, <title> và <body>.',
    target: 'Hiểu cấu trúc trang web chuẩn và tạo được trang HTML đầu tiên.',
    theory: `HTML (HyperText Markup Language) là ngôn ngữ đánh dấu siêu văn bản, được dùng để xây dựng khung xương của trang web.
Mọi tài liệu HTML chuẩn đều có khung sườn:
- <!DOCTYPE html>: Khai báo phiên bản HTML5.
- <html>: Thẻ gốc bao bọc toàn bộ nội dung.
- <head>: Chứa thông tin bổ trợ như tiêu đề trang (<title>), mã hóa ký tự (UTF-8).
- <body>: Chứa nội dung người dùng nhìn thấy trên màn hình (văn bản, hình ảnh, nút bấm...).`,
    examples: [
      {
        title: 'Mẫu cấu trúc HTML5 chuẩn',
        code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Trang Web Đầu Tiên</title>
  </head>
  <body>
    <h1>Chào mừng đến với CodeLab Offline!</h1>
    <p>Đây là trang web đầu tiên của em.</p>
  </body>
</html>`,
        explanation: 'Thẻ h1 là tiêu đề lớn nhất, thẻ p là đoạn văn bản.'
      }
    ],
    task: 'Tạo một trang HTML có tiêu đề h1 với nội dung "Trường học của em" và một đoạn văn p mô tả "Em đang học lập trình tại phòng máy tin học."',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Trường học của em</title>
  </head>
  <body>
    <!-- Viết thẻ h1 và thẻ p của bạn vào đây -->
    
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Trường học của em</title>
  </head>
  <body>
    <h1>Trường học của em</h1>
    <p>Em đang học lập trình tại phòng máy tin học.</p>
  </body>
</html>`,
    hints: [
      'Sử dụng cặp thẻ <h1>Nội dung</h1> cho tiêu đề chính.',
      'Sử dụng cặp thẻ <p>Nội dung</p> cho đoạn văn bản ngay bên dưới thẻ h1.',
      'Đặt chính xác nội dung: "Trường học của em" bên trong thẻ h1 và "Em đang học lập trình tại phòng máy tin học." bên trong thẻ p.'
    ],
    advancedChallenge: 'Thêm một thẻ <h2> với nội dung "Môn Tin Học Lớp 10" dưới tiêu đề chính.',
    htmlCssRules: [
      { ruleId: 'rule-h1', description: 'Có thẻ <h1> chứa chữ "Trường học của em"', tag: 'h1', textContains: 'Trường học của em' },
      { ruleId: 'rule-p', description: 'Có thẻ <p> chứa chữ "Em đang học lập trình tại phòng máy tin học."', tag: 'p', textContains: 'Em đang học lập trình tại phòng máy tin học.' }
    ],
    xpReward: 50
  },
  {
    id: 'html-02',
    courseId: 'html',
    order: 2,
    title: 'Bài 2: Các cấp độ Tiêu đề (Heading 1-6)',
    description: 'Khám phá các cấp độ tiêu đề từ <h1> đến <h6> để tổ chức văn bản.',
    target: 'Sử dụng đúng thứ bậc tiêu đề từ lớn đến nhỏ cho bài viết khoa học.',
    theory: `HTML cung cấp 6 cấp độ tiêu đề:
- <h1>: Tiêu đề quan trọng nhất (thường là tên bài viết, mỗi trang nên có 1 thẻ h1).
- <h2>: Tiêu đề mục lớn.
- <h3>: Tiêu đề mục con của h2.
- <h4>, <h5>, <h6>: Các phân mục nhỏ hơn.`,
    examples: [
      {
        title: 'Ví dụ 6 cấp độ tiêu đề',
        code: `<h1>Chương 1: Giới thiệu Máy tính</h1>
<h2>1.1 Phần cứng</h2>
<h3>1.1.1 Bộ nhớ RAM</h3>
<h4>Chi tiết cấu tạo</h4>`,
        explanation: 'Cỡ chữ và độ đậm sẽ giảm dần từ h1 đến h6.'
      }
    ],
    task: 'Tạo một trang có 1 thẻ <h1> "Sổ tay Tin học", 1 thẻ <h2> "Phần 1: Lập trình cơ bản", và 1 thẻ <h3> "Bài học đầu tiên".',
    initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Viết các thẻ h1, h2, h3 theo yêu cầu -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <h1>Sổ tay Tin học</h1>
    <h2>Phần 1: Lập trình cơ bản</h2>
    <h3>Bài học đầu tiên</h3>
  </body>
</html>`,
    hints: [
      'Dùng <h1>, <h2> và <h3> theo thứ tự từ trên xuống dưới.',
      'Nhớ đóng đủ các thẻ: </h1>, </h2>, </h3>.',
      'Kiểm tra lại chính tả: "Sổ tay Tin học", "Phần 1: Lập trình cơ bản", "Bài học đầu tiên".'
    ],
    advancedChallenge: 'Thêm thẻ <p> bên dưới để giải thích lý do em thích học môn Tin.',
    htmlCssRules: [
      { ruleId: 'rule-h1', description: 'Có thẻ <h1> chứa "Sổ tay Tin học"', tag: 'h1', textContains: 'Sổ tay Tin học' },
      { ruleId: 'rule-h2', description: 'Có thẻ <h2> chứa "Phần 1: Lập trình cơ bản"', tag: 'h2', textContains: 'Phần 1: Lập trình cơ bản' },
      { ruleId: 'rule-h3', description: 'Có thẻ <h3> chứa "Bài học đầu tiên"', tag: 'h3', textContains: 'Bài học đầu tiên' }
    ],
    xpReward: 50
  },
  {
    id: 'html-03',
    courseId: 'html',
    order: 3,
    title: 'Bài 3: Đoạn văn và Định dạng Văn bản',
    description: 'Sử dụng thẻ <p>, <b>, <i>, <u>, <strong>, <em> và xuống dòng <br>.',
    target: 'Biết cách trình bày đoạn văn, nhấn mạnh từ khóa bằng chữ in đậm, in nghiêng.',
    theory: `- Thẻ <p>: Đại diện cho một đoạn văn bản (tự động có khoảng trống trên/dưới).
- Thẻ <br>: Ngắt dòng (xuống hàng), không cần thẻ đóng.
- Thẻ <strong> hoặc <b>: Làm đậm chữ (nhấn mạnh tầm quan trọng).
- Thẻ <em> hoặc <i>: Làm nghiêng chữ.
- Thẻ <mark>: Đánh dấu nổi bật (như bút dạ quang).`,
    examples: [
      {
        title: 'Đoạn văn có nhấn mạnh',
        code: `<p>Học lập trình cần sự <strong>kiên trì</strong> và <em>thực hành</em> đều đặn mỗi ngày.<br>Chúc các bạn thành công!</p>`
      }
    ],
    task: 'Tạo đoạn văn <p> có chứa từ "CodeLab" được in đậm bằng thẻ <strong> và từ "offline" được in nghiêng bằng thẻ <em>.',
    initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Tạo thẻ p với từ CodeLab in đậm và offline in nghiêng -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <p>Chào mừng đến với <strong>CodeLab</strong> phiên bản <em>offline</em> thực hành.</p>
  </body>
</html>`,
    hints: [
      'Bọc từ CodeLab trong cặp thẻ <strong>CodeLab</strong>.',
      'Bọc từ offline trong cặp thẻ <em>offline</em>.',
      'Tất cả nằm trong một thẻ <p>...</p>.'
    ],
    advancedChallenge: 'Thêm thẻ <hr> để tạo một đường kẻ ngang phân cách bên dưới đoạn văn.',
    htmlCssRules: [
      { ruleId: 'rule-p', description: 'Có thẻ <p>', tag: 'p' },
      { ruleId: 'rule-strong', description: 'Có thẻ <strong> hoặc <b> chứa "CodeLab"', selector: 'strong, b', textContains: 'CodeLab' },
      { ruleId: 'rule-em', description: 'Có thẻ <em> hoặc <i> chứa "offline"', selector: 'em, i', textContains: 'offline' }
    ],
    xpReward: 60
  },
  {
    id: 'html-04',
    courseId: 'html',
    order: 4,
    title: 'Bài 4: Liên kết Siêu văn bản (Thẻ <a>)',
    description: 'Tạo siêu liên kết nội bộ và liên kết ngoài với thuộc tính href và target.',
    target: 'Tạo được các đường dẫn bấm được trên trang web.',
    theory: `Liên kết được tạo bằng thẻ <a> (Anchor tag).
Thuộc tính quan trọng:
- href: Địa chỉ liên kết đích (URL hoặc đường dẫn tệp tin hoặc id trên trang).
- target="_blank": Mở liên kết trong một thẻ/tab mới.
- title: Chú thích xuất hiện khi rê chuột lên liên kết.`,
    examples: [
      {
        title: 'Liên kết',
        code: `<a href="#bai-hoc" title="Chuyển đến bài học">Xem bài học tiếp theo</a>
<br>
<a href="gioi-thieu.html" target="_blank">Trang giới thiệu</a>`
      }
    ],
    task: 'Tạo một thẻ liên kết <a> có thuộc tính href="khoa-hoc.html", thuộc tính target="_blank" và nội dung văn bản hiển thị là "Khám phá khóa học".',
    initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Tạo thẻ a theo yêu cầu -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <a href="khoa-hoc.html" target="_blank">Khám phá khóa học</a>
  </body>
</html>`,
    hints: [
      'Cấu trúc: <a href="..." target="...">Chữ hiển thị</a>',
      'Giá trị href là "khoa-hoc.html" và target là "_blank".',
      'Nội dung chữ bên trong là "Khám phá khóa học".'
    ],
    advancedChallenge: 'Tạo thêm một liên kết mailto để gửi thư góp ý cho giáo viên.',
    htmlCssRules: [
      { ruleId: 'rule-a', description: 'Có thẻ <a> với href="khoa-hoc.html"', selector: 'a[href="khoa-hoc.html"]' },
      { ruleId: 'rule-target', description: 'Có thuộc tính target="_blank"', selector: 'a[target="_blank"]' },
      { ruleId: 'rule-text', description: 'Chứa văn bản "Khám phá khóa học"', tag: 'a', textContains: 'Khám phá khóa học' }
    ],
    xpReward: 60
  },
  {
    id: 'html-05',
    courseId: 'html',
    order: 5,
    title: 'Bài 5: Chèn Hình ảnh (Thẻ <img>)',
    description: 'Sử dụng thẻ <img> với các thuộc tính src, alt, width, height.',
    target: 'Chèn ảnh minh họa và viết mô tả ảnh chuẩn trợ năng bằng thuộc tính alt.',
    theory: `Thẻ <img> là thẻ đơn (không cần thẻ đóng).
Các thuộc tính chính:
- src: Đường dẫn tới file ảnh (URL hoặc đường dẫn cục bộ).
- alt: Văn bản thay thế mô tả bức ảnh (rất quan trọng khi ảnh bị lỗi mạng hoặc cho người khiếm thị).
- width và height: Chiều rộng và chiều cao (đơn vị pixel).`,
    examples: [
      {
        title: 'Chèn ảnh',
        code: `<img src="logo.png" alt="Biểu trưng CodeLab" width="200" height="100">`
      }
    ],
    task: 'Tạo một thẻ <img> có thuộc tính src="computer.png", thuộc tính alt="Máy tính phòng thực hành" và width="300".',
    initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Chèn thẻ img theo yêu cầu -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <img src="computer.png" alt="Máy tính phòng thực hành" width="300">
  </body>
</html>`,
    hints: [
      'Thẻ img không cần đóng thẻ (không có </img>).',
      'Viết cú pháp: <img src="computer.png" alt="Máy tính phòng thực hành" width="300">',
      'Kiểm tra chính xác tên thuộc tính src, alt, width.'
    ],
    advancedChallenge: 'Bọc thẻ img bên trong một thẻ <a> để ảnh có thể bấm vào được.',
    htmlCssRules: [
      { ruleId: 'rule-img-src', description: 'Có thẻ <img> với src="computer.png"', selector: 'img[src="computer.png"]' },
      { ruleId: 'rule-img-alt', description: 'Có thuộc tính alt="Máy tính phòng thực hành"', selector: 'img[alt="Máy tính phòng thực hành"]' },
      { ruleId: 'rule-img-width', description: 'Có thuộc tính width="300"', selector: 'img[width="300"]' }
    ],
    xpReward: 60
  },
  {
    id: 'html-06',
    courseId: 'html',
    order: 6,
    title: 'Bài 6: Danh sách Liệt kê (Thẻ <ul>, <ol>, <li>)',
    description: 'Xây dựng danh sách có thứ tự (đánh số 1, 2, 3) và không có thứ tự (dấu chấm tròn).',
    target: 'Trình bày các danh mục, danh sách công việc hoặc lộ trình học bằng HTML.',
    theory: `- <ul> (Unordered List): Danh sách dấu chấm (bullet points).
- <ol> (Ordered List): Danh sách đánh số thứ tự (1, 2, 3...).
- <li> (List Item): Mỗi phần tử bên trong danh sách (dùng cho cả ul và ol).`,
    examples: [
      {
        title: 'Danh sách các môn học',
        code: `<h3>Danh sách có thứ tự:</h3>
<ol>
  <li>Toán học</li>
  <li>Tin học</li>
  <li>Vật lý</li>
</ol>`
      }
    ],
    task: 'Tạo một danh sách có thứ tự <ol> gồm ít nhất 3 thẻ <li> liệt kê 3 ngôn ngữ: "HTML", "Python", "C++".',
    initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Tạo thẻ ol và các thẻ li bên trong -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <ol>
      <li>HTML</li>
      <li>Python</li>
      <li>C++</li>
    </ol>
  </body>
</html>`,
    hints: [
      'Mở thẻ <ol> và đóng bằng </ol>.',
      'Mỗi ngôn ngữ đặt trong cặp thẻ <li>...</li>.',
      'Viết đủ 3 mục: HTML, Python, C++.'
    ],
    advancedChallenge: 'Tạo thêm một danh sách không thứ tự <ul> bên cạnh để liệt kê các thiết bị máy tính.',
    htmlCssRules: [
      { ruleId: 'rule-ol', description: 'Có thẻ <ol>', tag: 'ol' },
      { ruleId: 'rule-li-count', description: 'Có ít nhất 3 thẻ <li>', selector: 'ol li' },
      { ruleId: 'rule-li-python', description: 'Chứa mục "Python"', tag: 'ol', textContains: 'Python' }
    ],
    xpReward: 70
  },
  {
    id: 'html-07',
    courseId: 'html',
    order: 7,
    title: 'Bài 7: Bảng Dữ liệu (Thẻ <table>, <tr>, <th>, <td>)',
    description: 'Trình bày dữ liệu dạng bảng với hàng, cột và tiêu đề cột.',
    target: 'Tạo thời khóa biểu hoặc bảng điểm học sinh bằng thẻ table.',
    theory: `- <table>: Vỏ bọc toàn bộ bảng.
- <tr> (Table Row): Mỗi hàng ngang trong bảng.
- <th> (Table Header): Ô tiêu đề cột (chữ tự động in đậm và canh giữa).
- <td> (Table Data): Ô dữ liệu thông thường.
- Thuộc tính border="1": Tạo đường viền cho bảng.`,
    examples: [
      {
        title: 'Bảng điểm đơn giản',
        code: `<table border="1">
  <tr>
    <th>Họ và tên</th>
    <th>Điểm Tin</th>
  </tr>
  <tr>
    <td>Nguyễn Văn A</td>
    <td>10</td>
  </tr>
</table>`
      }
    ],
    task: 'Tạo một bảng <table> có thuộc tính border="1", có 1 hàng tiêu đề (thẻ th) gồm "Mã HS", "Tên" và 1 hàng dữ liệu (thẻ td) tương ứng.',
    initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Tạo bảng theo yêu cầu -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <table border="1">
      <tr>
        <th>Mã HS</th>
        <th>Tên</th>
      </tr>
      <tr>
        <td>HS001</td>
        <td>Nguyễn Văn An</td>
      </tr>
    </table>
  </body>
</html>`,
    hints: [
      'Cấu trúc: <table border="1"> <tr><th>...</th></tr> <tr><td>...</td></tr> </table>',
      'Hàng đầu tiên chứa 2 thẻ <th>: "Mã HS" và "Tên".',
      'Hàng thứ hai chứa 2 thẻ <td> với thông tin học sinh.'
    ],
    advancedChallenge: 'Thêm hàng thứ 3 cho học sinh thứ hai.',
    htmlCssRules: [
      { ruleId: 'rule-table', description: 'Có thẻ <table> với border="1"', selector: 'table[border="1"], table' },
      { ruleId: 'rule-th', description: 'Có thẻ <th> chứa "Mã HS"', selector: 'th', textContains: 'Mã HS' },
      { ruleId: 'rule-td', description: 'Có các thẻ <td> chứa dữ liệu', selector: 'td' }
    ],
    xpReward: 80
  },
  {
    id: 'html-08',
    courseId: 'html',
    order: 8,
    title: 'Bài 8: Biểu mẫu Thu thập Dữ liệu (Thẻ <form>, <input>, <button>)',
    description: 'Xây dựng biểu mẫu nhập họ tên, mật khẩu và nút gửi dữ liệu.',
    target: 'Nắm được các kiểu input cơ bản trong thiết kế giao diện web.',
    theory: `- <form>: Khung bọc biểu mẫu.
- <input type="text">: Ô nhập văn bản một dòng.
- <input type="password">: Ô nhập mật khẩu (che dấu chấm đen).
- <input type="number">: Ô nhập số.
- <label>: Nhãn mô tả cho ô nhập.
- <button type="submit">: Nút bấm gửi biểu mẫu.`,
    examples: [
      {
        title: 'Biểu mẫu Đăng nhập',
        code: `<form>
  <label for="user">Tên đăng nhập:</label>
  <input type="text" id="user" placeholder="Nhập tên của bạn">
  <br>
  <button type="submit">Đăng nhập</button>
</form>`
      }
    ],
    task: 'Tạo một biểu mẫu <form> có 1 ô <input type="text"> với placeholder="Họ và tên", và 1 nút <button type="submit"> có chữ "Gửi thông tin".',
    initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Tạo biểu mẫu form theo yêu cầu -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <form>
      <input type="text" placeholder="Họ và tên">
      <button type="submit">Gửi thông tin</button>
    </form>
  </body>
</html>`,
    hints: [
      'Đặt input và button bên trong cặp thẻ <form>...</form>.',
      'Thuộc tính input: type="text" và placeholder="Họ và tên".',
      'Nút bấm: <button type="submit">Gửi thông tin</button>.'
    ],
    advancedChallenge: 'Thêm một ô input type="password" cho mật khẩu.',
    htmlCssRules: [
      { ruleId: 'rule-form', description: 'Có thẻ <form>', tag: 'form' },
      { ruleId: 'rule-input', description: 'Có ô input type="text" với placeholder="Họ và tên"', selector: 'input[type="text"][placeholder="Họ và tên"]' },
      { ruleId: 'rule-button', description: 'Có nút submit có chữ "Gửi thông tin"', selector: 'button', textContains: 'Gửi thông tin' }
    ],
    xpReward: 80
  },
  {
    id: 'html-09',
    courseId: 'html',
    order: 9,
    title: 'Bài 9: Cấu trúc Ngữ nghĩa HTML5 (Semantic Tags)',
    description: 'Tổ chức bố cục trang với <header>, <nav>, <main>, <section>, <article>, <footer>.',
    target: 'Sử dụng các thẻ ngữ nghĩa giúp công cụ tìm kiếm và trình duyệt hiểu rõ cấu trúc trang.',
    theory: `Trước đây các nhà phát triển dùng thẻ <div> cho mọi thứ. HTML5 giới thiệu các thẻ có ý nghĩa ngữ nghĩa (Semantic):
- <header>: Phần đầu trang (logo, tiêu đề web).
- <nav>: Thanh điều hướng menu liên kết.
- <main>: Nội dung cốt lõi của trang web (chỉ có 1 thẻ main trong 1 trang).
- <section>: Một phần hoặc phân vùng nội dung có chủ đề.
- <footer>: Chân trang (bản quyền, liên hệ).`,
    examples: [
      {
        title: 'Cấu trúc Semantic chuẩn',
        code: `<header>
  <h1>Cổng Thông Tin Tin Học</h1>
</header>
<nav>
  <a href="#home">Trang chủ</a> | <a href="#about">Giới thiệu</a>
</nav>
<main>
  <section>
    <h2>Tin mới nhất</h2>
    <p>Cuộc thi Tin học trẻ chuẩn bị khởi tranh.</p>
  </section>
</main>
<footer>
  <p>© 2026 CodeLab Offline</p>
</footer>`
      }
    ],
    task: 'Xây dựng một trang có đầy đủ 3 khối ngữ nghĩa: thẻ <header> chứa tiêu đề h1, thẻ <main> chứa một thẻ <section>, và thẻ <footer> ở chân trang.',
    initialCode: `<!DOCTYPE html>
<html>
  <body>
    <!-- Xây dựng 3 khối: header, main, footer -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <body>
    <header>
      <h1>Trường THPT CodeLab</h1>
    </header>
    <main>
      <section>
        <h2>Phòng máy thực hành</h2>
        <p>Hệ thống máy tính hiện đại phục vụ học sinh.</p>
      </section>
    </main>
    <footer>
      <p>© 2026 Bản quyền thuộc về nhà trường</p>
    </footer>
  </body>
</html>`,
    hints: [
      'Đặt <header>, <main> và <footer> tuần tự bên trong <body>.',
      'Bên trong <header> đặt <h1>.',
      'Bên trong <main> đặt thẻ <section>.'
    ],
    advancedChallenge: 'Thêm thẻ <nav> nằm giữa header và main chứa 2 liên kết.',
    htmlCssRules: [
      { ruleId: 'rule-header', description: 'Có thẻ <header> chứa <h1>', selector: 'header h1' },
      { ruleId: 'rule-main', description: 'Có thẻ <main> chứa thẻ <section>', selector: 'main section' },
      { ruleId: 'rule-footer', description: 'Có thẻ <footer>', tag: 'footer' }
    ],
    xpReward: 90
  },
  {
    id: 'html-10',
    courseId: 'html',
    order: 10,
    title: 'Bài 10: Xây dựng Trang Web Hoàn chỉnh',
    description: 'Tổng hợp kiến thức để xây dựng một trang giới thiệu bản thân hoặc trường học.',
    target: 'Tự tin kết hợp tiêu đề, văn bản, danh sách, hình ảnh và liên kết vào một sản phẩm web hoàn chỉnh.',
    theory: `Một trang web thực tế bao gồm:
1. Header giới thiệu tên website.
2. Phần nội dung chính (main):
   - Giới thiệu bản thân / sở thích.
   - Bảng hoặc danh sách các môn học / kỹ năng.
   - Hình ảnh minh họa.
   - Liên kết liên hệ.
3. Footer ghi thông tin tác giả.`,
    examples: [
      {
        title: 'Trang Profile mẫu',
        code: `<header>
  <h1>Hồ sơ Lập trình viên: Nguyễn Văn A</h1>
</header>
<main>
  <h2>Sở thích</h2>
  <ul>
    <li>Lập trình Python</li>
    <li>Thiết kế Web</li>
  </ul>
  <h2>Liên hệ</h2>
  <a href="mailto:hs@codelab.vn">Gửi email</a>
</main>
<footer>
  <p>Lớp 10A1 - Phòng máy số 2</p>
</footer>`
      }
    ],
    task: 'Tạo một trang web hoàn chỉnh có: thẻ <h1> tiêu đề trang, 1 thẻ <p> mô tả, 1 danh sách <ul> sở thích với ít nhất 2 mục, và 1 thẻ <footer>.',
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Trang cá nhân của em</title>
  </head>
  <body>
    <!-- Hoàn thiện sản phẩm web của em -->
  </body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Trang cá nhân của em</title>
  </head>
  <body>
    <h1>Chào mừng đến với trang của Nguyễn Văn A</h1>
    <p>Em là học sinh đam mê công nghệ thông tin và thuật toán.</p>
    <h2>Sở thích của em:</h2>
    <ul>
      <li>Học lập trình Python và C++</li>
      <li>Khám phá máy tính và phần cứng</li>
    </ul>
    <footer>
      <p>Trường THPT - Năm học 2026</p>
    </footer>
  </body>
</html>`,
    hints: [
      'Có thẻ <h1> cho tiêu đề trang.',
      'Có thẻ <p> giới thiệu về bản thân.',
      'Có thẻ <ul> với ít nhất 2 thẻ <li>.',
      'Có thẻ <footer> ở cuối trang.'
    ],
    advancedChallenge: 'Thêm một bảng table tóm tắt điểm số các môn học yêu thích.',
    htmlCssRules: [
      { ruleId: 'rule-h1', description: 'Có thẻ <h1>', tag: 'h1' },
      { ruleId: 'rule-p', description: 'Có thẻ <p>', tag: 'p' },
      { ruleId: 'rule-ul-li', description: 'Có danh sách <ul> với các <li>', selector: 'ul li' },
      { ruleId: 'rule-footer', description: 'Có thẻ <footer>', tag: 'footer' }
    ],
    xpReward: 100
  }
];
