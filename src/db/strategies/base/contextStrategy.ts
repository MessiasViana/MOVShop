import ICrud from "../interface/interface";

export default class ContextStrategy extends ICrud {
  _database;

  constructor(strategy: ICrud) {
    super();
    this._database = strategy;
  }

  isConnected() {
    return this._database.isConnected();
  }
  
  create(item: any) {
    return this._database.create(item);
  }
  
  read(item: any = {}) {
    return this._database.read(item);
  }
  
  update(id: any, item: any) {
    return this._database.update(id, item);
  }
  
  delete(id: any) {
    return this._database.delete(id);
  }
}