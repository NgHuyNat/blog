---
title: "OOP Javascript"
date: "2025-09-27"
summary: "Basic OOP Javascript"
tags: ["Javascript", "OOP"]
category: "Tutorial"
status: "Public"
type: "Dev"
---

## I, OOP là gì

OOP ( Viết tắt của Object Oriented Progamming ) - Lập trình hướng đối tượng là một phương pháp lập trình dựa trên khái niệm lớp và đối tượng. OOP tập trung hơn vào cái đối tượng hơn là khai thác logic để thao tác chúng, giúp code dẽ quản lý, tái sử dụng được và dễ bảo trì

OOP là lập trình hướng đối tượng gồm 4 thuộc tính là

### 1, Tính đóng gói

```java
public class Person {
  private String name; // Ẩn thuộc tính name
  private int age;     // Ẩn thuộc tính age

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  // Phương thức công khai để lấy giá trị
  public String getName() {
    return name;
  }

  public int getAge() {
    return age;
  }

  // Phương thức công khai để thay đổi giá trị
  public void setAge(int age) {
    if (age >= 0) {
      this.age = age;
    }
  }
}

```

- Tính đóng gói không cho truy cập vào và thay đổi từ bên ngoài lớp giúp bảo vệ tính toàn vẹn dữ liệu
- Các thuộc tính thường được khai báo là **private** hoặc **protected** để không bị truy cập trực tiếp từ bên ngoài. Thay vào đó lớp sẽ cung cấp các phương thức công khai để truy xuất hoặc cập nhật các thuộc tính đó (getter/setter).
- Ở ví dụ trên, các thuộc tính **`name`** và **`age`** không thể truy cập trực tiếp từ bên ngoài mà phải thông qua các phương thức **`getName()`**, **`getAge()`**, và **`setAge()`**.

```jsx
// Lớp trừu tượng (thể hiện tính trừu tượng)
class Vehicle {
constructor(name) {
if (this.constructor === Vehicle) {
throw new Error("Không thể tạo đối tượng trực tiếp từ lớp trừu tượng Vehicle");
}
[this.name](http://this.name/) = name;
}

// Phương thức trừu tượng
move() {
throw new Error("Phương thức move() phải được override ở lớp con");
}
}

// Lớp con kế thừa Vehicle (kế thừa)
class Car extends Vehicle {
constructor(name, brand) {
super(name);
this.brand = brand;
}

// Ghi đè phương thức move (đa hình)
move() {
console.log(`${this.brand} ${this.name} đang chạy trên đường.`);
}
}

class Boat extends Vehicle {
constructor(name) {
super(name);
}

// Ghi đè phương thức move (đa hình)
move() {
console.log(`${this.name} đang di chuyển trên mặt nước.`);
}
}

// Tạo các đối tượng
const car1 = new Car("Sedan", "Toyota");
const boat1 = new Boat("Thuyền buồm");

car1.move();  // Toyota Sedan đang chạy trên đường.
boat1.move(); // Thuyền buồm đang di chuyển trên mặt nước.
```

### 2, Tính kế thừa

- Tính kế thừa là khả năng một lớp (class con) có thể kế thừa các thuộc tính và phương thức từ một lớp khác (class cha). Lớp con có thể sử dụng lại, bổ sung hoặc ghi đè các thuộc tính/method của lớp cha mà không cần phải định nghĩa lại.

Ví dụ :

**`Car`** và **`Boat`** kế thừa **`Vehicle`** (tính kế thừa).

### 3, Tính đa hình

- Tính đa hình cho phép các đối tượng thuộc các lớp khác nhau có thể được sử dụng thông qua cùng một giao diện chung hoặc lớp cha, nhưng tương tác thực tế có thể khác nhau tùy thuộc vào lớp cụ thể của đối tượng đó.
- **Đa hình tại thời gian biên dịch (Overloading):** Phương thức có cùng tên nhưng khác tham số. (Tùy thuộc ngôn ngữ hỗ trợ.)
- **Đa hình tại thời gian chạy (Overriding):** Lớp con định nghĩa lại (ghi đè) phương thức của lớp cha để thay đổi hành vi riêng.

