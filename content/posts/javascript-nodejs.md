---
title: "JavaScript & NodeJS"
date: "2025-09-27"
summary: ""
tags: ["JavaScript", "NodeJS"]
category: "Dev"
status: "Public"
type: "Post"
---

### I, Khai báo biến và phân loại đặc điểm về các biến trong JS

Trong JS có 3 từ khóa để khai báo biến là `var`, `let`, `const` nhưng chúng có những đặc điểm khác nhau như sau

1, Phạm vi ( Scope )

`var` có phạm vi toàn cục ( global scope ) và phạm vi hàm ( function scope )

`let` và `const` có phạm vi khối ( block scope )

```jsx
if (true) {
  var x = 10
  let y = 20
  const z = 30
}
console.log(x) // 10
console.log(y) // ReferenceError
console.log(z) // ReferenceError
```

2, Hoisting

- `var` được hoisted (lên đầu phạm vi) và được khởi tạo với giá trị `undefined`
  `console.log(a); // undefined
var a = 5;`
- `let` và `const` cũng được hoisted nhưng không được khởi tạo, nó tạo ra “`temporal dead zone`”

**Temporal dead zone**: là khoảng thời gian mà biến được khai báo nhưng chưa được khởi tạo, trong thời gian này, nếu truy cập biến sẽ gây ra lỗi `ReferenceError`. Khi chương trình thực thi đến dòng khai báo biến, biến sẽ được khởi tạo và có thể truy cập.

```jsx
function example() {
  console.log(myVar) // ReferenceError: Cannot access 'myVar' before initialization
  let myVar = 10
  console.log(myVar) // 10
}
example()
```

3, Gán lại giá trị

- var và let có khả năng gán lại giá trị
- const không có khả năng gán lại giá trị

