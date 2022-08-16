import { IOrderResponseData } from 'models';
import React from 'react';
import CartDetails from '../cartTable/main';
import ReOrder from './re-Order/index';
interface Props {
  singleOrder: IOrderResponseData;
}

const Detail: React.FC<Props> = ({ singleOrder }: Props) => {
  return (
    <>
      <CartDetails singleOrder={singleOrder} />
      <ReOrder singleOrder={singleOrder} />
    </>
  );
};

export default Detail;