# tasty_road

## 기능 구현

## 프로젝트 진행 중 질문들 정리
1. 자바스크립의 함수 정의에 대한 방법이 왜 3가지나 될까? 그 뒤에 호출 방식이 다른가?
2. 동기/비동기를 적용하는 구체적인 예시는?

## 오류 발생
1. Uncaught SyntaxError: Cannot use import statement outside a module
2. Uncaught TypeError: Cannot read properties of undefined (reading 'Geocoder' at script.js
    - kakaomap API 중 주소-좌표 변환하는 기능을 추가하고자 했으니 해당 오류 발생
    - 그래서 아래의 코드를 추가하여 해결했으나,
    ~~~
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7c2d63c66741e5ea675f9ff9e410d271&libraries=services"></script>
    ~~~
    : 위의 오류 발생이 이유는 라이브러리 사용시에는 html 에서 지도를 띄울 때, libraries 도 같이 연결해주어야 했는데 그 코드를 적지 않아서 오류가 났다. '&libraries=services' 이부분이다.
    : 오류 해결 출처 (https://m.blog.naver.com/mikong22/221798570191)
    - 새로운 오류 발생 : Uncaught TypeError: Cannot read properties of undefined (reading 'title')
    : 새로운 오류를 해결함. 
    ㄴ positions 반복문 내 스코프를 강제해야한다고 함. 그래서 for문의 변수를 var 로 설정하거나, forEach 문으로 변경해야 함.
    ㄴ 근데 반복문 내 스코프를 강제해야한다는 것이 무슨 말이며, 왜 그래야 할까?
    ~~~
    먼저, 스코프에 대해서 알아보면, 스코프(Scope)는 유효범위를 의미한다. 프로그래밍의 관점으로 보면, 스코프는 참조 대상 식별(변수, 함수의 이름과 같이 어떤 대상을 다른 대상과 구분하여 식별할 수 있는 유일한 이름)를 찾아내기 위한 규칙이다. 자바스크립트는 이 규칙대로 식별자를 찾는다.
    스코프의 구분은 두 가지로 나눌 수 있다. 전역 스코프(코드 어디에서든지 참조할 수 있음), 지역 스코프(함수 코드 블록이 만든 스코프로 함수 자신과 하위 함수에서만 참조할 수 있음). -> 전역 변수, 지역 변수의 범위와 같은 의미.
    ! 여기서 내가 헷갈렸던 이유는 자바스크립트 스코프의 특징이 타 언어와는 다른 특징을 가지고 있기 때문이다. !
    ㄴ 대부분의 언어는 블록 레벨 스코프를 따른다. 블록 레벨 스코프란 코드 블록({...})내에서 유효한 스코프를 의미한다. 여기서 유효하다는 것은 '참조(접근)할 수 있다'라는 뜻이다.
    ㄴ 하지만, 자바스크립트는 함수 레벨 스코프를 따른다. 함수 레벨 스코프란 함수 코드 블록 내에서 선언된 변수는 함수 코드 블록 내에서만 유효하고 함수 외부에서는 유효하지 않다. 여기서 let 으로 선언해주면 블록 레벨 스코프로 사용할 수 있다.
    ㄴ 내가 알던 다른 언어들과 달리 자바스크립트는 블록 단위 스코프가 아니라 for 문에는 스코프를 강제해줘야 한다는 의미로 받아들였다. 그리고 최대한 forEach 문을 사용해봐야겠다.

    출처 : https://poiemaweb.com/js-scope 
    ~~~
    : 오류 해결 출처 (https://devtalk.kakao.com/t/uncaught-typeerror-cannot-read-property-title-of-undefined/110077)

## 카카오맵 API 에 내가 추가한 코드
- 클릭으로 열고 닫는 기능을 추가하고 싶었다.
- 그래서 처음에는 그냥 clickStatus 한 변수로 해결해보려 했으나, 마커가 여러 개라 여러 개 클릭을 하면 다시 여러 번 클릭해서 열고 닫고를 해야했다.
- 다시 생각해낸 방법이 marker 를 생성할 때, 마커마다 clickStatus 요소를 넣어주는 것이다.
- false 일 경우, 열어도 되는 상태이고 true 일 경우에는 닫아야 하는 상태인 걸로 설정했다.
~~~
function makeClickListener(map, marker, infowindow) {
    return function() {
        if(!marker.clickStatus) {
            infowindow.open(map, marker);
            marker.clickStatus = true;
        } else if(marker.clickStatus) {
            infowindow.close();
            marker.clickStatus = false;
        }
    };
}
~~~

코드 출처 : https://www.inflearn.com/course/%EB%B9%84%EC%A0%84%EA%B3%B5-%ED%92%80%EC%8A%A4%ED%83%9D-%EB%A7%9B%EC%A7%91%EC%A7%80%EB%8F%84#