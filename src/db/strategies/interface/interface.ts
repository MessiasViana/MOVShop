class NotImplementedException extends Error { 
  constructor() {
    super("Not implemented exception");
  }
}

export default class ICrud {
  isConnected() {
    throw new NotImplementedException();
  }
  
  create(item: any) {
    throw new NotImplementedException();
  }
  
  read(query: any) {
    throw new NotImplementedException();
  }

  update(fildName: string, id: any, item: any) {
    throw new NotImplementedException();
  }

  delete(id: any) {
    throw new NotImplementedException();
  }
}