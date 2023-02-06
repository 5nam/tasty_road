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
        link: 'https://www.youtube.com/watch?v=P3N8gkG-xIs',
		keyword: 'korean'
    },
    {
        title: '와플하우스', 
        address: '서울 용산구 청파로45길 37',
        link: 'https://www.youtube.com/watch?v=P3N8gkG-xIs',
		keyword: 'etc'
    },
    {
        title: '홍곱창', 
        address: '서울 용산구 청파로43가길 31 1층',
        link: 'https://www.youtube.com/watch?v=P3N8gkG-xIs',
		keyword: 'roast'
    },
    {
        title: '까치네',
        address: '서울 용산구 청파로45길 18',
        link: 'https://www.youtube.com/watch?v=P3N8gkG-xIs',
		keyword: 'snackBar'
    }
];

for(let i = 0; i < positions.length; i++) {
    // 주소로 좌표를 검색합니다.
    geocoder.addressSearch(positions[i].address, function(result, status) {
        // 정상적으로 검색이 완료됐으면
        if(status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    
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

            // 마커에 표시할 인포 윈도우 재료들
            var infoContent = 
            '<img src="'
            + makeThumbnail(positions[i].link)
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
			// kakao.maps.event.addListener(marker, 'click', makePanTo(map, marker)); // 오류나서 보류
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
            infowindow.open(map, marker);
            marker.clickStatus = true;
        } else if(marker.clickStatus) {
            infowindow.close();
            marker.clickStatus = false;
        }
    };
}

// 일반 링크에서 썸네일 링크 따오는 함수
function makeThumbnail(link) {
	var findIndex = link.lastIndexOf('v=') + 2;

	let thumbnailLink = 'https://img.youtube.com/vi/' + link.substr(findIndex) + '/mqdefault.jpg';

	return thumbnailLink;
}

// 분야를 클릭하면 움직이는 함수
function moveKeyword(positions, resultID) {
	for(let positionsIndex = 0; positionsIndex<positions.length; positionsIndex++) {
		if(positions[positionsIndex].keyword == resultID) {
			let moveCoords = changeCoords(positions[positionsIndex].address);

			map.setCenter(moveCoords);
		}
	}
}

// 버튼 클릭 시 버튼의 id 반환하는 함수
function returnButtonId(button) {
	var resultID = document.getElementById(button.getAttribute('id')).getAttribute('id');

	moveKeyword(positions, resultID);
}

// 주소-좌표 변환 함수
function changeCoords(address) {
	geocoder.addressSearch(address, function(result, status) {
		if (status === kakao.maps.services.Status.OK) {
			let coordsResult = new kakao.maps.LatLng(result[0].y, result[0].x);

			return coordsResult;
		}
		else {
			console.log("못 찾았습니다.");
		}
	})
}

// 오류나서 주석처리
/*
function makePanTo(map, marker) {

	return function() {
		// 이동할 위도 경도 위치를 생성합니다 
		var moveLatLon = marker.position;
		
		// 지도 중심을 부드럽게 이동시킵니다
		// 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
		map.panTo(moveLatLon);    
	};        
}
*/