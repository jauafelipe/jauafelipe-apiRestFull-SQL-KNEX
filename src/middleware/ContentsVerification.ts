import { NextFunction, Request, Response } from "express";
import { InterfaceVerifyDatas } from "../interfaces/contents-verify";
import ConfigDataBase from "../configs/ConfigDataBase";
import { Knex } from "knex";

class ContentsVerification implements InterfaceVerifyDatas {
  public async verifyContentsDatas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { texts, image } = req.body;
      const existing_datas = await ConfigDataBase.knex("API")
        .where("texts", texts)
        .where("image", image)
        .first();
      if (existing_datas)
        return res
          .status(400)
          .json({ msg: "DADOS JA EXISTEM NO BANCO DE DADOS" });
    } catch (e) {
      console.log("ERROR", e);
      return res.status(500).json({ msg: "erro ao verificar" });
    }
    next();
  }

  public async verifyNotDatas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown | Response> {
    try {
      const { texts, image } = req.body;

      if (!texts || !image)
        return res
          .status(400)
          .json({ msg: "DADOS EM BRANCO, PORFAVOR INSERIR DADOS" });
    } catch (e) {
      return res.json({ msg: "ERRO AO VERIFICAR ENTRADAS" });
    }
    next();
  }

  public async idExistingInDataBase(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | unknown> {
    const { id } = req.params;
    try {
      const dataId: Knex[] = await ConfigDataBase.knex("API")
        .where("id", id)
        .first();

      if (!dataId) return res.status(400).json({ msg: "ID NAO ENCONTRADO" });
    } catch (e) {
      return res.status(400).json({ msg: `ERROR ${e}` });
    }
    next();
  }
}

export default new ContentsVerification();
