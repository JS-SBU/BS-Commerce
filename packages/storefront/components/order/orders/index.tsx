import WithAuth from '@/components/auth/withAuth';
import Breadcrumb from '@/components/global/breadcrumbs/breadcrumb';
import { userAPI } from 'APIs';
import { useAppSelector } from 'customHooks/hooks';
import { OrderByUserId, OrderByUserIdResponse } from 'models';
import { useEffect } from 'react';
import { useState } from 'react';
import OrderTable from './orderTable';

const Orders = () => {
  const [allOrderList, setAllOrderList] = useState<OrderByUserId[]>([]);

  const token = useAppSelector(
    (state) => state.persistedReducer.auth.access_token
  );

  const getAllOrders = async () => {
    const orderListRes = await userAPI.getOrderProducts(token);
    setAllOrderList(orderListRes?.orderInfo!);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Breadcrumb
        title="My order"
        pathArray={['Home', 'My order']}
        linkArray={['/', '/']}
      />
      <div className="container mx-auto px-4">
        <p className="mt-5 text-2xl font-semibold">Your Order</p>
        {allOrderList?.length ? (
          <OrderTable orderList={allOrderList} />
        ) : (
          'You have not placed any order yet'
        )}
      </div>
    </>
  );
};

export default WithAuth(Orders);