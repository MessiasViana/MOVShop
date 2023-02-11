import { Model, DataTypes } from 'sequelize';
import { database } from '../instances/mysql';

export interface ProductsInstance extends Model {
  id: number;
  name: string;
  type: string;
  price: number;
}

const ProductsSchema = database.define<ProductsInstance>(
  'products', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'products',
  }
)

export default ProductsSchema;