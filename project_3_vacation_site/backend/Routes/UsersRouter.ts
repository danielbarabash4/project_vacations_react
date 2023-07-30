import express, { NextFunction, Request, Response } from "express";
import { addUser, getUser, checkLogin, deleteUser, allEmails } from "../Logic/userLogic";
import User from "../Models/User";

const UserRouter = express.Router();

UserRouter.post(
  "/addUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    return response.status(201).json(await addUser(newUser));
  }
);

UserRouter.post(
  "/checkLogin",
  async (request: Request, response: Response, next: NextFunction) => {
    const userLogin: User = request.body;
    if (await checkLogin(userLogin)) {
      return response.status(200).json(await checkLogin(userLogin));
    }
    return response.status(401).json("bad");
  }
);

UserRouter.get(
  "/getUser/:email",
  async (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json(await getUser(request.params.email));
  }
);

UserRouter.get("/allEmails",
async (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json(await allEmails());
}

)

UserRouter.delete(
  "/deleteUser/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    await deleteUser(+request.params.id)
    return response.status(204).json({});
  }
);

export default UserRouter;
