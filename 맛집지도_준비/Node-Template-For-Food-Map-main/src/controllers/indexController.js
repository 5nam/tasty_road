const { pool } = require("../../config/database"); // mySql 에 접근할 수 있는 객체
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");

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
