import { Language } from '../types';

export interface DiagnosticIssue {
  level: 'error' | 'warning' | 'info';
  title: string;
  line?: number;
  hint1: string; // General hint
  hint2: string; // Specific location/concept
  hint3: string; // How to fix
}

export function analyzeCodeOffline(code: string, language: Language): DiagnosticIssue[] {
  const issues: DiagnosticIssue[] = [];
  const lines = code.split('\n');

  if (language === 'python') {
    // 1. Check unmatched parentheses/quotes
    let openParen = 0;
    let openBracket = 0;
    let openBrace = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      const trimmed = line.trim();

      // Skip comments
      if (trimmed.startsWith('#') || trimmed.length === 0) continue;

      // Common typos: Print -> print
      if (/\bPrint\s*\(/.test(trimmed)) {
        issues.push({
          level: 'error',
          title: 'Hàm print viết hoa chữ P',
          line: lineNum,
          hint1: 'Python phân biệt chữ hoa và chữ thường.',
          hint2: `Dòng ${lineNum}: "Print" là tên không xác định.`,
          hint3: 'Đổi "Print" thành "print" viết thường toàn bộ.'
        });
      }

      if (/\b(prnt|pritn|pirnt)\s*\(/.test(trimmed)) {
        issues.push({
          level: 'error',
          title: 'Lỗi chính tả hàm print()',
          line: lineNum,
          hint1: 'Kiểm tra lại tên hàm xuất dữ liệu.',
          hint2: `Dòng ${lineNum} có từ khóa viết sai chính tả.`,
          hint3: 'Sửa lại thành hàm chuẩn: print(...)'
        });
      }

      // Boolean true/false instead of True/False
      if (/\b(true|false)\b/.test(trimmed) && !/["'].*?(true|false).*?["']/.test(trimmed)) {
        issues.push({
          level: 'warning',
          title: 'Giá trị boolean viết thường',
          line: lineNum,
          hint1: 'Trong Python, giá trị Đúng/Sai phải viết hoa chữ cái đầu.',
          hint2: `Dòng ${lineNum} đang dùng true hoặc false viết thường.`,
          hint3: 'Đổi thành "True" hoặc "False" (viết hoa chữ T và F).'
        });
      }

      // Missing colon at end of control structures
      const controlKeywords = /^(if|elif|else|for|while|def|class)\b/;
      if (controlKeywords.test(trimmed) && !trimmed.endsWith(':')) {
        issues.push({
          level: 'error',
          title: 'Thiếu dấu hai chấm (:)',
          line: lineNum,
          hint1: 'Các câu lệnh rẽ nhánh và vòng lặp trong Python luôn kết thúc bằng dấu hai chấm.',
          hint2: `Dòng ${lineNum}: Câu lệnh "${trimmed}" chưa có dấu ":" ở cuối dòng.`,
          hint3: `Thêm dấu ":" vào cuối dòng: "${trimmed}:"`
        });
      }

      // Using = instead of == in if / elif
      if (/^(if|elif)\s+[^=]*=(?!=)/.test(trimmed)) {
        issues.push({
          level: 'error',
          title: 'Dùng nhầm phép gán (=) thay vì so sánh (==)',
          line: lineNum,
          hint1: 'Dấu = là phép gán giá trị, dấu == mới là phép so sánh bằng.',
          hint2: `Dòng ${lineNum}: Trong mệnh đề điều kiện, bạn đang dùng một dấu "=".`,
          hint3: 'Thay đổi dấu "=" thành hai dấu "==" để kiểm tra bằng nhau.'
        });
      }

      // Count parens in line
      for (let ch of line) {
        if (ch === '(') openParen++;
        if (ch === ')') openParen--;
        if (ch === '[') openBracket++;
        if (ch === ']') openBracket--;
        if (ch === '{') openBrace++;
        if (ch === '}') openBrace--;
      }
    }

    if (openParen > 0) {
      issues.push({
        level: 'error',
        title: 'Thiếu dấu ngoặc đóng ")"',
        hint1: 'Có ít nhất một câu lệnh mở ngoặc "(" nhưng chưa được đóng ngoặc.',
        hint2: `Hệ thống ghi nhận đang thiếu ${openParen} dấu đóng ngoặc ")".`,
        hint3: 'Kiểm tra kỹ các dòng chứa print(...) hoặc int(input(...)) và thêm dấu ")" tương ứng.'
      });
    }

    if (openBracket > 0) {
      issues.push({
        level: 'error',
        title: 'Thiếu dấu ngoặc vuông đóng "]"',
        hint1: 'Danh sách List chưa được đóng ngoặc vuông.',
        hint2: 'Kiểm tra các khai báo mảng/list dạng [a, b, c].',
        hint3: 'Thêm dấu "]" vào cuối danh sách.'
      });
    }
  } else if (language === 'cpp') {
    // C++ Diagnostics
    const fullText = code;

    if (!fullText.includes('<iostream>')) {
      issues.push({
        level: 'warning',
        title: 'Chưa khai báo thư viện <iostream>',
        hint1: 'Để sử dụng lệnh nhập xuất cin và cout, cần nạp thư viện chuẩn.',
        hint2: 'Phần đầu chương trình chưa có dòng #include <iostream>.',
        hint3: 'Thêm dòng: #include <iostream> ở dòng đầu tiên của file.'
      });
    }

    if (!fullText.includes('main(') && !fullText.includes('main ()')) {
      issues.push({
        level: 'error',
        title: 'Thiếu hàm main()',
        hint1: 'Mọi chương trình C++ phải có điểm bắt đầu là hàm main.',
        hint2: 'Chương trình chưa định nghĩa hàm int main() { ... }.',
        hint3: 'Bọc toàn bộ mã thực thi bên trong khối: int main() { ... return 0; }'
      });
    }

    // Check wrong stream operators
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      const trimmed = line.trim();

      if (/\bcout\s*>>/.test(trimmed)) {
        issues.push({
          level: 'error',
          title: 'Nhầm toán tử luồng xuất cout >>',
          line: lineNum,
          hint1: 'Toán tử dùng với cout có hướng mũi tên sang trái.',
          hint2: `Dòng ${lineNum}: cout phải đi kèm toán tử << chứ không phải >>.`,
          hint3: 'Đổi "cout >>" thành "cout <<".'
        });
      }

      if (/\bcin\s*<</.test(trimmed)) {
        issues.push({
          level: 'error',
          title: 'Nhầm toán tử luồng nhập cin <<',
          line: lineNum,
          hint1: 'Toán tử dùng với cin có hướng mũi tên sang phải.',
          hint2: `Dòng ${lineNum}: cin phải đi kèm toán tử >> chứ không phải <<.`,
          hint3: 'Đổi "cin <<" thành "cin >>".'
        });
      }

      // Missing semicolon check
      if (
        trimmed.length > 0 &&
        !trimmed.startsWith('//') &&
        !trimmed.startsWith('#') &&
        !trimmed.endsWith('{') &&
        !trimmed.endsWith('}') &&
        !trimmed.endsWith(';') &&
        !trimmed.endsWith(':') &&
        !trimmed.startsWith('for') &&
        !trimmed.startsWith('if') &&
        !trimmed.startsWith('while') &&
        !trimmed.startsWith('else') &&
        !trimmed.includes('main()')
      ) {
        issues.push({
          level: 'warning',
          title: 'Có thể thiếu dấu chấm phẩy (;)',
          line: lineNum,
          hint1: 'Trong C++, mọi câu lệnh đều phải kết thúc bằng dấu chấm phẩy.',
          hint2: `Dòng ${lineNum}: "${trimmed}" chưa có dấu ";" ở cuối.`,
          hint3: `Thêm dấu ";" vào cuối dòng: "${trimmed};"`
        });
      }
    }
  } else if (language === 'html') {
    // HTML checks
    const commonTags = ['h1', 'h2', 'h3', 'p', 'table', 'form', 'ul', 'ol', 'div', 'span'];
    for (const tag of commonTags) {
      const openMatches = code.match(new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi')) || [];
      const closeMatches = code.match(new RegExp(`</${tag}>`, 'gi')) || [];
      if (openMatches.length > closeMatches.length) {
        issues.push({
          level: 'warning',
          title: `Thẻ <${tag}> chưa được đóng`,
          hint1: `Mỗi thẻ HTML mở <${tag}> thường phải đi kèm thẻ đóng </${tag}>.`,
          hint2: `Có ${openMatches.length} thẻ mở <${tag}> nhưng chỉ có ${closeMatches.length} thẻ đóng.`,
          hint3: `Thêm thẻ đóng </${tag}> vào vị trí thích hợp.`
        });
      }
    }
  } else if (language === 'css') {
    // CSS checks
    let openCount = (code.match(/\{/g) || []).length;
    let closeCount = (code.match(/\}/g) || []).length;
    if (openCount !== closeCount) {
      issues.push({
        level: 'error',
        title: 'Mất cân bằng ngoặc nhọn { } trong CSS',
        hint1: 'Mỗi bộ chọn CSS cần mở ngoặc { và đóng ngoặc } để bọc các thuộc tính.',
        hint2: `Số lượng dấu { (${openCount}) không khớp với số lượng dấu } (${closeCount}).`,
        hint3: 'Kiểm tra lại từng khối CSS để đảm bảo đã đóng đủ dấu }.'
      });
    }
  }

  return issues;
}
