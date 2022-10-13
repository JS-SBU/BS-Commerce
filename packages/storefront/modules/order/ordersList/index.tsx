import { FC, useEffect, useState } from 'react';
import Breadcrumb from '@/modules/global/breadcrumbs/breadcrumb';
import DataTable from '@/modules/order/ordersList/dataTable';
import Link from 'next/link';
import { userAPI } from 'APIs';
import withAuth from '@/modules/auth/withAuth';
import { useAppSelector } from 'store/hooks/index';
import { OrderByUserId, OrderByUserIdResponse } from '@bs-commerce/models';

const OrderMain: FC = () => {
  // const storedOrderProducts = orderProducts?.data?.orderInfo;
  const [allOrderList, setAllOrderList] = useState<OrderByUserId[]>([]);

  const token = useAppSelector(
    (state) => state.persistedReducer.auth.access_token
  );

  const getAllOrders = async () => {
    const orderListRes = await userAPI.getOrderProducts(token).then((res) => {
      setAllOrderList(res?.orderInfo!);
    });
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
      <section className="container mx-auto px-4 ">
        <div className="flex flex-col items-center border-b py-6">
          <div
            className={
              allOrderList?.length
                ? 'mb-2 w-full overflow-x-scroll xl:overflow-x-hidden'
                : 'mb-10'
            }
          >
            {allOrderList?.length ? (
              <DataTable storedOrderProducts={allOrderList} />
            ) : (
              'You have not placed any order yet'
            )}
          </div>
          <div className="mt-1" style={{ textAlign: 'center' }}>
            <button className="rounded-md bg-primary py-4 px-6 font-light text-white transition-all duration-200 ease-linear hover:bg-stone-900 dark:bg-dark_primary">
              <Link href="/">Go to home page</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default withAuth(OrderMain);