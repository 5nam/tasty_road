let i = 1;

while(i <= 20) {
    console.log("안녕");
    i++;
}

// while 문 중간 실습
let j = 1;
while(j <= 50) {
    if(j%5 === 0) {
        console.log(j);
    }
    j++;
}

// for문 중간 실습
for(let i = 1; i <= 50; i++) {
    if(i%5 === 0) {
        console.log(i);
    }
}

// 컨테이너와 함께.. for-in 문 & for-of 문
const arr = [5,6,7,8];

// 반복을 돌때마다 arr 인덱스를 index 에 대입
for (let index in arr) {
	console.log(arr[index]);
}

// 반복을 돌 때마다 arr 값 자체를 item 에 대입
// 객체 지원 X
for (let item of arr) {
	console.log(item);
}

const jsonArr = {email: "dummy", password: "a123"};

// 반복을 돌 때마다 키값을 차례대로 변수 key 에 대입할 수 있음
for (let key in jsonArr) {
	console.log(jsonArr[key]);
}

// 반복문 제어, break, continue
// break 예제
// 1부터 10까지 출력하는 반복문에서 i가 5이상이 되면 반복문을 빠져나오게 만들기
for(let i = 1; i <=10; i++){
	if(i>=5){
		break;
	}
	console.log(i);
}
// continue 예제
// 1부터 10까지 출력하는 반복문에서 5는 건너뛰고 출력하게 만들기
for(let i = 1; i <=10; i++){
	if(i==5){
		continue;
	}
	console.log(i);
}