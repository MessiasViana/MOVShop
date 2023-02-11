import assert from 'assert';
import ProfilesSchema from "../../db/models/Profiles";
import MySql from '../../db/strategies/mySql';
import ContextStrategy from "../../db/strategies/base/contextStrategy";


const context = new ContextStrategy(new MySql(ProfilesSchema));

const PROFILE = {
  profile: "Client"
}

const PROFILE_UPDATE = {
  profile: "ClientUPDATE"
}

const NEW_PROFILE = {
  profile: "newProfile"
}

describe('Profile model', () => {
  beforeAll(async () => {
    await context.delete(-1);
    await context.create(PROFILE_UPDATE);
  });

  it('Profile connection', async () => {
    const res = await context.isConnected();
    assert.equal(res, true);
  });
  
  it('Profile create', async () => {
    const res = await context.create(PROFILE);
    const resJSON = JSON.parse(JSON.stringify(res));
    
    delete resJSON.id;

    assert.deepEqual(resJSON, PROFILE);
  });

  it('Profile read', async () => {
    const res = await context.read();

    const [resJSON] = JSON.parse(JSON.stringify(res));
    delete resJSON.id;
    
    assert.deepEqual(resJSON, PROFILE);
  });

  it('Profile update', async () => {
    const itemUpdate = await context.read(PROFILE_UPDATE);
    const [itemUpdateJSON] = JSON.parse(JSON.stringify(itemUpdate));

    const res = await context.update(itemUpdateJSON.id, NEW_PROFILE);

    const itemUpdated = await context.read(itemUpdateJSON.id);
    const [itemUpdatedJSON] = JSON.parse(JSON.stringify(itemUpdated));

    assert.deepEqual(res, [1])
    assert.deepEqual(itemUpdatedJSON.profile, NEW_PROFILE.profile)
  });

  it('Profile delete', async () => {
    const item = await context.read(NEW_PROFILE);
    const [itemJSON] = JSON.parse(JSON.stringify(item));
    
    const res = await context.delete(itemJSON.id);

    assert.deepEqual(res, 1)
  });
})

