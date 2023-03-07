const { add } = require("winston");
const { pool } = require("../../config/database");

exports.exampleDao = async function (connection) {
  const Query = ``;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};


exports.selectStudents = async function (connection, studentName) {
  // 패스베리어블 버전
  // const selectAllStudentQuery = `SELECT * FROM Students where studentsIdx = ?;`
  const selectAllStudentQuery = `SELECT * FROM Students;`;
  const selectStudentByNameQuery = `SELECT * FROM Students WHERE studentName = ?;`;

  // const Params = [studentIdx];
  const Params = [studentName];

  // 3항 연산자로 변환
  let Query = studentName ? selectStudentByNameQuery : selectAllStudentQuery;

  // if(!studentName) {
  //   Query = selectAllStudentQuery;
  // } else {
  //   Query = selectStudentByNameQuery;
  // }


  const rows = await connection.query(Query, Params);

  return rows;
};

exports.insertStudents = async function (connection, stduentName, major, birth, address) {
  // 패스베리어블 버전
  const insertQuery = `insert into Students(studentName, major, birth, address) values (?,?,?,?);`;

  const Params = [studentName, major, birth, address];

  const rows = await connection.query(insertQuery, Params);

  return rows;
};