import express, { NextFunction, Request, Response } from "express";
import {
  addSong,
  deleteSongById,
  getAllSongs,
  getCat,
  getSongById,
  test,
  updateSong,
} from "../Logic/SongsLogic";

const songRouter = express.Router();

songRouter.get(
  "/listSongs",
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("in song route");
    return response.status(200).json(await getAllSongs());
  }
);

songRouter.get(
  "/songById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    //const songID = +request.params.id;
    return response.status(200).json(await getSongById(+request.params.id));
  }
);

songRouter.delete(
  "/deleteById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const songID = +request.params.id;
    await deleteSongById(songID);
    return response.status(200).json({});
  }
);

songRouter.post(
  "/addSong",
  async (request: Request, response: Response, next: NextFunction) => {
    const newSong = request.body;
    const result = await addSong(newSong);
    return response.status(201).json(`{${result}}`);
  }
);

songRouter.put(
  "/updateSong",
  async (request: Request, response: Response, next: NextFunction) => {
    const song = request.body;
    return response.status(200).json(await updateSong(song));
  }
);

songRouter.get(
  "/getCat",
  async (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json(await getCat());
  }
);

songRouter.get(
  "/getTest",
  async (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json(await test());
  }
);

export default songRouter;
