import Like from "../Models/Like";
import Vacation from "../Models/Vacation";
import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";

const allVac = async () => {
  const SQLcmd = "SELECT * FROM vacation_sql.destination";
  return await dal_mysql.execute(SQLcmd);
};

const vacById = async (id: number) => {
  const SQLcmd = `SELECT * FROM vacation_sql.destination WHERE id = '${id}'`;
  return await dal_mysql.execute(SQLcmd);
};

const deleteVac = async (id: number) => {
  const SQLcmd = `DELETE FROM vacation_sql.destination WHERE id = '${id}'`;
  return await dal_mysql.execute(SQLcmd);
};

const addVac = async (newVac: Vacation) => {
  const SQLcmd = `INSERT INTO vacation_sql.destination (destination,description,begin,finish,price,img)
    VALUES ('${newVac.destination}', '${newVac.description}', '${newVac.begin}', '${newVac.finish}', '${newVac.price}', '${newVac.img}')
    `;
  return await dal_mysql.execute(SQLcmd);
};

const updateVac = async (vac: Vacation) => {
  const SQLcmd = `UPDATE vacation_sql.destination SET
    destination ='${vac.destination}',description='${vac.description}',begin='${vac.begin}',finish='${vac.finish}',price='${vac.price}',img='${vac.img}'
    WHERE id = ${vac.id}`;
  return await dal_mysql.execute(SQLcmd);
};

const addLike = async (newLike: Like) => {
  const SQLcmd = `INSERT INTO vacation_sql.likes(user_id, vac_id)
  VALUES ('${newLike.userId}','${newLike.vacId}')`;
  return await dal_mysql.execute(SQLcmd);
};

const deleteLike = async (id: number) => {
  const SQLcmd = `DELETE FROM vacation_sql.likes WHERE like_id='${id}'`;
  return await dal_mysql.execute(SQLcmd);
};

const allLikes = async () => {
  const SQLcmd = `SELECT * FROM vacation_sql.likes`;
  return await dal_mysql.execute(SQLcmd);
};

const likesByVac = async (id: number) => {
  const SQLcmd = `SELECT * FROM vacation_sql.likes WHERE vac_id ='${id}'`;
  return await dal_mysql.execute(SQLcmd);
};

const likeByUser = async (id: number) => {
  const SQLcmd = `SELECT * FROM vacation_sql.likes WHERE user_id ='${id}'`;
  return await dal_mysql.execute(SQLcmd);
};

export {
  allVac,
  vacById,
  deleteVac,
  addVac,
  updateVac,
  addLike,
  deleteLike,
  allLikes,
  likesByVac,
  likeByUser
};
