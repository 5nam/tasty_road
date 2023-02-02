/*
동기/비동기 방식의 이해
동기 : 코드 한줄, 한줄 실행이 끝난 뒤 다음 코드로 넘어가는 처리 방식
비동기 : 코드 실행 후, 완료 여부와 관계없이 다음 코드로 넘어가는 처리 방식
-> 비동기 방식이 훨씬 효율적임
*/

setTimeout(() => {
    console.log(10);
}, 2000); // 2초 뒤에 전달된 함수를 실행해줘

// 2,3등이 동시에 나타남
// 1
console.log('1등!');
// 2
setTimeout(function() {
	console.log('2등!');
}, 2000);
// 3
setTimeout(function() {
	console.log('3등!');
}, 2000);

/* 
코드 실행순서가 중요한 경우에는 비동기를 동기화해줘야 함. 이걸 동기화라고도 하고 비동기 처리라고도 함
*/

/*
JS 비동기 처리
1. 콜백함수
2. promise 객체
3. async, await
*/

// 콜백함수 : 가독성 너무 안좋음
// 1
console.log("1등!");
// 2
setTimeout(function () {
  console.log("2등!");
  // 3
  setTimeout(function() {
	console.log('3등!');
}, 2000);
}, 2000);

// promise 객체
/*
`promise의 상태`

promise는 총 3가지의 상태값이 존재합니다.

1. 대기(pending): promise 객체를 새로 생성한 상태. 대기
2. 이행(fulfiled): `resolove` 가 실행된 상태. 비동기 로직이 완료된 상태
3. 거부(rejected): `reject`가 실행된 상태. 비동기 로직에서 에러가 난 경우
*/
const hi = new Promise((resolve, reject) => {
    // resolve("good"); -> 이게 호출이 되면, 객체 아래 있는 then 객체 실행
    reject("fail"); // 이게 호출이 되면, 객체 아래 있는 catch 객체 실행
});
  
hi.then((res) => console.log(res)).catch((err) => console.log(err));

const helloPromise = new Promise((resolve, reject) => {
    // 생성 자체는 pending
    let isSuccess = true;
  
    if (!isSuccess) {
      reject(false); // catch 호출
      return;
    }
  
    console.log("세미성공");
    setTimeout(() => {
      resolve(); // then 호출
    }, 2000);
});
  
helloPromise
    .then((res) => {
      console.log("성공");
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 2000);
      });
    })
    .then((res) => {
      console.log("매우 성공");
    })
    .catch((err) => {
      console.log(err);
    });

// async, await
// getResult() 를 비동기처리해서 하겠다는 의미
async function asyncFunction() {
    console.log(1);
    const result = await getResult();
    console.log(result);
}
  
function getResult() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(2);
      }, 2000);
    });
}
  
asyncFunction();

// 예시 2

async function asyncFunction2() {
    console.log("1등임");
    await second();
    await third();
}
  
function second() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("2등임");
        resolve(); // 이게 있어야 이 코드가 끝났음을 알 수 있음
      }, 2000);
    });
}
  
function third() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("3등임");
        resolve();
      }, 2000);
    });
}
   
asyncFunction2();

// 예외처리
async function asyncFunction3() {
    try {
      console.log(1);
      const result = await getResult2();
      console.log(result);
      console.log(3);
    } catch (err) {
      console.log(err);
    }
}
  
function getResult2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("에러발생 예시")); // 새로운 오류를 생성하는 것
      }, 500);
    });
}
  
asyncFunction3();