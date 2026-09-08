import { Lesson } from '../../types';

export const cppLessons: Lesson[] = [
  {
    id: 'cpp-01',
    courseId: 'cpp',
    order: 1,
    title: 'Bài 1: Cấu trúc chương trình C++ & Thư viện iostream',
    description: 'Tìm hiểu khung sườn của một chương trình C++ chuẩn và lệnh cout để in văn bản.',
    target: 'Biết cách khai báo thư viện <iostream>, hàm main() và in thông điệp ra màn hình.',
    theory: `Mọi chương trình C++ chuẩn đều bắt đầu từ hàm main():
#include <iostream>
using namespace std;

int main() {
    cout << "Noi dung in ra" << endl;
    return 0;
}

Quy tắc quan trọng:
- #include <iostream>: Nạp thư viện nhập xuất chuẩn.
- using namespace std;: Sử dụng không gian tên chuẩn (để dùng cout, cin, endl không cần viết std::).
- Mỗi câu lệnh trong C++ PHẢI KẾT THÚC BẰNG DẤU CHẤM PHẨY (;).`,
    examples: [
      {
        title: 'Chương trình Hello World',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`
      }
    ],
    task: 'Viết chương trình C++ in ra chính xác dòng chữ: "Chao mung den voi C++ CodeLab" trên một dòng.',
    initialCode: `#include <iostream>
using namespace std;

int main() {
    // Viết lệnh in ra màn hình tại đây
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Chao mung den voi C++ CodeLab" << endl;
    return 0;
}`,
    hints: [
      'Sử dụng lệnh cout << "Chao mung den voi C++ CodeLab" << endl;',
      'Đừng quên dấu chấm phẩy (;) ở cuối câu lệnh cout.',
      'Giữ nguyên return 0; ở cuối hàm main.'
    ],
    advancedChallenge: 'In thêm dòng thứ hai hiển thị năm học 2026.',
    testCases: [
      { input: '', expectedOutput: 'Chao mung den voi C++ CodeLab\n', description: 'In thông điệp chào mừng C++' }
    ],
    xpReward: 50
  },
  {
    id: 'cpp-02',
    courseId: 'cpp',
    order: 2,
    title: 'Bài 2: Nhập xuất dữ liệu với cin và cout',
    description: 'Sử dụng toán tử >> để nhập dữ liệu từ bàn phím và << để xuất kết quả.',
    target: 'Nhập được số nguyên từ người dùng và in ra kết quả tính toán.',
    theory: `- cout << : Luồng xuất dữ liệu (hướng mũi tên sang trái <<).
- cin >> : Luồng nhập dữ liệu (hướng mũi tên sang phải >>).
- endl: Xuống dòng mới (tương đương "\\n").

Ví dụ:
int n;
cin >> n;
cout << "Ban vua nhap: " << n << endl;`,
    examples: [
      {
        title: 'Nhập số và in gấp đôi',
        code: `#include <iostream>
using namespace std;

int main() {
    int x;
    if (cin >> x) {
        cout << x * 2 << endl;
    }
    return 0;
}`
      }
    ],
    task: 'Nhập vào một số nguyên n từ bàn phím. In ra bình phương của n (n * n).',
    initialCode: `#include <iostream>
using namespace std;

int main() {
    // Nhập n và in n * n
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    if (cin >> n) {
        cout << n * n << endl;
    }
    return 0;
}`,
    hints: [
      'Khai báo biến: int n; hoặc long long n;',
      'Đọc giá trị: cin >> n;',
      'In bình phương: cout << n * n << endl;'
    ],
    advancedChallenge: 'Nhập 2 số a, b cách nhau bởi dấu cách và in tổng a + b.',
    testCases: [
      { input: '6\n', expectedOutput: '36\n', description: 'Bình phương của 6 là 36' },
      { input: '11\n', expectedOutput: '121\n', description: 'Bình phương của 11 là 121' },
      { input: '-5\n', expectedOutput: '25\n', description: 'Bình phương số âm (-5)^2 = 25' }
    ],
    xpReward: 50
  },
  {
    id: 'cpp-03',
    courseId: 'cpp',
    order: 3,
    title: 'Bài 3: Các Kiểu dữ liệu cơ bản trong C++',
    description: 'Hiểu phạm vi của int, long long, float, double, char, bool.',
    target: 'Chọn đúng kiểu dữ liệu phù hợp để tránh lỗi tràn số (overflow).',
    theory: `Các kiểu dữ liệu chính:
- int: Số nguyên 32-bit (khoảng từ -2 tỷ đến +2 tỷ).
- long long: Số nguyên 64-bit (chứa số rất lớn đến 9*10^18, hay dùng trong thi HSG Tin học).
- double / float: Số thực có dấu phẩy động (ví dụ: 3.14159).
- char: Ký tự đơn trong dấu nháy đơn 'A', 'b', '9'.
- bool: Đúng/Sai (true = 1, false = 0).`,
    examples: [
      {
        title: 'Tính diện tích hình tròn với số thực double',
        code: `#include <iostream>
using namespace std;

int main() {
    double r = 5.0;
    double pi = 3.14159;
    double s = pi * r * r;
    cout << "Dien tich: " << s << endl;
    return 0;
}`
      }
    ],
    task: 'Nhập vào 2 số nguyên 64-bit a và b (kiểu long long). In ra tích của chúng (a * b).',
    initialCode: `#include <iostream>
using namespace std;

int main() {
    // Khai báo long long a, b và in tích
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << a * b << endl;
    }
    return 0;
}`,
    hints: [
      'Khai báo: long long a, b;',
      'Đọc 2 số: cin >> a >> b;',
      'In tích: cout << a * b << endl;'
    ],
    advancedChallenge: 'Thử test với các số lớn như 1000000 1000000 xem kiểu int có bị tràn không.',
    testCases: [
      { input: '5 7\n', expectedOutput: '35\n', description: '5 * 7 = 35' },
      { input: '1000000 2000000\n', expectedOutput: '2000000000000\n', description: 'Tích 2 số lớn (cần long long)' },
      { input: '-3 8\n', expectedOutput: '-24\n', description: 'Tích số âm và dương' }
    ],
    xpReward: 60
  },
  {
    id: 'cpp-04',
    courseId: 'cpp',
    order: 4,
    title: 'Bài 4: Toán tử Số học và Phép chia dư (%)',
    description: 'Sử dụng +, -, *, /, % và các toán tử tăng giảm ++, --.',
    target: 'Nắm chắc phép chia số nguyên (nguyên / nguyên = nguyên) và phép chia dư %.',
    theory: `Lưu ý cực kỳ quan trọng trong C++:
- Nếu cả 2 toán hạng là số nguyên, phép chia / sẽ lấy phần nguyên: 7 / 2 = 3 (không phải 3.5!).
- Để chia ra số thực: ép kiểu (double)7 / 2 = 3.5.
- Phép chia lấy phần dư %: 7 % 2 = 1. Chỉ áp dụng cho số nguyên.`,
    examples: [
      {
        title: 'Tách chữ số',
        code: `int n = 79;
int chuc = n / 10;   // 7
int donvi = n % 10;  // 9`
      }
    ],
    task: 'Nhập vào số nguyên dương n. Hãy in ra phần dư khi n chia cho 2 (n % 2).',
    initialCode: `#include <iostream>
using namespace std;

int main() {
    // Nhập n và in n % 2
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        cout << n % 2 << endl;
    }
    return 0;
}`,
    hints: [
      'Đọc n: cin >> n;',
      'In n % 2: cout << (n % 2) << endl;',
      'Dấu ngoặc quanh (n % 2) giúp code rõ ràng hơn.'
    ],
    advancedChallenge: 'Nhập số giây và đổi sang phút:giây.',
    testCases: [
      { input: '8\n', expectedOutput: '0\n', description: '8 % 2 = 0' },
      { input: '13\n', expectedOutput: '1\n', description: '13 % 2 = 1' },
      { input: '1000\n', expectedOutput: '0\n', description: '1000 % 2 = 0' }
    ],
    xpReward: 60
  },
  {
    id: 'cpp-05',
    courseId: 'cpp',
    order: 5,
    title: 'Bài 5: Cấu trúc Rẽ nhánh (if - else)',
    description: 'Kiểm tra điều kiện logic với các toán tử ==, !=, >, <, >=, <=, && (AND), || (OR).',
    target: 'Lập trình kiểm tra số chẵn lẻ, tìm số lớn nhất trong 2 số.',
    theory: `Cấu trúc if-else trong C++:
if (dieu_kien) {
    // Khối lệnh khi điều kiện đúng
} else {
    // Khối lệnh khi điều kiện sai
}

Lưu ý:
- Điều kiện luôn được đặt trong cặp dấu ngoặc đơn (...).
- So sánh bằng phải dùng 2 dấu bằng (==), không được dùng 1 dấu bằng (=) vì đó là phép gán!`,
    examples: [
      {
        title: 'Tìm số lớn nhất giữa a và b',
        code: `if (a > b) {
    cout << "Max la: " << a << endl;
} else {
    cout << "Max la: " << b << endl;
}`
      }
    ],
    task: 'Nhập vào một số nguyên n. In ra "CHAN" nếu n là số chẵn, ngược lại in ra "LE".',
    initialCode: `#include <iostream>
using namespace std;

int main() {
    // Nhập n và in CHAN hoặc LE
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        if (n % 2 == 0) {
            cout << "CHAN" << endl;
        } else {
            cout << "LE" << endl;
        }
    }
    return 0;
}`,
    hints: [
      'Điều kiện số chẵn: if (n % 2 == 0)',
      'In kết quả: cout << "CHAN" << endl; hoặc cout << "LE" << endl;',
      'Nhớ đặt điều kiện trong dấu ngoặc đơn (n % 2 == 0).'
    ],
    advancedChallenge: 'Nếu n = 0 thì in ra "KHONG".',
    testCases: [
      { input: '4\n', expectedOutput: 'CHAN\n', description: '4 là số chẵn' },
      { input: '7\n', expectedOutput: 'LE\n', description: '7 là số lẻ' },
      { input: '100\n', expectedOutput: 'CHAN\n', description: '100 là số chẵn' },
      { input: '999\n', expectedOutput: 'LE\n', description: '999 là số lẻ' }
    ],
    xpReward: 70
  },
  {
    id: 'cpp-06',
    courseId: 'cpp',
    order: 6,
    title: 'Bài 6: Vòng lặp for trong C++',
    description: 'Cú pháp for (khởi_tạo; điều_kiện; bước_nhảy) và tính tổng dãy số.',
    target: 'Biết cách lập trình vòng lặp for từ 1 đến n và tính giai thừa, tính tổng.',
    theory: `Cú pháp vòng lặp for:
for (khoi_tao; dieu_kien; buoc_nhay) {
    // Khối lệnh được lặp
}

Ví dụ:
for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
Kết quả in ra: 1 2 3 4 5`,
    examples: [
      {
        title: 'Tính tổng 1 đến 5',
        code: `int tong = 0;
for (int i = 1; i <= 5; i++) {
    tong += i;
}
cout << tong << endl; // In 15`
      }
    ],
    task: 'Nhập vào số nguyên dương n (1 <= n <= 1000). Tính tổng S = 1 + 2 + ... + n và in ra màn hình.',
    initialCode: `#include <iostream>
using namespace std;

int main() {
    // Tính tổng từ 1 đến n bằng vòng lặp for
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        long long tong = 0;
        for (int i = 1; i <= n; i++) {
            tong += i;
        }
        cout << tong << endl;
    }
    return 0;
}`,
    hints: [
      'Khai báo long long tong = 0;',
      'Vòng lặp: for (int i = 1; i <= n; i++)',
      'Bên trong vòng lặp: tong += i;',
      'Sau vòng lặp: cout << tong << endl;'
    ],
    advancedChallenge: 'Tính tích P = 1 * 2 * ... * n (giai thừa n!).',
    testCases: [
      { input: '5\n', expectedOutput: '15\n', description: 'Tổng 1+2+3+4+5 = 15' },
      { input: '10\n', expectedOutput: '55\n', description: 'Tổng 1..10 = 55' },
      { input: '100\n', expectedOutput: '5050\n', description: 'Tổng 1..100 = 5050' }
    ],
    xpReward: 80
  },
  {
    id: 'cpp-07',
    courseId: 'cpp',
    order: 7,
    title: 'Bài 7: Vòng lặp while (Lặp khi điều kiện đúng)',
    description: 'Sử dụng while để lặp với số lần chưa biết trước.',
    target: 'Giải bài toán đếm chữ số hoặc tính tổng các chữ số của một số nguyên.',
    theory: `Cú pháp while:
while (dieu_kien) {
    // Khối lệnh
}

Vòng lặp sẽ kiểm tra điều kiện trước khi thực thi. Nếu ngay từ đầu điều kiện sai, khối lệnh sẽ không chạy lần nào.`,
    examples: [
      {
        title: 'Đếm chữ số của n',
        code: `int n = 1234;
int dem = 0;
while (n > 0) {
    dem++;
    n /= 10;
}`
      }
    ],
    task: 'Nhập số nguyên dương n. Hãy đếm xem số n có bao nhiêu chữ số và in ra kết quả.',
    initialCode: `#include <iostream>
using namespace std;

int main() {
    // Đếm số chữ số của n
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    if (cin >> n) {
        int dem = 0;
        if (n == 0) dem = 1;
        while (n > 0) {
            dem++;
            n /= 10;
        }
        cout << dem << endl;
    }
    return 0;
}`,
    hints: [
      'Khai báo biến dem = 0;',
      'Chạy while (n > 0): dem++; n /= 10;',
      'In ra dem.'
    ],
    advancedChallenge: 'Tính tổng các chữ số của n (ví dụ: 123 -> 6).',
    testCases: [
      { input: '12345\n', expectedOutput: '5\n', description: '12345 có 5 chữ số' },
      { input: '8\n', expectedOutput: '1\n', description: '8 có 1 chữ số' },
      { input: '100000\n', expectedOutput: '6\n', description: '100000 có 6 chữ số' }
    ],
    xpReward: 80
  },
  {
    id: 'cpp-08',
    courseId: 'cpp',
    order: 8,
    title: 'Bài 8: Mảng một chiều (One-dimensional Array)',
    description: 'Khai báo mảng int a[1000], nhập mảng và tìm phần tử lớn nhất.',
    target: 'Thành thạo thao tác duyệt mảng và tìm kiếm phần tử trong mảng.',
    theory: `Mảng là tập hợp các phần tử cùng kiểu dữ liệu đứng liền kề trong bộ nhớ:
- Khai báo: int a[100]; (chứa tối đa 100 phần tử)
- Chỉ số mảng bắt đầu từ 0 đến n - 1.
- Nhập mảng:
  for (int i = 0; i < n; i++) {
      cin >> a[i];
  }`,
    examples: [
      {
        title: 'Tìm giá trị lớn nhất trong mảng',
        code: `int maxVal = a[0];
for (int i = 1; i < n; i++) {
    if (a[i] > maxVal) {
        maxVal = a[i];
    }
}`
      }
    ],
    task: 'Nhập số nguyên n (1 <= n <= 1000), theo sau là n số nguyên của mảng. Hãy tìm và in ra số lớn nhất trong mảng đó.',
    initialCode: `#include <iostream>
using namespace std;

int main() {
    // Nhập mảng n phần tử và tìm phần tử lớn nhất
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        int a[1005];
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        int maxVal = a[0];
        for (int i = 1; i < n; i++) {
            if (a[i] > maxVal) {
                maxVal = a[i];
            }
        }
        cout << maxVal << endl;
    }
    return 0;
}`,
    hints: [
      'Đọc n: cin >> n;',
      'Duyệt nhập mảng: for (int i = 0; i < n; i++) cin >> a[i];',
      'Gán maxVal = a[0]; duyệt từ 1 đến n-1, nếu a[i] > maxVal thì maxVal = a[i];',
      'In maxVal ra màn hình.'
    ],
    advancedChallenge: 'In thêm vị trí (chỉ số index) của phần tử lớn nhất.',
    testCases: [
      { input: '5\n2 8 4 9 3\n', expectedOutput: '9\n', description: 'Mảng 2 8 4 9 3 -> max là 9' },
      { input: '3\n-5 -2 -10\n', expectedOutput: '-2\n', description: 'Mảng số âm -> max là -2' },
      { input: '1\n100\n', expectedOutput: '100\n', description: 'Mảng 1 phần tử' }
    ],
    xpReward: 90
  },
  {
    id: 'cpp-09',
    courseId: 'cpp',
    order: 9,
    title: 'Bài 9: Xử lý Chuỗi ký tự (std::string)',
    description: 'Sử dụng thư viện <string> để thao tác với chuỗi văn bản và độ dài s.length().',
    target: 'Biết cách đọc chuỗi, truy xuất ký tự s[i] và đảo ngược chuỗi.',
    theory: `Kiểu std::string trong C++ rất tiện lợi:
#include <string>
- Đọc 1 từ (không dấu cách): cin >> s;
- Đọc cả dòng (có dấu cách): getline(cin, s);
- Độ dài: s.length() hoặc s.size()
- Ký tự thứ i: s[i] (chỉ số từ 0).`,
    examples: [
      {
        title: 'Đảo ngược chuỗi đơn giản',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "ABC";
    for (int i = s.length() - 1; i >= 0; i--) {
        cout << s[i];
    }
    cout << endl; // In ra CBA
    return 0;
}`
      }
    ],
    task: 'Nhập một từ s từ bàn phím (không chứa dấu cách). Hãy in ra độ dài của từ đó (số lượng ký tự).',
    initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Nhập chuỗi s và in ra độ dài của s
    
    return 0;
}`,
    solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    if (cin >> s) {
        cout << s.length() << endl;
    }
    return 0;
}`,
    hints: [
      'Khai báo: string s;',
      'Đọc từ: cin >> s;',
      'In độ dài: cout << s.length() << endl; (hoặc s.size())'
    ],
    advancedChallenge: 'In chuỗi s theo thứ tự đảo ngược.',
    testCases: [
      { input: 'CodeLab\n', expectedOutput: '7\n', description: 'CodeLab có 7 ký tự' },
      { input: 'Offline\n', expectedOutput: '7\n', description: 'Offline có 7 ký tự' },
      { input: 'C++\n', expectedOutput: '3\n', description: 'C++ có 3 ký tự' }
    ],
    xpReward: 90
  },
  {
    id: 'cpp-10',
    courseId: 'cpp',
    order: 10,
    title: 'Bài 10: Xây dựng Hàm & Thuật toán Số nguyên tố',
    description: 'Tổ chức hàm bool kiemTraNguyenTo(int n) và áp dụng trong chương trình chính.',
    target: 'Biết cách khai báo hàm con trước hàm main() và gọi hàm.',
    theory: `Cấu trúc hàm trong C++:
kieu_tra_ve tenHam(tham_so1, tham_so2) {
    // Các lệnh tính toán
    return ket_qua;
}

Ví dụ hàm kiểm tra nguyên tố:
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}`,
    examples: [
      {
        title: 'Hàm tính lũy thừa mũ 2',
        code: `int square(int x) {
    return x * x;
}`
      }
    ],
    task: 'Viết hàm kiểm tra số nguyên tố. Nhập vào số nguyên n. In ra "YES" nếu n là số nguyên tố, ngược lại in "NO".',
    initialCode: `#include <iostream>
using namespace std;

// Viết hàm bool isPrime(int n) tại đây

int main() {
    // Nhập n và in YES hoặc NO
    
    return 0;
}`,
    solutionCode: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int n;
    if (cin >> n) {
        if (isPrime(n)) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        }
    }
    return 0;
}`,
    hints: [
      'Số nguyên tố là số >= 2 và chỉ chia hết cho 1 và chính nó.',
      'Nếu n < 2 return false.',
      'Duyệt từ 2 đến i * i <= n, nếu chia hết thì return false.'
    ],
    advancedChallenge: 'Đếm xem có bao nhiêu số nguyên tố từ 1 đến n.',
    testCases: [
      { input: '7\n', expectedOutput: 'YES\n', description: '7 là số nguyên tố' },
      { input: '12\n', expectedOutput: 'NO\n', description: '12 không phải số nguyên tố' },
      { input: '2\n', expectedOutput: 'YES\n', description: '2 là số nguyên tố chẵn duy nhất' },
      { input: '1\n', expectedOutput: 'NO\n', description: '1 không phải số nguyên tố' }
    ],
    xpReward: 100
  }
];
