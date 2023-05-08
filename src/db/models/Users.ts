import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from '../instances/mysql';

import ProfilesSchema from './Profiles';


interface UsersInstance extends Model {
  id: number;
  name: string;
  password: string;
  email: string;
  datebirth: Date;
  profile: number;
  created_at: Date;
  updated_at: Date;
}


const UsersSchema = database.define<UsersInstance>(
  'users',
  {
    id_user: {
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
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    id_profile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProfilesSchema,
        key: 'id_profile',
      }
    }
  }, {
    timestamps: false,
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeSave: (user, options) => {
        user.updated_at = new Date();
      },
    },
  }
)

export default UsersSchema;
