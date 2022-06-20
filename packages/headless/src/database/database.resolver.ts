// Mongodb dependency implementations
import { UserDatabase as UserDatabaseMongo } from './mongodb/user';
import { UserDatabase as UserDatabaseMysql } from './mysql/user/user';
import { ProductDatabase as ProductDatabaseMongo } from './mongodb/product';
import { ManufacturerDatabase as ManufacturerDatabaseMongo } from './mongodb/manufacturer';
import { ManufacturerDatabase as ManufacturerDatabaseMysql } from './mysql/manufacturer/manufacturer';
import { CategoryDatabase as CategoryDatabaseMongo } from './mongodb/category';
import { CustomerDatabase as CustomerDatabaseMongo } from './mongodb/customer';
import { dbConfig } from 'config/database';
import { CartDatabase as CartDatabaseMongo } from './mongodb/cart';

type CLASS_NAME = 'WISHLIST' | 'USER' | 'PRODUCT' | 'MANUFACTURER' | 'CATEGORY' | 'CART' | 'CUSTOMER_AUTH';
const db = dbConfig.db;

export function ResolveDatabaseDependency(className: CLASS_NAME) {
  try {
    switch (db) {
      case 'MONGO':
        switch (className) {
          case 'USER':
            return UserDatabaseMongo;
          case 'PRODUCT':
            return ProductDatabaseMongo;
          case 'MANUFACTURER':
            return ManufacturerDatabaseMongo;
          case 'CATEGORY':
            return CategoryDatabaseMongo;
          case 'CUSTOMER_AUTH':
            return CustomerDatabaseMongo;
          case 'CART':
            return CartDatabaseMongo; 
            
          default:
            break;
        }
      case 'MYSQL':
        switch (className) {
          case 'USER':
            return UserDatabaseMysql;
          case 'MANUFACTURER':
            return ManufacturerDatabaseMysql;

          default:
            break;
        }

      default:
        throw new Error('No dependency implementation found');
    }
  } catch (err) {
    console.error('Error resolving database dependency');
  }
}
