import { Router } from "express";
import Contents from "../controllers/ContentsController";
import ContentsVerification from "../middleware/ContentsVerification";
const routes = Router();

routes.get("/user", Contents.allDatas);
routes.get("/user/:id", Contents.idDatas);
routes.post(
  "/user",
  ContentsVerification.verifyContentsDatas,
  ContentsVerification.verifyNotDatas,
  Contents.createDatas
);
routes.delete("/user/:id", Contents.deleteDatas);
routes.put("/user/:id", Contents.editDatasID);

export { routes };
