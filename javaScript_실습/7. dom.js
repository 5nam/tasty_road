// 엘리먼트 선택 예제
 
// 가장 많이 사용되므로 이거 하나는 꼭 기억하기!
// div 중 welcome 클래스인 요소 하나 반환, 해당 선택자로 선택되는 요소를 선택함.
console.log(document.querySelector("div.welcome"));
// div 인 요소들 NodeList 타입의 배열로 반환, 해당 선택자로 선택되는 요소를 모두 선택함.
console.log(document.querySelectorAll("div"));
// HTMLCollection 유사 배열 타입으로 반환, 해당 태그 이름의 요소를 모두 선택함.
console.log(document.getElementsByTagName("div"));
/*
HTMLCollection VS NodeList
이는 Live 하냐 Static 하냐의 차이.
HTMLCollection 의 중요한 특징은 실시간으로 업데이트되는 라이브(Live) 콜렉션이라는 점이다.
만약, document.getElementsByClassName('hyunsang'); 로 얻은 콜렉션이 있다고 했을 때,
hyunsang 이라는 클래스네임을 가진 엘리먼트 중 하나를 pop 시키면 즉시 콜렉션에 반영된다. 이 과정에서 인덱스가 달리지게 된다.
NodeList 는 정적 콜렉션으로 DOM 의 변경 사항이 실시간으로 반영되지 않는다.
링크 : https://tillog.netlify.app/posts/htmlcollection-nodelist
*/
// 아이디로 찾아서 요소 하나를 선택 : 궁금증? 그럼 맨 처음 발견되는 것을 찾는 건가?
// 찾아진 맨 처음 요소를 반환
console.log(document.getElementById("hi"));
// 해당 클래스에 속한 요소를 모두 선택함.
console.log(document.getElementsByClassName("welcome"));

// HTML 요소 Read, Update 를 위한 속성
const divTag = document.querySelector("div");

console.log(divTag);

divTag.style.color = "red";

// 중간과제
const h1Tag = document.querySelector("p");

h1Tag.innerText = "안녕하세요.";
h1Tag.style.fontSize = "30px";

/*
innerText VS innerHTML
입력된 속성값을 text 로 인식하는냐, HTML 로 인식하는냐의 차이
*/

// 중첩된 태그에서 선택 : HTML 은 태그의 연속임, 태그안에 또 태그가 있는 형태, 관계를 기반으로 하는 것
const container = document.querySelector(".container");
console.log(container);
// 부모 태그
console.log(container.parentElement);
// 자식 태그
console.log(container.children);
// 형제 태그
console.log(container.nextElementSibling);

// 중간 실습
console.log(container.children[1].children[1]);

// 태그 추가