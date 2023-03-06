const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
var cors = require("cors");

module.exports = function () {
  const app = express();

  // 미들웨어 설정 : 미들웨어는 express 가 실행되면서 중간에 거쳐가는 것들을 의미
  // 우리가 express 를 조금 더 사용하기 쉽게해주는 라이브러리들을 거쳐간다는 것

  app.use(compression()); // HTTP 요청을 압축 및 해제

  app.use(express.json()); // body 값을 파싱

  app.use(express.urlencoded({ extended: true })); // form 으로 제출되는 값 파싱
 
  app.use(methodOverride()); // put, delete 요청 처리

  app.use(cors()); // 웹브라우저 cors 설정을 관리
  app.use(express.static("/home/ubuntu/food-map/front"));

  // app.use(express.static(process.cwd() + '/public'));

  // 직접 구현해야 하는 모듈 : 라우드부분 : 실제로 해야하는 부분
  require("../src/routes/indexRoute")(app);

  return app;
};

/*
src 가 우리가 실제로 코드를 쓰는 부분임.app
routes, dao(data access object), controller 부분이 사용할 부분임
*/