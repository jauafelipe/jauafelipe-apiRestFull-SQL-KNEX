import { Request, Response } from "express";
import Configs from "../configs/ConfigDataBase";

class ContentsCreateDatas {
  public async allDatas(req: Request, res: Response) {
    const user = await Configs.knex("test_api");
    return res.status(200).json(user);
  }

  public async createDatas(req: Request, res: Response) {
    try {
      const { name } = req.body;
      await Configs.knex("test_api").insert({ name });
      return res.status(200).json({ msg: "Dados inseridos com Sucesso" });
    } catch (e) {
      res.json(e);
    }
  }

  public async deleteDatas(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Configs.knex("test_api").where({ id }).del();

      return res.status(200).json({ msg: "DADO DELETADO" });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ContentsCreateDatas();