```jsx
;`var a = 1;
a = 2; // Hợp lệ``let b = 3;
b = 4; // Hợp lệ``const c = 5;
c = 6; // TypeError`
```

4, Khai báo lại

- `var` có thể khai báo lại trong cùng một phạm vi
- `let` và `const` không thể khai báo lại trong cùng một phạm vi

```jsx
;`var x = 1;
var x = 2; // Hợp lệ``let y = 3;
let y = 4; // SyntaxError``const z = 5;
const z = 6; // SyntaxError`
```

5, Liên kết với đối tượng toàn cục

5.1, Sử dụng đối tượng toàn cục

- Trong trình duyệt:Sử dụng `window`. Mọi biến, hàm, và đối tượng toàn cục đều được đặt trên đối tượng `window`.
- Trong Node.js:Sử dụng `global`. Các hàm, biến, module có thể được truy cập từ mọi module mà không cần import hay khai báo.
- Sử dụng `globalThis`:Đây là cách mới và được khuyến khích sử dụng để truy cập đối tượng toàn cục, vì nó tương thích với hầu hết các môi trường chạy JavaScript.

Lưu ý về `this`

- Trong phạm vi toàn cục, `this` tham chiếu đến `window` (trình duyệt) hoặc `global` (Node.js).
- Tuy nhiên, trong chế độ nghiêm ngặt (`strict mode`), `this` sẽ là `undefined` trong các hàm toàn cục, thay vì tham chiếu đến đối tượng toàn cục.

  5.2, Khai báo biến toàn cục

```jsx
;`var globalVar = 'Tôi là biến toàn cục';
console.log(window.globalVar); // 'Tôi là biến toàn cục'``let globalLet = 'Tôi không phải biến toàn cục';
console.log(window.globalLet); // undefined`
```

Bạn có thể khai báo biến toàn cục bằng cách định nghĩa biến bên ngoài bất kỳ hàm hoặc khối mã nào. JavaScript sẽ tự động coi các biến được khai báo mà không có từ khóa `var`, `let`, hay `const` là biến toàn cục

```jsx
;`// Trong trình duyệt
console.log(window.location.href); // Tham chiếu đến đối tượng toàn cục window``// Trong Node.js
console.log(global.process.version); // Tham chiếu đến đối tượng toàn cục global``// Sử dụng globalThis
console.log(globalThis.navigator.userAgent); // Hoạt động trên nhiều môi trường`
```

### II, Các kiểu dữ liệu

Với dynamic trong JS tự xác định kiểu dữ liệu cho biến đó dựa trên giá trị của nó gây ra tình trạng lỏng lẻo, không kiểm soát chặt được dữ liệu đầu vào

```jsx
// Dynamic typing (trong JavaScript)
let a = 42 // a là một số nguyên
const b = "Hello" // b là một chuỗi
var c = true // c là một boolean
```

Với static typing trong Java nó yêu cầu phải xác định được kiểu dữ liệu trước khi nhập giá trị của nó để gán vào biến

```jsx
// Static typing (trong java)
int a = 42; // a là một số nguyên
String b = 'Hello'; // b là một chuỗi
boolean c = true; // c là một boolean
```

1, Number - cả số nguyên và số thực

2, String - chuỗi kí tự

3, Boolean - true or false

4, Undefined - biến khai báo nhưng chưa được gán giá trị

5, Null - giá trị không tồn tại hoặc không hợp lệ

6, Symbol(ES6) - đại diện cho một giá trị không thể thay đổi

```jsx
const mySymbol = Symbol("key")
const obj = {
  [mySymbol]: "Giá trị của Symbol",
}
```

7, BigInt - kiểu số nguyên lớn vượt quá giới hạn của kiểu Number

8, Object - kiểu dữ liệu phức tạp biểu diễn dưới dạng key-value

```jsx
let person = {
  name: "Nguyễn Văn A",
  age: 30,
  isStudent: false,
}
```

9, Array - mảng

10, Function - là một kiểu dữ liệu trong JS

```jsx
function greet(name) {
  console.log("Xin chào, " + name + "!")
}
```

11, Map/Set

11.1, Map

Map là tập hợp của các cặp key-value có thể là bất cứ kiểu dữ liệu nào

```jsx
// Khởi tạo một map
const map1 = new Map();
const map2 = new Map([
  ['firstName', 'A'],
  ['lastName', 'B'],
  ['occupation', 'C'],
])
// Hoặc tạo một map từ một obj
const obj1 = {
  firstName: 'A',
  lastName: 'B',
  occupation: 'C',
}
const map3 = new Map(Object.entries(obj1))

// Biến một map thành obj hoặc arr
const obj = Object.fromEntries(map)
=> {firstName: "A", lastName: "B", occupation: "C"}

const arr = Array.from(map)
=> kết quả :
[ ['firstName', 'A'],
  ['lastName', 'B']
  ['occupation', 'C'] ]

// Thêm giá trị vào map
map.set('key1','value1');
map.set('key2','value2');

// Lấy giá trị trong map
map.get('key1') ==> 'value1'

// Kiểm tra key có tồn tại trong map không
map.has('key1') ==> true or false

// Xóa cặp giá trị key-value ra khỏi map
map.delete('key1')

// Xóa tất cả key-value
map.clear()

// Kiểm tra số lượng cặp giá trị trong map
map.size()

```

Keys trong Map là một giá trị duy nhất và có thể dùng được nhiều kiểu dữ liệu cho key nhưng không được trùng lặp vào một kiểu dữ liệu nào đó, nếu trong trường hợp có hai key cùng kiểu dữ liệu trùng lặp nhau thì value của key sau cùng sẽ ghi đè lên tất cả các key trước đó

```jsx
const map = new Map()

map.set('1', 'String one')
map.set(1, 'This will be overwritten')
map.set(1, 'Number one')
map.set(true, 'A Boolean')

0: {"1" => "String one"}
1: {1 => "Number one"}
2: {true => "A Boolean"}
```

11.2, Set

Set tương tự như Map nhưng nó sẽ giống array hơn trong khi Map giống obj

```jsx
// Giống ở bước khởi tạo
const set = new Set()

