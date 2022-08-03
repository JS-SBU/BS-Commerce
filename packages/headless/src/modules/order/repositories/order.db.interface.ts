import { Injectable } from '@nestjs/common';
import { IOrderCreateData, IProductOrderData } from 'models';

import { 
  ChangeStatusEntity, 
  GetAllOrderQueryEntity, 
  OrderEntity, 
  OrderIncompleteStatEntity, 
  OrderResponseEntity, 
  OrderStatEntity 
} from 'src/entity/order';

@Injectable()
export abstract class IOrderDatabase {
  abstract createOrder: (userId: string, body: IOrderCreateData) => Promise<OrderEntity>;
  abstract addPhotoDetails: (products: IProductOrderData[]) => Promise<IProductOrderData[]>;
  abstract getOrderListByUserId: (userId: string) => Promise<OrderEntity[]>;
  abstract getOrderById: (orderId: string) => Promise<OrderResponseEntity>;
  abstract getOrderStatistics:() => Promise<OrderStatEntity>
  abstract getIncompleteStatistics:() => Promise<OrderIncompleteStatEntity>
  abstract changeStatus:(body: ChangeStatusEntity) => Promise<OrderEntity>
  abstract getOrderList: (query?: GetAllOrderQueryEntity, skip?: number, limit?: number) => Promise<OrderEntity[]>
}