Ví dụ :

**`Car`** và **`Boat`** ghi đè phương thức **`move()`** thành các hành vi riêng (tính đa hình).

### 4, Tính trừu tượng

- Tính trừu tượng là quá trình chỉ để lộ ra những tính năng cần thiết của một đối tượng và ẩn đi những chi tiết nội bộ không cần thiết. Trong OOP, thông thường sử dụng các class trừu tượng hoặc interface để định nghĩa giao diện làm việc chung, còn chi tiết cài đặt sẽ do lớp con thực hiện.

Ví dụ :

**`Vehicle`** là lớp trừu tượng (không thể tạo đối tượng trực tiếp), cung cấp giao diện **`move()`** chưa định nghĩa (bắt buộc lớp con ghi đè).

_Hiện nay OOP được áp dụng vào rất nhiều các ngôn ngữ trong đó có JS và đặc biệt hơn là cho Design Pattern để quản lí dự án để dễ bảo trì và mở rộng sau này_

## II, Class, Constructor, Instance, Properties, Methods, Getter/ setter

- Có thể nói rằng Class là khai báo ra một khuôn mẫu, lớp bọc cho các object, constructor để khai báo các object mới dựa trên class hoặc contructor function( khi một đối tượng được tạo bằng `new` thì constructor sẽ được gọi và gán giá trị đây chính là instance ), properties là thuộc tính, tạo hình cho class, còn methods là cách truy cập vào đối tượng qua class hoặc instance function
- Getter và setter dùng để lấy giá trị và gán giá trị cho các thuộc tính của đối tượng một cách an toàn và có kiểm soát

### 1. Khai báo

```
class ClassName {
  constructor() { ... }
  method_1() { ... } // method_1(x) {...} thêm tham số cho method
  method_2() { ... }
  method_3() { ... }
}
```

Class được khởi tạo phải có constructor, có thể thêm các method nếu cần thiết và kèm với đó là tham số( parameters ) cho method đó tùy vào trường hợp sử dụng, như ví dụ dưới

```jsx
class Car {
  constructor(name, year) {
    this.name = name
    this.year = year
  }
  age(x) {
    return x - this.year
  }
}
/* Ở đây chúng ta có thể truyền vào tham số cho age(method) dể lấy ra được
tuổi đời của chiếc xe
*/

const date = new Date()
let year = date.getFullYear()

const myCar = new Car("Xe1", 2014)
console.log(myCar.age(year))
```

### 2, Kế thừa class

```jsx
class Car {
  constructor(brand) {
    this.carname = brand
  }
  present() {
    return "I have a " + this.carname
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand)
    this.model = mod
  }
  show() {
    return this.present() + ", it is a " + this.model
  }
}

let myCar = new Model("Ford", "Mustang")

console.log(myCar.show()) // Output: I have a Ford, it is a Mustang
```

Khi kế thừa class bắt buộc phải dùng super để truy cập vào thuộc tính và phương thức của lớp cha

```jsx
// Getter/Setter
class Car {
  constructor(brand, model) {
    this.carname = brand;
    this.carmodel = model;
  }
  get cnam() {
    return this.carname;
  }
  set cnam(x) {
    this.carname = x;
  }
  get cmode() {
    return "hello"+ this.carmodel;
  }
  set cmode(x) {
    this.carmodel = x;
  }
}

const myCar = new Car("Ford", "M");

console.log(myCar.cnam) // Ford
myCar.cnam= "Toyota"; // Setter
console.log(myCar) // Car { carname : 'Ford' }
console.log(myCar.cnam); // Toyota - Getter
console.log(myCar.cmode);Ford // helloM - Getter

/* Getter và setter thực hiện lấy giá trị và gán giá trị cho brand và model
qua cách tạo mới new Car gán this.carname = 'Ford' và this.carmodel = 'M'
Hàm setter chỉ được sử dụng khi gán giá trị mới
*/

/* Theo quy ước các lập trình viên hay đặt thì sẽ đặt dấu _ trước tên thuộc tính
và đặt tránh với tên của phương thức getter/setter để tránh rơi vào vòng lặp
vô hạn và gây ra lỗi  */
get carname(){
	return this._carname;
}
```

