import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from '../instances/mysql';

export interface ProductsInstance extends Model {
  id_product: number;
  name: string;
  type: string;
  price: number;
  category: string;
  producer: string;
  created_at: Date;
  updated_at: Date;
}

const ProductsSchema = database.define<ProductsInstance>(
  'products', 
  {
    id_product: {
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    producer: {
      type: DataTypes.STRING,
      allowNull: false
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
    timestamps: false,
    tableName: 'products',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeSave: (product, options) => {
        product.updated_at = new Date();
      },
    },
  }
)

export default ProductsSchema;