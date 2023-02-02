// 새로운 데이터 타입을 배울 때 CRUD 만 다 배웠다고 하면 어느 정도는 알았다고 할 수 있음
// 생성, 조회, 수정, 삭제

// 배열 Create
const arr = [1,2,3,4];

// 배열 read
console.log(arr[1]);
console.log(arr);
console.log(arr.slice(1,3));

// 배열 update
arr[0] = 100;
console.log(arr);

// 배열 delete
arr.splice(0, 1);
console.log(arr);

// 배열 연습 문제
// 1.
const nameList = ["짱구", "철수"];
// 2.
nameList.push("훈이");
console.log(nameList);
// 3.
nameList[1] = "유리";
console.log(nameList);
//4.
nameList.splice(0, 1);
console.log(nameList);

// 객체

// 객체 Create
let userInfo = {
    email: "dummy@dummy.com",
    password: "a1234"
}

// 객체 read
console.log(userInfo.email);
console.log(userInfo.password);

// 객체 update
userInfo.email = "updated";
console.log(userInfo.email);

// 객체 delete
delete userInfo.email;
console.log(userInfo);