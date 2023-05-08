import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from '../instances/mysql';
import UsersSchema from './Users';

export interface RequestsInstance extends Model {
  id_requests: number;
  id_user: number;
  status: number;
  price_total: number;
  created_at: Date;
}

const RequestsSchema = database.define<RequestsInstance>(
  'requests', 
  {
    id_request: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UsersSchema,
        key: 'id_user',
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, {
    timestamps: true,
    tableName: 'requests',
    createdAt: 'created_at',
    updatedAt: false
  }
)

export default RequestsSchema;