import { Model, DataTypes } from 'sequelize';
import { database } from '../instances/mysql';
import ICrud from '../strategies/interface/interface';

interface ProfilesInstance extends Model {
  id: number;
  profile: string;
}

const ProfilesSchema = database.define<ProfilesInstance>(
  'profiles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false,
    tableName: 'profiles',
  }
)

export default ProfilesSchema;
