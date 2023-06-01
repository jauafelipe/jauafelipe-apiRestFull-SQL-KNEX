import { Request, Response } from "express";
import Configs from "../configs/ConfigDataBase";

class ContentsCreateDatas {
  public async allDatas(req: Request, res: Response) {
    const user = await Configs.knex("API");
    return res.status(200).json(user);
  }
  public async idDatas(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      if (id) {
        const datas = await Configs.knex("API").where({ id }).first();
        return res.status(200).json(datas);
      }
    } catch (e) {
      return res.status(400).json({ msg: "ERRO AO PROCURAR ID" });
    }
  }

  public async createDatas(req: Request, res: Response) {
    try {
      const { texts, image } = req.body;
      await Configs.knex("API").insert({ texts, image });
      return res.status(200).json({ msg: "Dados inseridos com Sucesso" });
    } catch (e) {
      res.json(e);
    }
  }

  public async deleteDatas(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idExisting = await Configs.knex("API").where("id", id).first();
      if (!idExisting) {
        return res.status(400).json({ msg: `ID:${id} NAO EXISTE` });
      }
      if (idExisting) {
        await Configs.knex("API").where({ id }).del();
        return res.status(200).json({ msg: `${id} DELETADO` });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ msg: "ERRO AO VERIFICAR DADOS EXISTENTES" });
    }
  }

  public async editDatasID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { texts, image } = req.body;
      if (id) {
        await Configs.knex("API").where({ id }).update({ texts, image });

        return res.status(200).json({ msg: `ID:${id} DADOS ATUALIZADOS` });
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({ msg: "ERRO AO EDITAR ID" });
    }
  }
}

export default new ContentsCreateDatas();
