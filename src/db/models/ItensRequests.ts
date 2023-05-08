import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from '../instances/mysql';
import ProductsSchema from './Products';
import RequestsSchema from './Requests';

export interface ItensRequestsInstance extends Model {
  id_itens_requests: number;
  id_product: number;
  quantity: number;
  id_request: number;
}

const ItensRequestsSchema = database.define<ItensRequestsInstance>(
  'itens_requests', 
  {
    id_itens_requests: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductsSchema,
        key: 'id_product',
      }
    },
    id_request: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: RequestsSchema,
        key: 'id_request',
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'itens_requests',
  }
)

export default ItensRequestsSchema;