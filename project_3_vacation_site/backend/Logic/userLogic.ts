import { OkPacket } from "mysql";
import dal_mysql from "../Utils/dal_mysql";
import User from "../Models/User";

const addUser = async (newUser: User) => {
  const SQLcmd = `
INSERT INTO users (name, last_name , email, password) 
VALUES ('${newUser.name}','${newUser.lastName}','${newUser.email}','${newUser.password}')
`;

  const result: OkPacket = await dal_mysql.execute(SQLcmd);
  newUser.id = result.insertId;
  return newUser;
};

const checkLogin = async (user: User) => {
  const SQLcmd = `
  SELECT count(*) as total 
  FROM users WHERE email = '${user.email}' AND password = '${user.password}'`;
  const result = await dal_mysql.execute(SQLcmd);
  return result;
};

const getUser = async (email: string) => {
  const SQLcmd = `SELECT  id, name, admin  FROM users WHERE email = '${email}'`;
  return await dal_mysql.execute(SQLcmd);
};

const deleteUser = async (id: number) => {
  const SQLcmd = `DELETE FROM users WHERE id = '${id}'`;
  return await dal_mysql.execute(SQLcmd);
};

const allEmails = async () => {
  const SQLcmd = `SELECT email FROM users`;
  return await dal_mysql.execute(SQLcmd);
};

export { addUser, checkLogin, getUser, deleteUser, allEmails };
