import assert from 'assert';
import UsersSchema from "../../db/models/Users";
import MySql from '../../db/strategies/mySql';
import ContextStrategy from "../../db/strategies/base/contextStrategy";


const context = new ContextStrategy(new MySql(UsersSchema));


const PROFILE = {
  name: "test",
  email: "test@example.com",
  password: "123456",
  datebirth: "29/04/2004",
  profile: 22
}

const PROFILE_UPDATE = {
  name: "testUPDATE",
  email: "testUPDATE@example.com",
  password: "123456",
  datebirth: "29/04/2003",
  profile: 22
}

const NEW_PROFILE = {
  name: "testNEW",
  email: "testNEW@example.com",
  password: "1234567",
  datebirth: "29/04/2002",
  profile: 22
}

describe('Users model', () => {
  beforeAll(async () => {
    await context.delete(-1);
    await context.create(PROFILE_UPDATE);
  });

  it('Users connection', async () => {
    const res = await context.isConnected();
    assert.equal(res, true);
  });
  
  it('User create', async () => {
    const res = await context.create(PROFILE);
    const resJSON = JSON.parse(JSON.stringify(res));
    
    delete resJSON.id;

    assert.deepEqual(resJSON, PROFILE);
  });

  it('User read', async () => {
    const res = await context.read(PROFILE);

    const [resJSON] = JSON.parse(JSON.stringify(res));
    delete resJSON.id;
    
    assert.deepEqual(resJSON, PROFILE);
  });

  it('User update', async () => {
    const itemUpdate = await context.read(PROFILE_UPDATE);
    const [itemUpdateJSON] = JSON.parse(JSON.stringify(itemUpdate));

    const res = await context.update(itemUpdateJSON.id, NEW_PROFILE);

    const itemUpdated = await context.read(itemUpdateJSON.id);
    const [itemUpdatedJSON] = JSON.parse(JSON.stringify(itemUpdated));

    assert.deepEqual(res, [1])
    assert.deepEqual(itemUpdatedJSON.profile, NEW_PROFILE.profile)
  });

  it('User delete', async () => {
    const item = await context.read(NEW_PROFILE);
    const [itemJSON] = JSON.parse(JSON.stringify(item));
    
    const res = await context.delete(itemJSON.id);

    assert.deepEqual(res, 1)
  });
})

