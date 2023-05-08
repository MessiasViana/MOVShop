import { database } from "../instances/mysql";
import ICrud from "./interface/interface";

interface ModelsItems {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  price?: number;
  profile?: number;
  datebirth?: string;
  email?: string;
  password?: string;
}

export default class MySql extends ICrud {
  _model: any;

  constructor(_model: any) {
    super();
    this._model = _model;
  }

  async isConnected() {
    try {
      await database.authenticate();
      return true;
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  }

  async create(item: ModelsItems) {
    const { dataValues } = await this._model.create(item);
    return dataValues;
  }

  async read(item: any):  Promise<any>{
    const dataValues = await this._model.findAll({ where: item });
    return dataValues;
  }

  async update(fildName: string, id: number, item: ModelsItems) {
    return await this._model.update(item, {
      where: {
        [fildName]: id
      }
    });
  }

  async delete(id: number) {
    const query = id === -1 ? {} : { id };
    return await this._model.destroy({where: query});
  }
}