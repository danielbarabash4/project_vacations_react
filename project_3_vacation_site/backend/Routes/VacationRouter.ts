import express, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import {
  addLike,
  addVac,
  allLikes,
  allVac,
  deleteLike,
  deleteVac,
  likeByUser,
  likesByVac,
  updateVac,
  vacById,
} from "../Logic/VacationLogic";
import Vacation from "../Models/Vacation";

const VacationRouter = express.Router();

VacationRouter.get(
  "/allVac",
  async (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json(await allVac());
  }
);

VacationRouter.get(
  "/vacById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    return response.status(200).json(await vacById(id));
  }
);

VacationRouter.delete(
  "/deleteVac/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    return response.status(202).json(await deleteVac(id));
  }
);

VacationRouter.post(
  "/addVac",
  async (request: Request, response: Response, next: NextFunction) => {
    const newVac = request.body;
    return response.status(201).json(await addVac(newVac));
  }
);

VacationRouter.put(
  "/updateVac",
  async (request: Request, response: Response, next: NextFunction) => {
    const updatedVac = request.body;
    return response.status(200).json(await updateVac(updatedVac));
  }
);

VacationRouter.post(
  "/uploadPhoto",
  async (request: Request, response: Response, next: NextFunction) => {
    if (request.files && Object.keys(request.files).length > 0) {
      const uploadPhoto = request.files.file as UploadedFile;
      console.log(`file ${uploadPhoto.name} was uploaded successfully :)`);
      uploadPhoto.mv(`./Photos/${uploadPhoto.name}.jpg`, (err) => {
        if (err) {
          console.log("error:\n", err);
          return response.status(500).json({ error: "file upload filed" });
        }
        return response.status(200).json({ msg: "file upload" });
      });
    } else {
      console.log("error:\n got no file");
      return response.status(400).json({ msg: "got no file at all" });
    }
  }
);

VacationRouter.post(
  "/like",
  async (request: Request, response: Response, next: NextFunction) => {
    const like = request.body;
    return response.status(200).json(await addLike(like));
  }
);

VacationRouter.delete(
  "/disLike/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    return response.status(200).json(await deleteLike(id));
  }
);

VacationRouter.get(
  "/allLikes",
  async (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json(await allLikes());
  }
);

VacationRouter.get(
  "/likesByVac/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    return response.status(200).json(await likesByVac(id));
  }
);

VacationRouter.get(
  "/likesByUser/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    return response.status(200).json(await likeByUser(id));
  }
);

export default VacationRouter;
