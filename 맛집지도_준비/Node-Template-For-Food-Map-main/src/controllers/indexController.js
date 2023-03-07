const { pool } = require("../../config/database"); // mySql 에 접근할 수 있는 객체
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");

// 학생 테이블 조회
exports.readStudents = async function(req, res) {
  // 이런 식으로 쿼리 스트링으로 들어온 값을 파싱하는 방법은
  // req 객체 안에 있는 query 라는 객체에 접급해서 객체의 비구조 할당 방법을 사용해서 뽑아내도 됨.
  const {stduentName} = req.query;

  // 패스베리어블 버전
  // const {studentIdx} = req.params;

  // console.log(studentIdx);
  console.log(stduentName);

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectStudents(connection, stduentName);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드, 요청 성공시 200번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`readStudents Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readStudents DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
}

// 학생 생성
// 이 경우에는 DB 에 데이터를 생성해야 하므로, 바디의 패킷을 통해 데이터를 받아올 수 있음
exports.createStudent = async function(req, res) {
  const {stduentName, major, birth, address} = req.body;
  
  // studentName, major, address : 문자열인지 검사
  if (
    typeof stduentName !== "string" ||
    typeof major !== "string" ||
    typeof address !== "string"
  ) {
    return res.send({
      isSuccess: false,
      code: 400, // 요청 실패시 400번대 코드
      message: "값을 정확히 입력해주세요.",
    })
  }
  // birth : YYYY-MM-DD 형식 검사
  var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

  if(!regex.test(birth)) {
    return res.send({
      isSuccess: false,
      code: 400, // 요청 실패 시 400번대 코드
      message: "날짜 형식을 확인해주세요.",
    })
  }

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.insertStudents(connection, stduentName, major, birth, address);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드, 요청 성공시 200번대 코드
        message: "학생 생성 성공",
      });
    } catch (err) {
      logger.error(`insertStudents Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`insertStudents DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
}

/*
 서버는 클라이언트 요청으로 들어오는 값들을 모두 검증을 하고 데이터 베이스에 넘겨야 함.
 만약, 데이터베이스를 모두 drop 하는 쿼리가 존재한다던지, 형식이 다른 데이터가 있는 등에 대한 검증을 하고,
 우리가 바라던 값만 들어오도록 해야 함.
*/

// 예시 코드
exports.example = async function (req, res) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // mySql 접속과 관련된 부분을 정의하는 함수
      // indexDao 부분에 데이터베이스 접근과 관련된 로직을 다 적어놓을 것
      // 이 코드는 exampleDao 의 반환값이 배열의 첫 번째 요소를 rows 에 담겠다는 의미이다
      const [rows] = await indexDao.exampleDao(connection);
      // 괄호 [] 는 es6 비구조 할당 문법임
      /*
      const a = 1;
      const b = 2;
      const c = 3;

      const [a,b,c] = [1,2,3];
      */

      // rows 에다가 exampleDao 의 결과를 리턴, 그 리턴한 결과를 res 객체를 통해 send 해주는 것.

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드, 요청 성공시 200번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};
