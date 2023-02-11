import { Model, DataTypes } from 'sequelize';
import { database } from '../instances/mysql';

import { ProfilesSchema } from './Profiles';


interface UsersInstance extends Model {
  id: number;
  name: string;
  password: string;
  email: string;
  datebirth: Date;
  profile: number;
}


const UserSchema = database.define<UsersInstance>(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datebirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
      references: {
        model: ProfilesSchema,
        key: 'id',
      }
    }
  }, {
    timestamps: false,
    tableName: 'users',
  }
)

export default UserSchema;
