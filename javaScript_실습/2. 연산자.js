// 비교 연산자
console.log(1 === 1);
console.log(1 === "1");

console.log(1 == 1);
console.log(1 == "1");

// '===' 연산자는 타입까지 비교하는 것. '==' 는 데이터 타입에 상관없이 값만 비교함

// 논리연산자
let option1 = 10 > 1;
let option2 = 2 == 3;

console.log(option1 || option2); // true
console.log(option1 && option2); // false
console.log(!option1); // false

// 중간정리 실습
const height = 171;
const right_weight = (height - 100) * 0.9;

console.log("당신의 키는 ", height, "cm이며 적정체중은 ", right_weight, "입니다.");
// console.log('당신의 키는 ${height}cm이며 적정체중은 ${right_weight}입니다.');