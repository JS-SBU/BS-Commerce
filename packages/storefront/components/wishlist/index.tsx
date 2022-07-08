import React from 'react';
import Link from 'next/link';

import { NextComponentType } from 'next';

import { userAPI } from 'APIs';
import { toast } from 'react-toastify';
import { deleteItemFromWishlist } from 'toolkit/ProductsSlice';
import { useAppDispatch, useAppSelector } from 'customHooks/hooks';

import Picture from '@/components/global/components/product/common/picture';
import Breadcrumb from '@/components/global/breadcrumbs/breadcrumb';
import WishlistIcon from '@/components/wishlist/wishlist-icon';
import WishlistProductInfo from '@/components/wishlist/wishlistProduct';

const WishlistComponent: NextComponentType = () => {
  const dispatch = useAppDispatch();

  const wishlistData = useAppSelector(
    (state) => state.persistedReducer.product.wishlist
  );

  async function handleClick(data: string) {
    try {
      await userAPI.deleteWishlistItem(data);
      toast.success('Item removed from wishlist');
      dispatch(deleteItemFromWishlist(data));
    } catch (error) {
      toast.error('Failed to remove item from wishlist');
    }
  }

  return (
    <>
      <Breadcrumb
        title="Wishlist"
        pathArray={['Home', 'Wishlist']}
        linkArray={['/', '/wishlist']}
      />
      <div className="mx-5 mt-10 flex flex-wrap justify-center gap-5 sm:mx-5 md:mx-7 lg:mx-10 xl:mx-10">
        {wishlistData.items?.length === 0 && (
          <div className="mx-16 mb-10">
            <div className="mx-16 my-2">
              <WishlistIcon height="h-16" width="w-16" />
            </div>
            <p className="text-xl text-green-600/100">Your wishlist is empty</p>
            <Link href="/" passHref>
            <div className="flex flex-wrap justify-center my-2 cursor-pointer hover:text-green-600/100">
              <p>
                Continue Shopping
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            </Link>
          </div>
        )}
        {wishlistData?.items?.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <div className="flex flex-col flex-wrap items-center">
                <Link href={`/product/${data?.productId}`} passHref>
                  <div className="flex w-28 cursor-pointer flex-col items-center justify-center sm:w-28 md:w-44 lg:w-56 xl:w-56">
                    <Picture
                      src={data.product?.photos[0]?.url!}
                      alt={data.product?.info.shortDescription}
                      width={200}
                      height={200}
                    />
                    <div className="text-center">
                      <WishlistProductInfo product={data?.product!} />
                    </div>
                  </div>
                </Link>
                <button
                  className="mb-5 mt-2 items-center text-center"
                  onClick={() => {
                    handleClick(data.productId);
                  }}
                >
                  <WishlistIcon height="h-6" width="w-6" />
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default WishlistComponent;
