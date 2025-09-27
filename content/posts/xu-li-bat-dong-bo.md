---
title: "Xử lí bất đồng bộ"
date: "2025-09-27"
summary: "Xử lí bất đồng bộ trong JS"
tags: ["JavaScript", "NodeJS"]
category: "Dev"
status: "Public"
type: "Post"
---

Trong JS các hàm sẽ không đợi nhau để trả về kết quả mà sẽ bỏ qua và chạy sự kiện phía sau và đợi các sự kiện khác phía trước phản hồi sau

### 1, Callback

```jsx
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`)
  callback()
}

doHomework("math", function () {
  alert("Finished my homework")
})
```

Sử dụng callback lồng trong hàm để chạy nhưng có thể tách callback ra một hàm riêng để có thể tường minh và dễ sửa chữa bảo trì hơn

```jsx
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`)
  callback()
}
function alertFinished() {
  alert("Finished my homework")
}
doHomework("math", alertFinished)
```

### 2, Promise

Promise là một đối tượng trong JavaScript đại diện cho một tác vụ bất đồng bộ có thể hoàn thành trong tương lai. Nó giống như một lời hứa: "Tôi hứa sẽ trả kết quả cho bạn khi tác vụ hoàn thành".

Một Promise có thể ở một trong ba trạng thái sau:

- Pending (đang chờ): trạng thái ban đầu, chưa hoàn thành hoặc bị từ chối.
- Fulfilled (hoàn thành): tác vụ đã hoàn thành thành công.
- Rejected (bị từ chối): tác vụ đã thất bại.

```jsx
// Khoi tao 1 promise

const myPromise = new Promise((resolve, reject) => {
  resolve(ket_qua)

  reject(loi)
})

// Set timeout cho promise

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true
    if (success) {
      resolve("Success!")
    } else {
      reject("Failed!")
    }
  }, 1000)
})

//Trong ví dụ này, sau 1 giây, Promise sẽ được hoàn thành với kết quả "Success!" hoặc bị từ chối với "Failed!".
```

Sau đó là xử lí kết quả với promise

Để nhận kết quả từ một Promise, bạn có thể sử dụng phương thức `.then()` và `.catch()`.

- .then(onFulfilled): được gọi khi Promise được hoàn thành.
- .catch(onRejected): được gọi khi Promise bị từ chối.

```jsx
promise
  .then((result) => {
    console.log(result) // "Success!"
  })
  .catch((error) => {
    console.error(error) // "Failed!"
  })
```

Nối chuỗi promise lại với nhau

```jsx
firstPromise()
  .then((result1) => {
    return secondPromise(result1)
  })
  .then((result2) => {
    console.log(result2)
  })
  .catch((error) => {
    console.error(error)
  })

// Trả ra kết quả nếu result 1,2 trả về dữ liệu, còn không sẽ trả ra lỗi
```

Nhưng trong code thực tế sẽ vận dụng lí thuyết của Promise để tạo ra một phương thức khác dễ sử dụng và bảo trì sửa chữa dễ dàng hơn đó là Async/await

```jsx
const promise1 = fetchData1()
const promise2 = fetchData2()

Promise.all([promise1, promise2])
  .then(([result1, result2]) => {
    console.log(result1, result2)
  })
  .catch((error) => {
    console.error(error)
  })

// Gọi đồng thời hai API để trả về dữ liệu
```

### 3, Async/await

Là một tính năng của JS giúp xử lí code bất đồng bộ trở nên “đồng bộ” hơn trong mắt các lập trình viên, như đã nói ở trên, async/await được xây dựng dựa trên promise và nó sẽ tương thích với tất cả promise dựa trên API

Cách dùng: khai báo async ở đầu các hàm để JS biết đây là một hàm xử lí bất đồng bộ và sau đó chỉ await được xử dụng trong hàm async

```jsx
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    console.log("Result:", data)
  } catch (error) {
    console.error("Err:", error)
  }
}

fetchData()
```

Async/await cũng thực hiện theo khối lệnh try/catch tức là sẽ trả kết quả nếu có dữ liệu khi gọi API còn nếu một trong các API nằm trong try bị lỗi thì nó sẽ nhảy sang catch và trả về lỗi, điều này rất dễ để coder có thể phát hiện lỗi và sửa chữa

Note: Tuy nhiên không phải lúc nào async/await cũng hoàn hảo đôi lúc những API cần gọi đồng thời với nhau thì nó sẽ làm chậm đáng kể vì phải chờ đợi API đầu tiên trả về rồi lần lượt, như thế sẽ rất mất thời gian- lúc này promise.all sẽ phát huy tác dụng, chúng ta phải linh hoạt khi sử dụng Promise và Async/await
