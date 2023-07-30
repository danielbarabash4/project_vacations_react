import Song from "../Models/Song";
import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";

const getAllSongs = async () => {
  const SQLcmd = `
    SELECT songs.*, name  as categoryName
    FROM songs JOIN category
    ON songs.category =category.id  
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

const getSongById = async (id: number) => {
  const SQLcmd = `
    SELECT songs.*, category.name  as categoryName
    FROM songs JOIN category
    ON songs.category =category.id  
    WHERE id =${id}
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};

const deleteSongById = async (id: number) => {
  const SQLcmd = `DELETE FROM songs WHERE id = ${id}`;
  await dal_mysql.execute(SQLcmd);
};

const addSong = async (newSong: Song) => {
  const SQLcmd = `
    INSERT INTO songs 
    (description, img, title, url)
    VALUES
    ('${newSong.description}','${newSong.img}','${newSong.title}','${newSong.url}')
  `;
  const result: OkPacket = await dal_mysql.execute(SQLcmd);
  return result.insertId;
};

const updateSong = async (song: Song) => {
  const SQLcmd = `
    UPDATE songs SET description = '${song.description}',img = '${song.img}',title ='${song.title}',url = '${song.url}
    WHERE (id = ${song.id});
  `;
  await dal_mysql.execute(SQLcmd);
  return true;
};

const getCat = async () => {
  const SQLcmd = `
    SELECT * FROM category
  `;
  return dal_mysql.execute(SQLcmd);
};

const test = async () => {
  const SQLcmd = `SELECT * FROM vacation_sql.users`;
  return dal_mysql.execute(SQLcmd);
};

export {
  getAllSongs,
  getSongById,
  deleteSongById,
  addSong,
  updateSong,
  getCat,
  test
};
