/*
express.js 파일을 의미. 즉, 아래 코드는 express.js 를 실행하라는 것

*/
const express = require("./config/express");
// 나중에 이 프로젝트를 배포를 하고나서 이슈가 발생할 때 자동으로 기록되게 함으로써 어느 부분을 업그레이드 해야하는지 찾아내는 것에 도움이 되는 것임
const { logger } = require("./config/winston"); // logger 은 이 프로세스를 돌리면서 일어나는 에러들이라던지, 기록해야하는 것들을 적어놓는 로그임

const port = 3000;
express().listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
