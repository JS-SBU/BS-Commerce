import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderByUserIdResponse, User } from 'models';

import { OrderCustomerService } from '../services/customer.service';
import { CreateOrderModel, OrderSortingQueryModel, SingleOrderResponse, SingleUserOrderList, ReOrderResponse, ReOrderRequestModel } from './order.customer.model';
import { User as UserInfo } from 'src/decorators/auth.decorator';
import { RolesGuard } from 'src/guards/auth.guard';

@UseGuards(new RolesGuard(['customer']))
@Resolver()
export class CustomerOrderResolver {
    constructor (private customerOrderService: OrderCustomerService){}

    @Query(returns => SingleOrderResponse)
    async getOrderByOrderId(@Args('orderId') orderId: string){
        return await this.customerOrderService.getOrderByOrderId(orderId);
    }

    @Query(returns => SingleUserOrderList)
    async getOrderListByUserId(
        @UserInfo() user: User, 
        @Args('sortObj') sortObj: OrderSortingQueryModel
    ){
        return await this.customerOrderService.getOrderListByUserId(user.id, sortObj);
    }
    
    @Mutation(returns => SingleOrderResponse)
    async createOrder(
        @UserInfo() user: User,
        @Args('order') order: CreateOrderModel
    ){
        return await this.customerOrderService.createOrder(user.id, order, order.products);
    }

    @Mutation(returns => ReOrderResponse)
    async reOrder (
        @UserInfo() user: User,
        @Args('reOrder') reOrder: ReOrderRequestModel
    ){
        return await this.customerOrderService.reOrder(user.id, reOrder);
    }
}