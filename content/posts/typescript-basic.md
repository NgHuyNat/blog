---
title: "TypeScript basic"
date: "2025-09-27"
summary: "TypeScript basic for beginer"
tags: ["TypeScript"]
category: "Dev"
status: "Public"
type: "Post"
---

### **1. Kiểu dữ liệu cơ bản (Basic Types)**

Đây là những kiểu dữ liệu nguyên thủy nhất.

- **`boolean`**: Giá trị `true` hoặc `false`.
- **`number`**: Tất cả các loại số (nguyên, thực, bát phân, thập lục phân).
- **`string`**: Chuỗi ký tự, có thể dùng dấu nháy đơn (`'`), nháy kép (`"`) hoặc backticks (```) cho template string.
- **`array`**: Mảng các giá trị cùng kiểu. Có hai cách khai báo: `let list: number[] = [1, 2, 3];` hoặc `let list: Array<number> = [1, 2, 3];`.
- **`tuple`**: Mảng có số lượng phần tử cố định và mỗi phần tử có một kiểu dữ liệu xác định.
- **`any`**: Kiểu "thần kỳ" cho phép bạn gán bất kỳ giá trị nào. Nên hạn chế sử dụng vì nó làm mất đi lợi ích của TypeScript.
- **`unknown`**: Tương tự `any` nhưng an toàn hơn. Bạn không thể thực hiện thao tác trên một biến `unknown` cho đến khi kiểm tra kiểu của nó.
- **`void`**: Thường dùng cho các hàm không trả về giá trị nào.
- **`null` & `undefined`**: Đại diện cho giá trị rỗng hoặc chưa được khởi tạo.

```jsx
// Ví dụt tổng quát về các kiểu dữ liệu

let isDone: boolean = false
let age: number = 30
let fullName: string = `John Doe`
let numbers: number[] = [1, 2, 3]

// Tuple: Mảng có kiểu dữ liệu cố định cho từng vị trí
let person: [string, number] = ["Alice", 25]

// any: Bỏ qua kiểm tra kiểu, nên tránh dùng
let notSure: any = 4
notSure = "maybe a string instead"

console.log(`Họ và tên: ${fullName}, Tuổi: ${age}`)
```

### **2. Interface & Type Alias**

Cả hai đều dùng để định nghĩa cấu trúc của một đối tượng.

- **`interface`**: Là một cách mạnh mẽ để định nghĩa "hợp đồng" cho một đối tượng. Interface có thể được `implement` bởi các `class` và có thể `extends` từ các interface khác.
- **`type` Alias**: Dùng từ khóa `type` để tạo một tên mới (bí danh) cho một kiểu dữ liệu. Nó linh hoạt hơn, có thể dùng cho các kiểu nguyên thủy, union, tuple.

**Khi nào dùng cái nào?**

- Dùng **`interface`** khi bạn định nghĩa cấu trúc của một đối tượng hoặc một lớp.
- Dùng **`type`** khi bạn muốn định nghĩa union, literal, hoặc các kiểu phức tạp khác.

```jsx
// Interface định nghĩa cấu trúc của một User
interface User {
    readonly id: number; // Thuộc tính chỉ đọc
    name: string;
    email: string;
    age?: number; // Thuộc tính tùy chọn
}

// Type Alias cho một kiểu dữ liệu cụ thể
type UserID = string | number;

let user: User = {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com"
};

let userId: UserID = "user-123";
```

### **3. Function Types**

Định nghĩa kiểu dữ liệu cho một hàm, bao gồm kiểu của các tham số và kiểu giá trị trả về.

```jsx
// Định nghĩa kiểu cho một hàm nhận 2 số và trả về 1 số
type MathOperation = (x: number, y: number) => number

const add: MathOperation = (a, b) => {
  return a + b
}

const subtract: MathOperation = (a, b) => {
  return a - b
}

console.log(`Tổng: ${add(5, 3)}`) // Output: Tổng: 8
console.log(`Hiệu: ${subtract(5, 3)}`) // Output: Hiệu: 2
```

### **4. Union & Literal Types**

- **Union Type (`|`)**: Cho phép một biến có thể là một trong nhiều kiểu dữ liệu.
- **Literal Type**: Cho phép giới hạn giá trị của một biến trong một tập hợp các giá trị cụ thể.

```jsx
// Union Type: id có thể là string hoặc number
function printId(id: string | number) {
  console.log(`Your ID is: ${id}`)
}

printId(101) // OK
printId("202") // OK

// Literal Type: alignment chỉ có thể là 'left', 'right', hoặc 'center'
type Alignment = "left" | "right" | "center"

let textAlign: Alignment = "center"
// textAlign = "justify"; // Lỗi: Type '"justify"' is not assignable to type 'Alignment'.
```

### **5. Enum (Enumeration)**

Enum là một cách để định nghĩa một tập hợp các hằng số có tên. Theo mặc định, enum sẽ gán giá trị số bắt đầu từ 0.

```jsx
enum Direction {
Up,    // 0
Down,  // 1
Left,  // 2
Right  // 3
}

enum ResponseStatus {
Success = 200,
NotFound = 404,
Error = 500
}

let move: Direction = Direction.Left;
console.log(move); // Output: 2

let status: ResponseStatus = ResponseStatus.Success;
console.log(status); // Output: 200
```

### **6. Class & Tính chất OOP**

TypeScript hỗ trợ đầy đủ lập trình hướng đối tượng (OOP) với `class` và các tính chất như kế thừa, đóng gói, đa hình.

- **`public`**: Truy cập được từ mọi nơi (mặc định).
- **`private`**: Chỉ truy cập được bên trong lớp đó.
- **`protected`**: Truy cập được bên trong lớp đó và các lớp con kế thừa từ nó.

```tsx
class Animal {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  public move(distance: number): void {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

class Dog extends Animal {
  // Kế thừa từ class Animal
  constructor(name: string) {
    super(name) // Gọi constructor của lớp cha
  }

  public bark() {
    console.log("Woof! Woof!")
  }
}

const myDog = new Dog("Buddy")
myDog.bark() // Output: Woof! Woof!
myDog.move(10) // Output: Buddy moved 10m.
// console.log(myDog.name); // Lỗi: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
```

### **7. Generic (Kiểu tổng quát)**

Generic cho phép tạo ra các thành phần (hàm, lớp, interface) có thể hoạt động với nhiều kiểu dữ liệu khác nhau mà không làm mất đi sự an toàn về kiểu.

```tsx
// Một hàm generic nhận vào một đối số và trả về chính nó
// 'T' là một biến kiểu (type variable) đại diện cho kiểu dữ liệu sẽ được truyền vào
function identity<T>(arg: T): T {
  return arg
}

let output1 = identity<string>("myString") // Kiểu của output1 là 'string'
let output2 = identity<number>(123) // Kiểu của output2 là 'number'

// Generic với mảng
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0]
}

let firstNum = getFirstElement([1, 2, 3]) // Kiểu là number
let firstStr = getFirstElement(["a", "b", "c"]) // Kiểu là string
```

### **8. Type Inference (Suy luận kiểu tự động)**

Khi bạn không khai báo kiểu rõ ràng, TypeScript sẽ cố gắng _suy luận_ kiểu dữ liệu dựa trên giá trị được gán.

```jsx
let luckyNumber = 7 // TypeScript tự suy luận kiểu là 'number'
// luckyNumber = 'seven'; // Lỗi: Type 'string' is not assignable to type 'number'.

let languages = ["JavaScript", "TypeScript", "Python"] // TypeScript suy luận kiểu là string[]
```

### **9. Type Assertion (Ép kiểu)**

Đôi khi, bạn biết rõ về kiểu của một giá trị hơn là TypeScript. Type Assertion cho phép bạn truyền tới compiler về kiểu của một biến. Có hai cú pháp: `as` và `<>` (khuyến khích dùng `as` để tránh nhầm lẫn với cú pháp JSX trong React).2

```jsx
let someValue: unknown = "this is a string";

// Dùng 'as'
let strLength: number = (someValue as string).length;

// Dùng cú pháp '<>'
let strLength2: number = (<string>someValue).length;

console.log(strLength); // Output: 16
```

### **10. Non-null Assertion Operator (`!`)**

Toán tử `!` ở cuối một biểu thức cho TypeScript biết rằng bạn chắc chắn giá trị đó không phải là `null` hay `undefined`.

```jsx
function printName(name: string | null | undefined) {
// Dùng '!' để khẳng định 'name' không null/undefined ở đây
const nameLength = name!.length;
console.log(`Độ dài tên: ${nameLength}`);
}

printName("John Doe"); // Output: Độ dài tên: 8
// printName(null); // Sẽ gây lỗi ở runtime: "TypeError: Cannot read properties of null (reading 'length')"
```
