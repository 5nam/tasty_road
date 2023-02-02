/*
자주 사용되는 이벤트
load : HTML, CSS 가 모두 로드 완료되었을 때 발생
keydown, keyup : 키를 누룰 때, 키에서 손을 뗄 때 발생
change : 변동이 있을 때 발생 (input) : 자기소개서, 이메일 입력 등 글자수 체크 형식 체크용
click : 클릭했을 때 발생 : 강의에서는 많이 사용할 듯
focus : 포커스를 얻을 때 발생 (input..) : 커서가 깜빡이는 것 같은 효과
*/

const pTag = document.querySelector("p");
// 여기서 항상 이벤트 핸들러(changeText)를 전달할 때는 함수를 호출하는 changeText() 형식으로 하는 것이 아니라 객체 자체를 넘겨줘야 하는 것!
pTag.addEventListener("click", changeText);

// 여기서 event 매개변수는 그냥 자바의 이벤트 처리 방식임 없어도 똑같이 돌아감. 이벤트의 다양한 정보를 담고 있음
// log 로 찍어보면 정보를 볼 수 있는데, 여기서 많이 확인해보는게 target, type 임. target 은 이벤트 대상이고, type 은 이벤트 타입(click, focus ..)을 뜻함.
function changeText(event) {
    console.log(event);
    event.target.innerHTML = "문자열의 내용이 바뀌었습니다!";
}

// 메소드에 이벤트 리스너를 전달하는 방법
const showBtn = document.getElementById("btn"); // 아이디가 "btn"인 요소를 선택함.

showBtn.addEventListener("click", function () {
	document.getElementById("text").innerHTML = "짜잔~!! 텍스트가 나타났어요!!";
}); // 선택한 요소에 click 이벤트 리스너를 등록함.