// Khác ở bước thêm dữ liệu vào set
set.add('arr1') thay vì map.set(key, value) như Map
```

### III, Vòng lặp

1, For loop

Vòng lặp for(khởi tạo biến đếm, kiểm tra điều kiện, tăng giảm biến đếm)

```jsx
for (var i = 0; i < 10; i++) {
  console.log(i)
}
```

Ví dụ: Với điều kiện khởi tạo chạy từ 0 đến 9 biến chạy tăng dần

In ra: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

2, While loop

Thực hiện vòng lặp khi điều kiện là đúng

```jsx
var i = 0
while (i < 10) {
  console.log(i)
  i++
}
```

Khi điều kiện i < 10 thỏa mãn thì sẽ in ra i , i tăng dần in ra: 0,1,2…., 9

3, Do - While loop

Chạy ít nhất một lần do nếu vẫn thỏa mãn while thì chạy tiếp do

```jsx
var i = 10
do {
  console.log(i)
  i++
} while (i > 10 && i < 12)
```

Ví dụ: in ra i = 10, sau đó thì i tăng lên thành 11 và vẫn thỏa mãn điều kiện của while nên được in ra thêm một lần nữa là 11

4, forEach()

forEach sẽ lặp từng phần tử trong arrayName theo thứ tự index trong mảng forEach sẽ không thực thi cho phần tử không có giá trị

```jsx
var arrayName = [arr1, arr2, ...]

arrayName.forEach(function(currentValue, index, array){
    function body
})

// currentValue: Giá trị đang được vòng lặp xử lý
// index: Chí số của giá trị (currentValue) trong mảng
// array: toàn bộ array đang gọi đến forEach
```

Ví dụ trực quan

```jsx
var arr=[10, 20, "hi", ,{}];

arr.forEach(function(item, index){
    console.log(' arr['+index+'] is '+ item);
});

// Output
 arr[0] is 10
 arr[1] is 20
 arr[2] is hi
 arr[4] is [object Object]
```

4, Map()

Cũng giống như forEach() nhưng Map() tạo ra một mảng mới chứ không phải thực thi một mảng có sẵn giống như forEach()

```jsx
var newArray = oldArray.map(function (currentValue, index, array) {
  //Return element for the newArray
})
```

5, for - in

For ... in mục đích chủ yếu được dùng để loop trong một object chứ không phải array . Số lượng vòng lặp sẽ tương ứng với số lượng thuộc tính của object

```jsx
var obj = { a: 1, b: 2, c: 3 }
for (var prop in obj) {
  console.log("obj." + prop + "=" + obj[prop])
}

obj.a = 1
obj.b = 2
obj.c = 3
```

6, for - of

Vòng lặp được ra mắt trong phiên bản ES6. Hàm này có thể sử dụng để duyệt phần lớn các đối tượng từ Array, String, Map, WeakMap, Set ,…

```jsx
var str = "paul"
for (var value of str) {
  console.log(value)
}

// Output
;("p")
;("a")
;("u")
;("l")
```

Ví dụ khác

```jsx
let itobj = new Map([
  ["x", 0],
  ["y", 1],
  ["z", 2],
])

for (let kv of itobj) {
  console.log(kv)
}
// ['x', 0]
// ['y', 1]
// ['z', 2]

for (let [key, value] of itobj) {
  console.log(value)
}

//0
//1
//2
```

### IV, Function

Function is a block command and you can reuse it for many task specific. Function help create structure program, separate different code and reuse it :::::)))))

1, Phân loại hàm

```jsx
// Function không có tham số
function khongthamso() {
  console.log("Function không có tham số")
}

// Function có tham số
function cothamso(a, b) {
  return a + b
}

// Function có tham số mặc định
function thamsoMacDinh(a = 1, b = 2) {
  return a * b
}

// Function khong trả về giá trị
function khongTraVe() {
  console.log("Function này không trả về giá trị")
}
```

2, Lưu ý

Các biến bên trong function không thể bị truy cập từ bên ngoài nhưng function có thể truy cập được các biến bên ngoài và trong cùng phạm vi được định nghĩa
