var num = 1;
var num = 10;

console.log(num);

let num2 = 2;
num2 = 20;

const num3 = 3;

// 얘네들의 차이는 기본적으로 재할당과 재선언임
// var 는 다시 num 을 선언하고 10을 할당해도 상관 없음. 즉, 재할당/재선언이 모두 가능함!
// let, const 는 재선언이 불가함. const 는 재선언이 불가함.
// 정리하면, var : 재선언, 재할당 모두 가능 | let : 재선언 불가능, 재할당 가능 | const : 재선언, 재할당 모두 불가능

// 문자형 자료 선언

let string = "안녕";

// 논리형 자료

let bool = true;
let t = 100 > 10;

console.log(t);