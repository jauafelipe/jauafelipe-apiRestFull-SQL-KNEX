import { Router } from "express";
import Contents from "../controllers/ContentsController";
import ContentsVerification from "../middleware/ContentsVerification";
const routes = Router();

routes.get("/user", Contents.allDatas);
routes.post(
  "/user",
  ContentsVerification.verifyContentsDatas,
  Contents.createDatas
);
routes.delete("/user/:id", Contents.deleteDatas);

export { routes };
