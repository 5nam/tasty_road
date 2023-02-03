// 1.

// 지도 생성하기
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 확대 축소 이벤트 등록하기
// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 2. 더미데이터 생성 : 제목, 주소, url, 카테고리
// import loadData from "./tasty.js";
// console.log(loadData);

// 3. 여러 개 마커 찍기 & 주소-좌표 변환
// 마커를 표시할 위치와 title 객체 배열입니다

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var positions = [
    {
        title: '한입소반', 
        address: '서울 용산구 청파로45길 3 1층',
        img: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMTJfMjYz/MDAxNjEzMDU5MzA0MDMz.tcm2gURGnE_9ZNUNBjlqqvfue8PR82B4eYII8cAdBlUg.R-IVtLehCxgT6m4eFnwhvbj4R7RJlsf2ilb8EpffSvMg.JPEG.chooddingg/IMG_9384.JPG?type=w800',
        link: 'https://www.youtube.com/'
    },
    {
        title: '와플하우스', 
        address: '서울 용산구 청파로45길 37',
        img: 'http://ojsfile.ohmynews.com/STD_IMG_FILE/2011/1204/IE001377080_STD.jpg',
        link: 'https://www.youtube.com/'
    },
    {
        title: '홍곱창', 
        address: '서울 용산구 청파로43가길 31 1층',
        img: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMTJfMjYz/MDAxNjEzMDU5MzA0MDMz.tcm2gURGnE_9ZNUNBjlqqvfue8PR82B4eYII8cAdBlUg.R-IVtLehCxgT6m4eFnwhvbj4R7RJlsf2ilb8EpffSvMg.JPEG.chooddingg/IMG_9384.JPG?type=w800',
        link: 'https://www.youtube.com/'
    },
    {
        title: '까치네',
        address: '서울 용산구 청파로45길 18',
        img: 'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMTJfMjYz/MDAxNjEzMDU5MzA0MDMz.tcm2gURGnE_9ZNUNBjlqqvfue8PR82B4eYII8cAdBlUg.R-IVtLehCxgT6m4eFnwhvbj4R7RJlsf2ilb8EpffSvMg.JPEG.chooddingg/IMG_9384.JPG?type=w800',
        link: 'https://www.youtube.com/'
    }
];

for(let i = 0; i < positions.length; i++) {
    // 주소로 좌표를 검색합니다.
    geocoder.addressSearch(positions[i].address, function(result, status) {
        // 정상적으로 검색이 완료됐으면
        if(status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // // 마커 이미지의 이미지 크기 입니다
            // var imageSize = new kakao.maps.Size(24, 35); 
    
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: coords, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                clickStatus : false
            }); 

            // 마커가 보이는 곳으로 이동할 수 있도록
            // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
            var bounds = new kakao.maps.LatLngBounds(); 
            bounds.extend(coords);
            map.setBounds(bounds);

            // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            // 마커에 표시할 인포 윈도우 재료들
            var infoContent = 
            '<img src="'
            + positions[i].img
            + '" alt="지원하지 않습니다.">'
            + '<div style="padding:5px;">' 
            + positions[i].title
            + '<br>'
            + positions[i].address
            + '<br><a href="'
            + positions[i].link
            + '" style="color:blue" target="_blank">영상보기</a>' // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

            // 마커에 표시할 인포윈도우를 생성합니다 
            var infowindow = new kakao.maps.InfoWindow({
                content: infoContent
            });

            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            // kakao.maps.event.addListener(marker, 'click', makePanTo(map, marker));
            kakao.maps.event.addListener(marker, 'click', makeClickListener(map, marker, infowindow));
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    });
}


// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeClickListener(map, marker, infowindow) {
    return function() {
        if(!marker.clickStatus) {
            // 지도 중심좌표를 접속위치로 변경합니다
            makePanTo(map, maker);
            infowindow.open(map, marker);
            marker.clickStatus = true;
        } else if(marker.clickStatus) {
            infowindow.close();
            marker.clickStatus = false;
        }
    };
}

function makePanTo(map, marker) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = marker.coords;
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}
