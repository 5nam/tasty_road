# tasty_road

## 기능 구현

## 프로젝트 진행 중 질문들 정리
1. 자바스크립의 함수 정의에 대한 방법이 왜 3가지나 될까? 그 뒤에 호출 방식이 다른가?
2. 동기/비동기를 적용하는 구체적인 예시는?

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