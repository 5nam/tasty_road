const a = 0;

if(a) {
    console.log("a는 10보다 작다.");
}

// 0 이라는 숫자는 false 를 의미하므로 아무것도 출력하지 않음

const b = 10;
if(b < 10) {
    console.log("a는 10보다 작다.");
} else if (b == 10) {
    console.log("a는 10이다.");
}

// 중간정리 실습
const num = 11;
if(num%2 === 0) {
    console.log("짝수");
} else {
    console.log("홀수");
}