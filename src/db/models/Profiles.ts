import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from '../instances/mysql';

interface ProfilesInstance extends Model {
  id: number;
  profile: string;
  created_at: Date;
  updated_at: Date;
}

const ProfilesSchema = database.define<ProfilesInstance>(
  'profiles',
  {
    id_profile: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
  }, {
    timestamps: true,
    tableName: 'profiles',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeSave: (profile, options) => {
        profile.updated_at = new Date();
      },
    },
  }
)

export default ProfilesSchema;
