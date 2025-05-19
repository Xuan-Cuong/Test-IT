// testContent.js

const testData = [
    // Phần I: Câu hỏi lý thuyết
    {
        id: 'q1',
        type: 'theory-mcq', // Theory - Multiple Choice Question
        question: 'Câu 1: Độ phức tạp thuật toán. Độ phức tạp thời gian của thuật toán tìm kiếm nhị phân (Binary Search) là:',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        answer: 'O(log n)',
        points: 0.5 // Điểm cho câu lý thuyết
    },
    {
        id: 'q2',
        type: 'theory-mcq',
        question: 'Câu 2: Cấu trúc dữ liệu. Cấu trúc dữ liệu nào nên được sử dụng khi cần thực hiện các hoạt động "Last-In-First-Out" (LIFO)?',
        options: ['Queue', 'Stack', 'Linked List', 'Binary Tree'],
        answer: 'Stack',
        points: 0.5
    },
     {
        id: 'q3',
        type: 'theory-mcq',
        question: 'Câu 3: Nguyên tắc lập trình. Nguyên tắc DRY trong lập trình có nghĩa là:',
        options: ["Don't Repeat Yourself", "Data Redundancy Yield", "Debug Rigorously Yourself", "Define Resources Yearly"],
        answer: "Don't Repeat Yourself",
        points: 0.5
    },
    {
        id: 'q4',
        type: 'theory-mcq',
        question: 'Câu 4: Lập trình hướng đối tượng. Đâu KHÔNG phải là một trong bốn nguyên tắc cơ bản của lập trình hướng đối tượng?',
        options: ["Tính kế thừa (Inheritance)", "Tính bao đóng (Encapsulation)", "Tính đa hình (Polymorphism)", "Tính tuần tự (Sequentiality)"],
        answer: "Tính tuần tự (Sequentiality)",
        points: 0.5
    },
    {
        id: 'q5',
        type: 'theory-tf', // Theory - True/False
        question: 'Câu 5: Xử lý lỗi. Đúng hay Sai: Exception handling (xử lý ngoại lệ) là một phương pháp để xử lý lỗi syntax trong quá trình biên dịch.',
        options: ['Đúng', 'Sai'],
        answer: 'Sai',
        explanation: 'Exception handling là phương pháp xử lý các lỗi xảy ra trong thời gian chạy (runtime errors), không phải lỗi cú pháp (syntax errors) trong quá trình biên dịch.',
        points: 0.5
    },
    {
        id: 'q6',
        type: 'theory-mcq',
        question: 'Câu 6: Thuật toán. Thuật toán sắp xếp nào sau đây có độ phức tạp thời gian trường hợp tệ nhất là O(n²)?',
        options: ["Merge Sort", "Quick Sort", "Heap Sort", "Tất cả đều đúng"],
        answer: "Quick Sort",
        points: 0.5
    },
    {
        id: 'q7',
        type: 'theory-mcq',
        question: 'Câu 7: Kiểu dữ liệu và cấu trúc dữ liệu. Hash table sử dụng cơ chế nào để lưu trữ và truy xuất dữ liệu?',
        options: ["Indexing", "Hashing function", "Sequential searching", "Binary search"],
        answer: "Hashing function",
        points: 0.5
    },
    {
        id: 'q8',
        type: 'theory-mcq',
        question: 'Câu 8: Nguyên tắc thiết kế phần mềm. Nguyên tắc "SOLID" trong thiết kế phần mềm hướng đối tượng bao gồm những nguyên tắc nào? Chọn đáp án đúng.',
        options: [
            "Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion",
            "Structured programming, Object-oriented design, Logical flow, Iterative development, Data abstraction",
            "Syntax checking, Optimization, Logic verification, Integrated testing, Documentation",
            "Security, Optimization, Logical design, Inheritance, Debugging"
        ],
        answer: "Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion",
        points: 0.5
    },

    // Phần II: Câu hỏi thực hành
    {
        id: 'q9',
        type: 'practice-code', // Practice - Code/Pseudocode
        question: 'Câu 9: Xử lý mảng/danh sách. Viết một thuật toán để tìm phần tử lớn thứ hai trong một mảng số nguyên không sắp xếp. Không được sắp xếp mảng.',
        sampleAnswer: `function findSecondLargest(arr):
    if length(arr) < 2:
        return "Mảng cần có ít nhất 2 phần tử"

    largest = -∞
    secondLargest = -∞

    for each element in arr:
        if element > largest:
            secondLargest = largest
            largest = element
        else if element > secondLargest and element != largest:
            secondLargest = element

    if secondLargest == -∞:
        return "Không tìm thấy phần tử lớn thứ hai"

    return secondLargest`,
        points: 0.5 // Điểm tối đa cho câu thực hành (AI sẽ đánh giá trong thang này)
    },
    {
        id: 'q10',
        type: 'practice-code',
        question: 'Câu 10: Xử lý chuỗi. Viết thuật toán để kiểm tra một chuỗi có phải là palindrome hay không (đọc xuôi ngược đều giống nhau), không phân biệt hoa thường và bỏ qua các ký tự không phải chữ cái.',
         sampleAnswer: `function isPalindrome(text):
    # Chuyển thành chữ thường và loại bỏ ký tự không phải chữ cái
    cleanText = ""
    for each char in text:
        if char is alphanumeric:
            cleanText += lowercase(char)

    # Kiểm tra palindrome
    left = 0
    right = length(cleanText) - 1

    while left < right:
        if cleanText[left] != cleanText[right]:
            return false
        left += 1
        right -= 1

    return true`,
        points: 0.5
    },
    {
        id: 'q11',
        type: 'practice-code',
        question: 'Câu 11: Đệ quy. Viết hàm đệ quy để tính số Fibonacci thứ n. Sau đó, thảo luận về nhược điểm của giải pháp đệ quy này và đề xuất một phương pháp cải tiến.',
        sampleAnswer: `# Giải pháp đệ quy
function fibonacci_recursive(n):
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

# Giải pháp cải tiến sử dụng dynamic programming
function fibonacci_improved(n):
    if n <= 1:
        return n

    fib = array of size (n+1)
    fib[0] = 0
    fib[1] = 1

    for i from 2 to n:
        fib[i] = fib[i-1] + fib[i-2]

    return fib[n]

Nhược điểm của giải pháp đệ quy: Tính toán lặp lại nhiều lần cùng một giá trị, dẫn đến độ phức tạp thời gian là O(2^n), có thể gây tràn stack với n lớn.
Cải tiến: Sử dụng dynamic programming hoặc memoization để lưu trữ kết quả đã tính, giảm độ phức tạp xuống O(n).`,
        points: 0.5
    },
     {
        id: 'q12',
        type: 'practice-code',
        question: 'Câu 12: Thuật toán tìm kiếm. Phân tích và viết thuật toán tìm kiếm nhị phân (Binary Search). Nêu rõ điều kiện tiên quyết và độ phức tạp của thuật toán.',
        sampleAnswer: `function binarySearch(arr, target):
    left = 0
    right = length(arr) - 1

    while left <= right:
        mid = floor((left + right) / 2) // Sử dụng floor để tránh lỗi với số lẻ

        if arr[mid] == target:
            return mid
        else if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Target not found

Điều kiện tiên quyết: Mảng phải được sắp xếp trước.
Độ phức tạp thời gian: O(log n).
Độ phức tạp không gian: O(1).`,
        points: 0.5
    },
     {
        id: 'q13',
        type: 'practice-code',
        question: 'Câu 13: Sửa lỗi. Đoạn code sau đây có lỗi logic. Hãy tìm và sửa lỗi:\n\n```\nfunction isPrime(n):\n    if n <= 1:\n        return false\n    if n <= 3:\n        return true\n    if n % 2 == 0:\n        return false\n\n    i = 3\n    while i < n:\n        if n % i == 0:\n            return false\n        i = i + 2\n\n    return true\n```',
        sampleAnswer: `Lỗi: Vòng lặp kiểm tra đến n, không hiệu quả và không cần thiết. Cần kiểm tra đến căn bậc hai của n.
Code sửa:
\`\`\`
function isPrime(n):
    if n <= 1:
        return false
    if n <= 3:
        return true
    if n % 2 == 0:
        return false

    i = 3
    while i * i <= n:  // Chỉ cần kiểm tra đến căn bậc hai của n
        if n % i == 0:
            return false
        i = i + 2

    return true
\`\`\``,
        points: 0.5
    },
     {
        id: 'q14',
        type: 'practice-text', // Practice - Design/Text based answer
        question: 'Câu 14: Lập trình hướng đối tượng. Thiết kế một hệ thống quản lý thư viện đơn giản sử dụng các nguyên tắc OOP. Hãy xác định các lớp, mối quan hệ giữa chúng và các phương thức chính.',
        sampleAnswer: `class Book:
    properties:
        - id
        - title
        - author
        - isAvailable
    methods:
        - getDetails()
        - checkOut()
        - checkIn()

class Member:
    properties:
        - id
        - name
        - borrowedBooks (collection of Book objects)
    methods:
        - borrowBook(book)
        - returnBook(book)
        - getBorrowedBooks()

class Library:
    properties:
        - books (collection of Book objects)
        - members (collection of Member objects)
    methods:
        - addBook(book)
        - removeBook(bookId)
        - searchBooks(query)
        - registerMember(member)
        - removeMember(memberId)

class LibrarySystem:
    properties:
        - library
    methods:
        - processBookCheckout(bookId, memberId)
        - processBookReturn(bookId, memberId)
        - generateReports()

Mối quan hệ:
- Library chứa nhiều Books và Members (Quan hệ composition hoặc aggregation tùy ngữ cảnh chi tiết hơn).
- Member có thể mượn nhiều Books (Quan hệ association).
- LibrarySystem sử dụng Library để thực hiện các chức năng quản lý (Quan hệ aggregation).`,
        points: 0.5
    },
     {
        id: 'q15',
        type: 'practice-code',
        question: 'Câu 15: Xử lý ngoại lệ. Viết pseudocode để xử lý các ngoại lệ trong một hàm chia hai số, bao gồm xử lý trường hợp chia cho 0 và kiểm tra đầu vào không phải số.',
        sampleAnswer: `function safeDivide(a, b):
    try:
        if not isNumber(a) or not isNumber(b):
            throw new TypeError("Both inputs must be numbers")

        if b == 0:
            throw new DivideByZeroError("Cannot divide by zero")

        result = a / b
        return result

    catch TypeError as e:
        log(e.message)
        return null // hoặc giá trị lỗi khác tùy vào yêu cầu

    catch DivideByZeroError as e:
        log(e.message)
        return Infinity // hoặc giá trị lỗi khác tùy vào yêu cầu

    finally:
        log("Division operation completed")`,
        points: 0.5
    },
    {
        id: 'q16',
        type: 'practice-code',
        question: 'Câu 16: Tối ưu hóa code. Đoạn code sau đây tính tổng các số chẵn trong một mảng. Hãy tối ưu hóa nó và giải thích sự cải tiến.\n\n```\nfunction sumEvenNumbers(array):\n    sum = 0\n    for i from 0 to length(array)-1:\n        current = array[i]\n        if current % 2 == 0:\n            isEven = true\n        else:\n            isEven = false\n\n        if isEven == true:\n            sum = sum + current\n\n    return sum\n```',
        sampleAnswer: `Code đã tối ưu:
\`\`\`
function sumEvenNumbers(array):
    sum = 0
    for each number in array:
        if number % 2 == 0:
            sum += number
    return sum
\`\`\`
Giải thích sự cải tiến:
- Loại bỏ biến trung gian isEven không cần thiết.
- Đơn giản hóa điều kiện kiểm tra số chẵn (chỉ cần \`number % 2 == 0\`).
- Sử dụng cú pháp vòng lặp "for each" (hoặc for...of trong JS) giúp code rõ ràng, ngắn gọn hơn.
- Sử dụng phép toán += để làm code ngắn gọn hơn (\`sum += number\` thay vì \`sum = sum + number\`).`,
        points: 0.5
    },
    {
        id: 'q17',
        type: 'practice-code',
        question: 'Câu 17: Stack và Queue. Viết một thuật toán để kiểm tra dấu ngoặc trong một biểu thức có cân bằng hay không. Ví dụ: "{[()]}" là cân bằng, "{[(]}" không cân bằng.',
        sampleAnswer: `function isBalanced(expression):
    stack = new Stack()
    bracketMap = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    for each char in expression:
        if char in keys of bracketMap: // Nếu là ngoặc mở
            stack.push(char)
        else if char in values of bracketMap: // Nếu là ngoặc đóng
            if stack is empty:
                return false // Ngoặc đóng mà stack rỗng -> không cân bằng

            lastOpen = stack.pop()
            if bracketMap[lastOpen] != char:
                return false // Ngoặc đóng không khớp với ngoặc mở cuối cùng

    return stack is empty // Cuối cùng, stack phải rỗng thì mới cân bằng`,
        points: 0.5
    },
    {
        id: 'q18',
        type: 'practice-text',
        question: 'Câu 18: Xử lý file. Mô tả thuật toán để đọc một file text, đếm số lần xuất hiện của mỗi từ và xuất kết quả ra file mới, sắp xếp theo tần suất giảm dần.',
        sampleAnswer: `function countWordFrequency(inputFilePath, outputFilePath):
    wordCount = new Dictionary()

    # Bước 1: Đọc file đầu vào
    file = openFile(inputFilePath, "read")
    if file is null:
        return "Failed to open input file"

    # Bước 2: Xử lý từng dòng để đếm từ
    for each line in file:
        # Tiền xử lý: chuyển line thành chữ thường, loại bỏ dấu câu, tách thành các từ
        cleanedLine = lowercase(removePunctuation(line))
        words = splitIntoWords(cleanedLine) # Ví dụ: tách bằng khoảng trắng

        # Đếm tần suất
        for each word in words:
            if word is not empty: # Bỏ qua các từ rỗng sau khi tách
                if word in wordCount:
                    wordCount[word] += 1
                else:
                    wordCount[word] = 1

    closeFile(file)

    # Bước 3: Sắp xếp các từ theo tần suất giảm dần
    sortedWords = sort wordCount by value in descending order # Kết quả là danh sách cặp (word, count)

    # Bước 4: Ghi kết quả ra file mới
    outputFile = openFile(outputFilePath, "write")
    if outputFile is null:
        return "Failed to open output file"

    for each (word, count) in sortedWords:
        write to outputFile: word + ": " + count + newline # Mỗi từ một dòng

    closeFile(outputFile)

    return "Word count completed successfully"`,
        points: 0.5
    },
     {
        id: 'q19',
        type: 'practice-text',
        question: 'Câu 19: Phân tích thuật toán. Phân tích độ phức tạp về thời gian và không gian của thuật toán sau:\n\n```\nfunction mystery(arr, n):\n    if n <= 0:\n        return 0\n\n    result = 0\n    for i from 0 to n-1:\n        for j from i to n-1:\n            result += arr[i] * arr[j]\n\n    return result\n```',
        sampleAnswer: `Độ phức tạp thời gian: O(n²)
Giải thích:
Vòng lặp ngoài (biến i) chạy n lần (từ 0 đến n-1).
Vòng lặp trong (biến j) chạy từ i đến n-1.
- Khi i = 0, vòng lặp trong chạy n lần.
- Khi i = 1, vòng lặp trong chạy n-1 lần.
- ...
- Khi i = n-1, vòng lặp trong chạy 1 lần.
Tổng số lần thực thi phép cộng \`result += arr[i] * arr[j]\` là tổng của một cấp số cộng: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2.
Khi n lớn, n(n+1)/2 xấp xỉ n²/2. Do đó, độ phức tạp thời gian là O(n²).

Độ phức tạp không gian: O(1)
Giải thích:
Thuật toán chỉ sử dụng một số lượng biến cố định độc lập với kích thước mảng đầu vào n (các biến \`result\`, \`i\`, \`j\`). Không có cấu trúc dữ liệu nào có kích thước tăng tuyến tính hoặc phức tạp hơn theo n được sử dụng.`,
        points: 0.5
    },
    {
        id: 'q20',
        type: 'practice-code',
        question: 'Câu 20: Bài tập tổng hợp. Viết thuật toán để tìm đường đi ngắn nhất trong một ma trận từ góc trên bên trái đến góc dưới bên phải. Chỉ được di chuyển xuống hoặc sang phải. Mỗi ô chứa một giá trị chi phí khi đi qua ô đó.',
        sampleAnswer: `function findShortestPath(matrix):
    rows = number of rows in matrix
    cols = number of columns in matrix

    if rows == 0 or cols == 0:
        return 0 // hoặc giá trị phù hợp nếu ma trận rỗng

    # Khởi tạo mảng dp để lưu chi phí nhỏ nhất để đến ô (i, j)
    # dp[i][j] = chi phí nhỏ nhất đến ô (i, j)
    dp = new matrix of size rows x cols

    # Chi phí đến ô đầu tiên (0, 0) chính là giá trị của ô đó
    dp[0][0] = matrix[0][0]

    # Điền chi phí cho cột đầu tiên (chỉ có thể đi xuống từ ô phía trên)
    for i from 1 to rows-1:
        dp[i][0] = dp[i-1][0] + matrix[i][0]

    # Điền chi phí cho hàng đầu tiên (chỉ có thể đi sang phải từ ô phía trái)
    for j from 1 to cols-1:
        dp[0][j] = dp[0][j-1] + matrix[0][j]

    # Điền chi phí cho các ô còn lại
    # Để đến ô (i, j), chỉ có thể đến từ (i-1, j) (đi xuống) hoặc (i, j-1) (đi sang phải)
    # Chọn đường đi có chi phí nhỏ nhất từ hai ô đó
    for i from 1 to rows-1:
        for j from 1 to cols-1:
            dp[i][j] = matrix[i][j] + min(dp[i-1][j], dp[i][j-1])

    # Kết quả là chi phí nhỏ nhất để đến ô cuối cùng (rows-1, cols-1)
    return dp[rows-1][cols-1]`,
        points: 0.5
    }
];