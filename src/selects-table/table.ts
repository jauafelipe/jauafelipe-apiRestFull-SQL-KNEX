import { Knex } from "knex";
import Configs from "../configs/ConfigDataBase";

async function selectDatas() {
  const seletctsTable = await Configs.knex("API as u")
    .select("*")
    .then((datas) => {
      for (const user of datas) {
        console.log(user);
      }
    });
  return seletctsTable;
}

selectDatas();