### 3, Constructor và constructor function

3.1, Constructor

Được lồng vào bên trong class để khai báo các obj mới dựa trên class và trong 1 class chỉ được có 1 constructor duy nhất

```jsx
class Car {
  constructor(brand) {
    this._carname = brand
  }
}

// Ví dụ đây là 1 constructor trong class
```

3.2, Constructor function

Được sử dụng bên ngoài cùng cấp và giống như một class, tạo mới một đối tượng cũng dùng lệnh new

```jsx
function Person(
  first = "Unknown",
  last = "Unknown",
  age = 0,
  eyecolor = "Brown"
) {
  this.firstName = first
  this.lastName = last
  this.age = age
  this.eyeColor = eyecolor
  this.nationality = "Vietnamese"
}

const p1 = new Person() // Tất cả lấy mặc định
const p2 = new Person("Nguyen", "Tan") // Còn lại lấy mặc định
```

### 4, Instance

4.1, Khởi tạo bằng toán tử new

Dùng các phương thức hoặc tên class đặt cùng với new để tạo ra 1 instance

Tuy nhiên không phải phương thức nào đặt cùng new cũng hợp lệ ví dụ như Symbol

```jsx
new Symbol()
//Uncaught TypeError: Symbol is not a constructor...
Symbol("foo")
//Symbol(foo)
```

Hoặc có những đối tượng không cần sử dụng new cũng cho ra kết quả tương tự như Function,

Array, Error, RexExp(RegExp (viết tắt của Regular Expression, hay biểu thức chính quy) là một công cụ dùng để mô tả các mẫu (pattern) trong chuỗi ký tự, giúp tìm kiếm, kiểm tra, phân tích, và thay thế các đoạn văn bản theo các quy tắc cú pháp nhất định)

```jsx
Array(1, 2, 3)
//[1, 2, 3]
new Array(1, 2, 3)
//[1, 2, 3]
```

4.2, Khởi tạo bằng Reflect

```jsx
*Reflect*.construct(target, [argumentsList], newTarget)
```

target và newTarget đều có constructor riêng của nó

argumentsList là danh sách các đối số truyền vào

```jsx
class A {
  constructor() {
    this.message = function () {
      console.log("message from A")
    }
  }
}
class B {
  constructor() {}
  message() {
    console.log("message from B")
  }
  data() {
    console.log("data from B")
  }
}
obj = Reflect.construct(A, [], B)

console.log(obj.message())
// message from A
// Do constructor của A là một function chuyên biệt nhận message riêng của A
/* Còn nếu message không nằm trong constuctor mà nằm bên ngoài cùng cấp
thì nó sẽ bị thay bởi B.prototype 
Lúc đó output sẽ là message from BB
*/
console.log(obj.data())
// data from B
console.log(obj instanceof B)
// true
```

4.3, Khởi tạo bằng Object.create

```jsx
class Car {
  constructor(brand) {
    this.brand = brand
  }
}

obj = Object.create(new Car("Ford"), {
  data: {
    value: function () {
      return "hello " + this.brand
    },
  },
})

console.log(obj.data())
// hello Ford
```

### 5, Properties

```jsx
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
}
// Ví dụ thuộc tính của person là firstName, ....
// Truy cập vào thuộc tính thông qua cú pháp
let fname = person.firstName
```

### 7, Methods

```jsx
const person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function () {
    return this.firstName + " " + this.lastName
  },
}
// fullName là một method sử dụng thuộc tính của person

console.log(person.fullName()) // John Doe
console.log(person.fullName) // function() { return this.firstName + " " + this.lastName; }

// Chúng ta có thể thêm method bên ngoài dựa trên thuộc tính obj có sẵn

person.name = function () {
  return this.firstName
}

console.log("My first name is: " + person.name())
// My first name is: John
```
