import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import config from "./Utils/Config";
import ErrorHandler from "./MiddleWare/route-not-found";
import UserRouter from "./Routes/UsersRouter";
import VacationRouter from "./Routes/VacationRouter";

const server = express();

server.use(cors());

server.use(express.json());

server.use(express.static("upload"));

server.use(fileUpload({ createParentPath: true }));

server.use("/api/v1/users", UserRouter);

server.use("/api/v1/vac",VacationRouter);

server.use("*", ErrorHandler);

server.listen(config.webPort, () => {
  console.log(`listening on http://${config.webPort}`);
  console.log(
    `for testing use the path http://localhost:${config.webPort}/api/v1/users/check`
  );
});
