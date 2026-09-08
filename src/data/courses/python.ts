import { Lesson } from '../../types';

export const pythonLessons: Lesson[] = [
  {
    id: 'py-01',
    courseId: 'python',
    order: 1,
    title: 'Bài 1: Lệnh print() và Xuất dữ liệu',
    description: 'Viết câu lệnh đầu tiên với hàm print() để in chữ và số ra màn hình.',
    target: 'Hiểu cú pháp hàm print() và in được thông điệp chào mừng.',
    theory: `Python là ngôn ngữ lập trình phổ biến nhất hiện nay nhờ cú pháp ngắn gọn, trong sáng.
Hàm print() dùng để hiển thị dữ liệu ra màn hình:
- In chuỗi văn bản: Đặt trong dấu ngoặc kép "..." hoặc ngoặc đơn '...'.
- In số: Đặt trực tiếp con số, không cần dấu ngoặc kép.
- In nhiều giá trị: Ngăn cách nhau bằng dấu phẩy.`,
    examples: [
      {
        title: 'In lời chào và số',
        code: `print("Xin chào các bạn!")
print(2026)
print("Điểm của em là:", 10)`
      }
    ],
    task: 'Viết chương trình in ra chính xác dòng chữ: "Xin chao CodeLab Offline"',
    initialCode: `# Viết câu lệnh print() của bạn vào đây
`,
    solutionCode: `print("Xin chao CodeLab Offline")`,
    hints: [
      'Sử dụng hàm print("...")',
      'Chuỗi ký tự phải nằm trong dấu ngoặc kép: "Xin chao CodeLab Offline"',
      'Lưu ý viết đúng từng ký tự và không thiếu dấu ngoặc đóng )'
    ],
    advancedChallenge: 'In thêm một dòng thứ 2 ghi năm học hiện tại.',
    testCases: [
      { input: '', expectedOutput: 'Xin chao CodeLab Offline\n', description: 'Kiểm tra in dòng chào mừng' }
    ],
    xpReward: 50
  },
  {
    id: 'py-02',
    courseId: 'python',
    order: 2,
    title: 'Bài 2: Biến và Các kiểu dữ liệu cơ bản',
    description: 'Lưu trữ thông tin với biến số (int, float, str, bool) và quy tắc đặt tên biến.',
    target: 'Biết cách khai báo biến, gán giá trị và in giá trị của biến.',
    theory: `Biến là chiếc hộp dùng để chứa dữ liệu trong bộ nhớ:
- Số nguyên (int): a = 15, b = -5
- Số thực (float): pi = 3.14, diem = 9.5
- Chuỗi (str): name = "An", truong = "THPT Chuyen"
- Đúng/Sai (bool): da_nop_bai = True, ket_thuc = False

Trong Python, bạn không cần khai báo kiểu dữ liệu, hệ thống tự động nhận diện.`,
    examples: [
      {
        title: 'Khai báo biến',
        code: `ten = "Minh"
tuoi = 16
diem_tin = 9.5
print(ten, "nam nay", tuoi, "tuoi, diem tin la", diem_tin)`
      }
    ],
    task: 'Khai báo hai biến: a = 25 và b = 15. Sau đó in ra tổng của hai biến bằng lệnh: print(a + b)',
    initialCode: `# Khai báo a và b rồi in tổng a + b
`,
    solutionCode: `a = 25
b = 15
print(a + b)`,
    hints: [
      'Gán a = 25 trên dòng 1.',
      'Gán b = 15 trên dòng 2.',
      'Dòng 3 dùng lệnh print(a + b).'
    ],
    advancedChallenge: 'In thêm tích a * b và hiệu a - b.',
    testCases: [
      { input: '', expectedOutput: '40\n', description: 'In ra tổng 40' }
    ],
    xpReward: 50
  },
  {
    id: 'py-03',
    courseId: 'python',
    order: 3,
    title: 'Bài 3: Nhập dữ liệu với input() và Ép kiểu',
    description: 'Tương tác với người dùng qua bàn phím với hàm input(), int() và float().',
    target: 'Đọc dữ liệu từ người dùng và chuyển đổi kiểu dữ liệu để tính toán.',
    theory: `Hàm input() luôn trả về kiểu chuỗi (string):
- Nhập chuỗi: ten = input()
- Nhập số nguyên: n = int(input())
- Nhập số thực: x = float(input())

Nếu không dùng int(), "10" + "20" sẽ ra "1020" (ghép chữ) thay vì 30!`,
    examples: [
      {
        title: 'Nhập số và in gấp đôi',
        code: `so = int(input())
print(so * 2)`
      }
    ],
    task: 'Viết chương trình nhập vào một số nguyên n từ bàn phím và in ra bình phương của số đó (n * n).',
    initialCode: `# Nhập n và in n * n
`,
    solutionCode: `n = int(input())
print(n * n)`,
    hints: [
      'Dùng n = int(input()) để đọc số nguyên.',
      'In ra kết quả: print(n * n) hoặc print(n ** 2).',
      'Đảm bảo không in thừa các dòng nhắc nhở không cần thiết khi chấm tự động.'
    ],
    advancedChallenge: 'Nhập 2 số trên 2 dòng và in ra tổng của chúng.',
    testCases: [
      { input: '5\n', expectedOutput: '25\n', description: 'Test với n = 5 (kết quả 25)' },
      { input: '12\n', expectedOutput: '144\n', description: 'Test với n = 12 (kết quả 144)' },
      { input: '-7\n', expectedOutput: '49\n', description: 'Test với số âm n = -7 (kết quả 49)' }
    ],
    xpReward: 60
  },
  {
    id: 'py-04',
    courseId: 'python',
    order: 4,
    title: 'Bài 4: Các phép toán Số học và Chia lấy dư',
    description: 'Thành thạo +, -, *, /, // (chia nguyên), % (chia dư) và ** (lũy thừa).',
    target: 'Giải quyết các bài toán số học như tách chữ số, kiểm tra tính chia hết.',
    theory: `- Phép chia thực (/): 7 / 2 = 3.5
- Phép chia lấy phần nguyên (//): 7 // 2 = 3
- Phép chia lấy phần dư (%): 7 % 2 = 1 (rất quan trọng để kiểm tra chẵn/lẻ)
- Lũy thừa (**): 2 ** 3 = 8 (2 mũ 3)`,
    examples: [
      {
        title: 'Tách chữ số hàng chục và hàng đơn vị của số có 2 chữ số',
        code: `so = 84
chuc = so // 10   # Kết quả: 8
don_vi = so % 10  # Kết quả: 4
print(chuc, don_vi)`
      }
    ],
    task: 'Nhập vào số nguyên dương n từ bàn phím. In ra phần dư khi chia n cho 2 (n % 2).',
    initialCode: `# Nhập n và in n % 2
`,
    solutionCode: `n = int(input())
print(n % 2)`,
    hints: [
      'Đọc n: n = int(input())',
      'In phần dư: print(n % 2)',
      'Số chẵn sẽ cho số dư 0, số lẻ cho số dư 1.'
    ],
    advancedChallenge: 'Nhập số giây và đổi ra phút và giây (dùng // và %).',
    testCases: [
      { input: '10\n', expectedOutput: '0\n', description: 'Số chẵn 10 % 2 = 0' },
      { input: '7\n', expectedOutput: '1\n', description: 'Số lẻ 7 % 2 = 1' },
      { input: '101\n', expectedOutput: '1\n', description: 'Số 101 % 2 = 1' }
    ],
    xpReward: 60
  },
  {
    id: 'py-05',
    courseId: 'python',
    order: 5,
    title: 'Bài 5: Cấu trúc Rẽ nhánh (if - elif - else)',
    description: 'Quyết định hành động theo điều kiện logic và toán tử so sánh (==, !=, >, <, >=, <=).',
    target: 'Lập trình phân loại học lực, kiểm tra điều kiện chẵn lẻ hoặc âm dương.',
    theory: `Cấu trúc rẽ nhánh trong Python yêu cầu THỤT ĐẦU DÒNG (Indentation - thường là 4 phím cách hoặc 1 phím Tab):
if dieu_kien:
    # Lệnh thực hiện nếu đúng
elif dieu_kien_khac:
    # Lệnh thực hiện
else:
    # Lệnh nếu tất cả đều sai

Lưu ý: Dấu hai chấm (:) ở cuối mỗi câu lệnh điều kiện là bắt buộc!`,
    examples: [
      {
        title: 'Kiểm tra điểm đạt hay trượt',
        code: `diem = 7.5
if diem >= 5.0:
    print("DAT")
else:
    print("KHONG DAT")`
      }
    ],
    task: 'Nhập vào một số nguyên n. In ra "CHAN" nếu n là số chẵn, ngược lại in ra "LE".',
    initialCode: `# Nhập n, kiểm tra chẵn lẻ và in ra CHAN hoặc LE
`,
    solutionCode: `n = int(input())
if n % 2 == 0:
    print("CHAN")
else:
    print("LE")`,
    hints: [
      'Đọc số nguyên: n = int(input())',
      'Điều kiện số chẵn: n % 2 == 0 (nhớ dùng 2 dấu bằng ==)',
      'Đừng quên dấu : ở cuối dòng if và else, thụt dòng cho lệnh print.'
    ],
    advancedChallenge: 'Nếu n = 0 thì in thêm dòng chữ "KHONG".',
    testCases: [
      { input: '2\n', expectedOutput: 'CHAN\n', description: 'Test với 2 (CHAN)' },
      { input: '5\n', expectedOutput: 'LE\n', description: 'Test với 5 (LE)' },
      { input: '100\n', expectedOutput: 'CHAN\n', description: 'Test với 100 (CHAN)' },
      { input: '999\n', expectedOutput: 'LE\n', description: 'Test với 999 (LE)' }
    ],
    xpReward: 70
  },
  {
    id: 'py-06',
    courseId: 'python',
    order: 6,
    title: 'Bài 6: Vòng lặp for và Hàm range()',
    description: 'Lặp lại công việc với số lần biết trước và duyệt qua dải số.',
    target: 'Biết cách sử dụng range(start, stop, step) để tính tổng dãy số.',
    theory: `Vòng lặp for dùng để duyệt qua chuỗi số:
- range(n): Từ 0 đến n-1.
- range(1, n+1): Từ 1 đến n.
- range(1, 10, 2): Từ 1 đến 9 với bước nhảy 2 (1, 3, 5, 7, 9).

Cú pháp:
for i in range(1, 6):
    print(i)`,
    examples: [
      {
        title: 'In các số từ 1 đến 5',
        code: `for i in range(1, 6):
    print(i)`
      }
    ],
    task: 'Nhập số nguyên n (n >= 1). Dùng vòng lặp for để tính tổng S = 1 + 2 + ... + n và in kết quả ra màn hình.',
    initialCode: `# Tính tổng từ 1 đến n
`,
    solutionCode: `n = int(input())
tong = 0
for i in range(1, n + 1):
    tong += i
print(tong)`,
    hints: [
      'Khởi tạo biến tong = 0 trước vòng lặp.',
      'Chạy vòng lặp: for i in range(1, n + 1):',
      'Bên trong vòng lặp: tong = tong + i (hoặc tong += i)',
      'Sau khi kết thúc lặp, in ra tong (không thụt lề lệnh print).'
    ],
    advancedChallenge: 'Chỉ tính tổng các số chẵn trong khoảng từ 1 đến n.',
    testCases: [
      { input: '5\n', expectedOutput: '15\n', description: 'Tổng 1+2+3+4+5 = 15' },
      { input: '10\n', expectedOutput: '55\n', description: 'Tổng 1..10 = 55' },
      { input: '100\n', expectedOutput: '5050\n', description: 'Tổng 1..100 = 5050' }
    ],
    xpReward: 80
  },
  {
    id: 'py-07',
    courseId: 'python',
    order: 7,
    title: 'Bài 7: Vòng lặp while (Lặp với điều kiện)',
    description: 'Lặp lại công việc khi một điều kiện còn đúng và tránh lỗi vòng lặp vô hạn.',
    target: 'Áp dụng vòng lặp while để giải bài toán đếm chữ số, tìm ước chung.',
    theory: `Vòng lặp while thực thi khối lệnh chừng nào điều kiện vẫn có giá trị True:
while dieu_kien:
    # Lệnh thực hiện
    # Thay đổi biến đếm để điều kiện cuối cùng trở thành False!

Chú ý: Nếu quên cập nhật biến đếm, chương trình sẽ rơi vào vòng lặp vô tận (Infinite Loop).`,
    examples: [
      {
        title: 'Đếm ngược từ 5 về 1',
        code: `dem = 5
while dem > 0:
    print(dem)
    dem -= 1
print("Xong!")`
      }
    ],
    task: 'Nhập số nguyên dương n. Hãy đếm xem n có bao nhiêu chữ số và in ra kết quả. (Ví dụ 1234 có 4 chữ số).',
    initialCode: `# Đếm số chữ số của n bằng vòng lặp while
`,
    solutionCode: `n = int(input())
dem = 0
if n == 0:
    dem = 1
else:
    while n > 0:
        dem += 1
        n = n // 10
print(dem)`,
    hints: [
      'Khởi tạo dem = 0.',
      'Trong khi n > 0: tăng dem thêm 1, và lấy n //= 10 để bỏ đi chữ số cuối cùng.',
      'In ra biến dem sau vòng lặp.'
    ],
    advancedChallenge: 'Tính tổng các chữ số của n (ví dụ: 123 -> 1+2+3=6).',
    testCases: [
      { input: '12345\n', expectedOutput: '5\n', description: 'Số 12345 có 5 chữ số' },
      { input: '9\n', expectedOutput: '1\n', description: 'Số 9 có 1 chữ số' },
      { input: '1000\n', expectedOutput: '4\n', description: 'Số 1000 có 4 chữ số' }
    ],
    xpReward: 80
  },
  {
    id: 'py-08',
    courseId: 'python',
    order: 8,
    title: 'Bài 8: Danh sách (List trong Python)',
    description: 'Lưu trữ tập hợp các phần tử, truy xuất theo chỉ số (index), thêm phần tử với append().',
    target: 'Biết cách khởi tạo danh sách, tính độ dài len(), tìm phần tử lớn nhất max(), tính tổng sum().',
    theory: `List là một danh sách có thứ tự các phần tử:
- Khởi tạo: a = [3, 7, 2, 9, 5]
- Chỉ số bắt đầu từ 0: a[0] là 3, a[1] là 7...
- Thêm vào cuối: a.append(10)
- Độ dài danh sách: len(a)
- Tính tổng: sum(a)
- Giá trị lớn nhất: max(a), nhỏ nhất: min(a)`,
    examples: [
      {
        title: 'Thao tác với danh sách điểm',
        code: `diem = [8, 9, 7, 10, 6]
print("So hoc sinh:", len(diem))
print("Diem cao nhat:", max(diem))
print("Tong diem:", sum(diem))`
      }
    ],
    task: 'Nhập số nguyên n, sau đó dòng tiếp theo là n số nguyên cách nhau bởi dấu cách. Hãy in ra số lớn nhất trong dãy số đó.',
    initialCode: `# Nhập n và danh sách các số, in ra số lớn nhất
`,
    solutionCode: `n = int(input())
ds = list(map(int, input().split()))
print(max(ds))`,
    hints: [
      'Dòng 1: n = int(input())',
      'Dòng 2 đọc danh sách: ds = list(map(int, input().split()))',
      'In số lớn nhất bằng hàm max: print(max(ds))'
    ],
    advancedChallenge: 'In thêm số nhỏ nhất và giá trị trung bình cộng của dãy số.',
    testCases: [
      { input: '5\n3 9 2 8 5\n', expectedOutput: '9\n', description: 'Dãy 3, 9, 2, 8, 5 -> max là 9' },
      { input: '3\n-10 -5 -20\n', expectedOutput: '-5\n', description: 'Dãy số âm: max là -5' },
      { input: '1\n100\n', expectedOutput: '100\n', description: 'Dãy 1 số' }
    ],
    xpReward: 90
  },
  {
    id: 'py-09',
    courseId: 'python',
    order: 9,
    title: 'Bài 9: Xây dựng Hàm (Function def & return)',
    description: 'Chia nhỏ bài toán thành các hàm tái sử dụng với từ khóa def và lệnh return.',
    target: 'Biết cách định nghĩa hàm có tham số và trả về kết quả.',
    theory: `Hàm (Function) giúp mã nguồn gọn gàng, dễ bảo trì:
def ten_ham(tham_so1, tham_so2):
    # Khối lệnh tính toán
    return ket_qua

Gọi hàm:
ket_qua = ten_ham(gia_tri1, gia_tri2)`,
    examples: [
      {
        title: 'Hàm tính chu vi hình chữ nhật',
        code: `def chu_vi_hcn(dai, rong):
    return (dai + rong) * 2

print(chu_vi_hcn(5, 3))`
      }
    ],
    task: 'Viết hàm kiem_tra_nguyen_to(n) trả về True nếu n là số nguyên tố, ngược lại trả về False. Đọc số n từ bàn phím và in "YES" nếu là số nguyên tố, ngược lại in "NO".',
    initialCode: `# Viết hàm kiểm tra số nguyên tố và in kết quả YES / NO
`,
    solutionCode: `def kiem_tra_nguyen_to(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

n = int(input())
if kiem_tra_nguyen_to(n):
    print("YES")
else:
    print("NO")`,
    hints: [
      'Số nguyên tố là số lớn hơn hoặc bằng 2 và chỉ chia hết cho 1 và chính nó.',
      'Nếu n < 2 thì trả về False.',
      'Duyệt i từ 2 đến căn bậc 2 của n (hoặc n-1). Nếu n chia hết cho i thì trả về False.'
    ],
    advancedChallenge: 'In ra tất cả các số nguyên tố nhỏ hơn hoặc bằng n.',
    testCases: [
      { input: '7\n', expectedOutput: 'YES\n', description: 'Số 7 là số nguyên tố' },
      { input: '10\n', expectedOutput: 'NO\n', description: 'Số 10 không phải số nguyên tố' },
      { input: '1\n', expectedOutput: 'NO\n', description: 'Số 1 không phải số nguyên tố' },
      { input: '29\n', expectedOutput: 'YES\n', description: 'Số 29 là số nguyên tố' }
    ],
    xpReward: 90
  },
  {
    id: 'py-10',
    courseId: 'python',
    order: 10,
    title: 'Bài 10: Xử lý Chuỗi (String) & Bài toán Thực tế',
    description: 'Thao tác với văn bản: tách từ split(), đếm ký tự, đảo ngược chuỗi.',
    target: 'Giải quyết bài toán xử lý xâu ký tự thường gặp trong các đề thi Tin học.',
    theory: `Chuỗi trong Python có rất nhiều phương thức tiện ích:
- s.upper(): Chuyển thành chữ in hoa.
- s.lower(): Chuyển thành chữ in thường.
- s[::-1]: Đảo ngược chuỗi.
- s.split(): Tách chuỗi thành danh sách các từ.
- len(s): Độ dài chuỗi.`,
    examples: [
      {
        title: 'Đảo ngược chuỗi',
        code: `s = "Python"
print(s[::-1])  # In ra: nohtyP`
      }
    ],
    task: 'Nhập một chuỗi văn bản s từ bàn phím. Hãy in ra chuỗi s nhưng được viết in hoa toàn bộ (dùng hàm .upper()).',
    initialCode: `# Nhập chuỗi s và in ra chuỗi viết in hoa
`,
    solutionCode: `s = input()
print(s.upper())`,
    hints: [
      'Nhập chuỗi: s = input()',
      'In ra chuỗi viết hoa: print(s.upper())',
      'Đảm bảo không thêm ký tự lạ vào kết quả.'
    ],
    advancedChallenge: 'Đếm xem chuỗi có bao nhiêu nguyên âm (a, e, i, o, u).',
    testCases: [
      { input: 'hello world\n', expectedOutput: 'HELLO WORLD\n', description: 'hello world -> HELLO WORLD' },
      { input: 'codelab offline\n', expectedOutput: 'CODELAB OFFLINE\n', description: 'codelab offline -> CODELAB OFFLINE' },
      { input: 'TinHoc10\n', expectedOutput: 'TINHOC10\n', description: 'TinHoc10 -> TINHOC10' }
    ],
    xpReward: 100
  }
];
