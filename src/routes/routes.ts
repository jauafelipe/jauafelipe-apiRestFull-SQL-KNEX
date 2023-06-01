import { Router } from "express";
import Contents from "../controllers/ContentsController";
import ContentsVerification from "../middleware/ContentsVerification";
const route = Router();

route.get("/user", Contents.allDatas);
route.get("/user/:id", Contents.idDatas);
route.post(
  "/user",
  ContentsVerification.verifyContentsDatas,
  ContentsVerification.verifyNotDatas,
  Contents.createDatas
);
route.delete("/user/:id", Contents.deleteDatas);
route.put(
  "/user/:id",
  ContentsVerification.idExistingInDataBase,
  Contents.editDatasID
);

export { route };
