import assert from 'assert';
import UsersSchema from "../../db/models/Users";
import ProfilesSchema from "../../db/models/Profiles";
import ProductsSchema from "../../db/models/Products";
import MySql from '../../db/strategies/mySql';
import ContextStrategy from "../../db/strategies/base/contextStrategy";
import RequestsSchema from '../../db/models/Requests';
import ItensRequestsSchema from '../../db/models/ItensRequests';


const contextUser = new ContextStrategy(new MySql(UsersSchema));
const contextProfile = new ContextStrategy(new MySql(ProfilesSchema));
const contextProduct = new ContextStrategy(new MySql(ProductsSchema));
const contextRequests = new ContextStrategy(new MySql(RequestsSchema));
const contextItensRequests = new ContextStrategy(new MySql(ItensRequestsSchema));

let USER = {
  name: "test",
  email: "test@example.com",
  password: "123456",
  birthday: new Date("2005-04-29"),
  id_profile: 0,
}

const PROFILE = {
  profile: "Admin"
}

const PRODUCT = {
  name: "carro",
  category: "SUV",
  type: "Luxuoso",
  price: 10000.35,
  producer: "Toyota",
}

let REQUEST = {
  price_total: 300.45,
  status: "Pagamento concluido",
  id_user: 0,
}


describe('tests database mysql', () => { 
  beforeAll(async () => {
    await Promise.all([
      contextRequests.delete(-1),
      contextUser.delete(-1),
      contextProfile.delete(-1),
    ])
  });
  
  it('mysql connection', async () => {
    try {
      const isConnected = await Promise.all([
        contextUser.isConnected(),
        contextProfile.isConnected(),
        contextProduct.isConnected(),
        contextRequests.isConnected(),
        contextItensRequests.isConnected()
      ]);
    
      isConnected.forEach((res) => {
        assert.equal(res, true);
      });
    } catch (error) {
      console.log(error)
    }
  });
  
  it('User and profile CREATE', async () => {
    await contextProfile.create(PROFILE);

    const [profile]: any = await contextProfile.read();
    const { id_profile } = profile;
    
    USER.id_profile = id_profile;
    const user: any = await contextUser.create(USER);
    const { id_user, created_at, updated_at, ...resUser } = user;

    assert.deepEqual(resUser, USER);
  });

  it('Request UPDATE', async () => {
    const [user]: any = await contextUser.read(USER);
    const { id_user } = user;

    REQUEST.id_user = id_user;

    const request: any = await contextRequests.create(REQUEST);
    const { id_request, created_at, ...resRequest } = request;

    const newREQUEST = {
      status: "Enviado"
    }
    const EXPECTED = {
      price_total: REQUEST.price_total,
      status: newREQUEST.status,
      id_user: REQUEST.id_user
    }
    
    await contextRequests.update('id_request', id_request, newREQUEST);
    const [updatedRequest]: any = await contextRequests.read(EXPECTED);

    const received = {
      id_user: updatedRequest.id_user,
      price_total: updatedRequest.price_total,
      status: updatedRequest.status
    }
    
    
    assert.deepEqual(received, EXPECTED);
    assert.deepEqual(resRequest, REQUEST);
  });
})