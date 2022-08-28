import type { GetServerSideProps, NextPage } from 'next';

import CartComponent from '@/components/cart/index';
import { Cart, ResponseItem } from 'models';
import { userAPI } from 'APIs';
import { useAppDispatch } from 'customHooks/hooks';
import { storeAllCartItems } from 'toolkit/cartSlice';
var cookie = require('cookie');

interface Props {
  cartProducts: ResponseItem[];
}

const Cart: NextPage<Props> = ({ cartProducts }: Props) => {
  const dispatch = useAppDispatch();
  dispatch(storeAllCartItems(cartProducts));

  return (
    <>
      <div>
        <CartComponent />
      </div>
    </>
  );
};

export default Cart;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqCookie = context.req.headers.cookie;
  const token = reqCookie === undefined ? undefined : cookie.parse(reqCookie);
  let response;
  if (reqCookie) {
    response = await userAPI.getCart(token.token);
  }
  return {
    props: {
      cartProducts: response?.data?.items!,
    },
  };
};
