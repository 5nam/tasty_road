module.exports = function (app) {
  const index = require("../controllers/indexController");
  const jwtMiddleware = require("../../config/jwtMiddleware");

  // 라우터 정의
  // 어떤 요청이 들어오면 그것에 맞게 응답을 해주는 부분임.

  // app.HTTP메서드(uri, 컨트롤러 콜백함수)
  // app.get("/dummy", index.example);

  // 학생 테이블 조회 : 
  app.get("/students", index.readStudents);

  // 학생 테이블 조회 : 패스베리어블
  // app.get("/students/:studentIdx", index.readStudents);

  // 학생 생성
  app.post("/students", index.createStudent);
  
  // 학생 업데이트
  app.patch("/students/:studentIdx", index.updateStudent);

  // 예시
  /*
  app.get("/dummy", function (req, res) { // req : 요청하는 객체, res : 응답하는 객체
    res.send("get dummy 요청 성공");
  })
  
  같은 파일안에 모든 것을 쓸 수 있지만, 콜백 함수 부분을 controller 에 분리하는 것도 좋음
  */
};
