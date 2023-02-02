// 함수 기본형
// 호이스팅 지원
function sum(target) {
    let reuslt = 0;
    for(let i = 1; i<=target; i++) {
        reuslt += i;
    }

    return reuslt;
}

// 익명 함수
// 호이스팅 불가 : 함수가 정의되기 전에 사용 못함
let sumResult = function sum(target) {
    let reuslt = 0;
    for(let i = 1; i<=target; i++) {
        reuslt += i;
    }

    return reuslt;
}

// ES6 화살표 함수
// 익명함수의 일종
// this 바인딩 관련 간단 설명
let sumResult2 = () => {
    let reuslt = 0;
    for(let i = 1; i<=target; i++) {
        reuslt += i;
    }

    return reuslt;
}

console.log(sum(10));
console.log(sum(50));

// 함수 연습문제
function bmiCalc(weight, height) {
    const metherHeight = height/100;
    const result = weight / (metherHeight * metherHeight);

    return result;
}

console.log(bmiCalc(70, 171));