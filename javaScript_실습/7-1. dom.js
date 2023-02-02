// 태그 추가
// div.inner를 선택
let inner = document.querySelector(".inner");
// <div>태그 생성
let element = document.createElement("div");
// text 노드 hello 생성
let hello = document.createTextNode("hello");
// <div>hello</div>로 만들기
element.appendChild(hello);
// div.inner에 element 추가
inner.appendChild(element);

// 위처럼 노드를 일일이 생성해서 하는 방식은 다소 번거로울 수 있음. 좀 더 간편한 방식이 있음!
// ES6 템플릿 리터럴
const productsData = {title: "감자칩", weight: 300};

const app = document.querySelector("#app");

app.innerHTML = `<div class="item">상품명: ${productsData.title},
무게 ${productsData.weight}gv</div>`;
// 템플릿 리터럴과 innerHTML 속성을 사용

// 연습 문제
const productsDatas = [
    { title: "감자칩", weight: 300 },
    { title: "칙촉", weight: 100 },
    { title: "고구마칩", weight: 300 },
    { title: "오잉", weight: 50 },
];

const app2 = document.querySelector("#app2");
// 여기서 '+='로 써줘야함. 왜냐면 '='는 추가하면서 변경도 되기 때문(리셋과 비슷한 개념)
for(let data of productsDatas) {
    app2.innerHTML += `<div class="item">상품명: ${data.title},
    무게 ${data.weight}g</div>`;
}