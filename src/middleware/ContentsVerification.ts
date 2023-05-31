import { NextFunction, Request, Response } from "express";
import { InterfaceVerifyDatas } from "../interfaces/contents-verify";
import ConfigDataBase from "../configs/ConfigDataBase";

class ContentsVerification implements InterfaceVerifyDatas {
  public async verifyContentsDatas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { name } = req.body;
      const existing_datas = await ConfigDataBase.knex("test_api")
        .where("name", name)
        .first();
      if (existing_datas)
        return res
          .status(400)
          .json({ msg: "DADOS JA EXISTEM NO BANCO DE DADOS" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "erro ao verificar" });
    }
    next();
  }
}

export default new ContentsVerification();
