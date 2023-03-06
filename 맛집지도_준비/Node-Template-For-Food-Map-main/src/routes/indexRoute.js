module.exports = function (app) {
  const index = require("../controllers/indexController");
  const jwtMiddleware = require("../../config/jwtMiddleware");

  // 라우터 정의
  // 어떤 요청이 들어오면 그것에 맞게 응답을 해주는 부분임.

  // app.HTTP메서드(uri, 컨트롤러 콜백함수)
  app.get("/dummy", index.example);

  // 예시
  /*
  app.get("/dummy", function (req, res) { // req : 요청하는 객체, res : 응답하는 객체
    res.send("get dummy 요청 성공");
  })
  */
};
