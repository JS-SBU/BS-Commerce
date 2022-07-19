import Link from 'next/link';
import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { userAPI } from 'APIs';
import { Product } from 'models';
import { addToCart } from 'toolkit/cartSlice';
import { setModalState } from 'toolkit/modalSlice';
import { addToWishlist, storeWishlist } from 'toolkit/productsSlice';
import { storeProductsToCompare } from 'toolkit/compareSlice';
import { useAppDispatch, useAppSelector } from 'customHooks/hooks';

import Breadcrumb from '@/components/global/breadcrumbs/breadcrumb';
import ProductImagesSlider from '@/components/product/product-image-slider';
import ProductDescription from '@/components/product/productDescription';
import Modal from '@/components/comparison';
interface SingleProduct {
  product: Product;
}

const ProductDetailsComponent: React.FC<SingleProduct> = ({
  product,
}: SingleProduct) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const wishlistData = useAppSelector(state => state.persistedReducer.product.wishlist);
  const findWishlistProduct = wishlistData?.items?.find(item => item.productId === product.id);

  const token = useAppSelector(
    (state) => state.persistedReducer.auth.access_token
  );

  var isAvailable = true;
  var disableDecrement = false;
  var disableIncrement = false;
  let i = 0;
  let clicked = false;

  const [size, setSize] = useState('s');
  const [color, setColor] = useState('white');
  const [amount, setAmount] = useState(1);
  const [cart, setCart] = useState([{}]);
  const [wishlist, setWishlist] = useState([]);
  const [modalCmp, setModalCmp] = useState(false);

  if(findWishlistProduct) {
    clicked = true;
  }

  const handleAddToCompare = async () => {
    try {
      await userAPI.addToCompare(product.id);
    } catch (error) {
      toast.error('Error happend.');
    }
  };

  const modalState = useAppSelector(
    (state) => state.persistedReducer.modal.setModal
  );

  const toCart = async (product: Product) => {
    const cartProduct = {
      id: product.id!,
      info: product.info!,
      photos: product.photos!,
    };
    const cartItem = {
      product: cartProduct!,
      productId: product.id!,
      quantity: amount,
    };
    setAmount(0);
    dispatch(addToCart(cartItem));
  };

  const toWishlist = async (id: string, quantity: number) => {
   if (token) {
      const data = {
        productId: id,
        quantity,
      };
      const reduxData = {
        product: {
          id: id,
          info: product.info,
          photos: product.photos
        },
        productId: id,
        quantity: quantity
      }
      try {
        await userAPI.addToWishList(data);
        const newList = await userAPI.getCustomerWishlist(token);
        console.log(newList);
        dispatch(storeWishlist(newList));
        clicked = true;
        toast.success('Item added to wishlist');
      } catch (error) {
        console.log(error);
        toast.error('Failed to add item to wishlist');
      }
    }
    else {
      toast.error('Please login to your account first.');
      router.push('/account/sign-in')
    }
  };

  useState(() => {
    dispatch(setModalState(false));
  }, [router.asPath]);

  return (
    <>
      <Breadcrumb
        title={product?.info?.name}
        pathArray={['Home', product.info?.name]}
        linkArray={['/', '/product' + product.id]}
      />
      {
        modalState && <Modal setModal={true} />
      }
      <section className="body-font overflow-hidden bg-white text-gray-700">
        <div className="container mx-auto px-5 py-24">
          <div>
            <div className="mx-auto flex flex-wrap">
              <div className="md:w-1/2 w-full">
                <div className="relative inset-0 bg-cover bg-center z-0">
                  <ProductImagesSlider product={product}></ProductImagesSlider>
                </div>
              </div>
              <div className="md:w-1/2 w-full md:pl-5 mt-10 md:mt-0 ">
                <h2 className="text-gray-900 text-xl title-font font-normal mb-1">
                  {product.info.name}
                </h2>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <div className="mb-1 mt-2 flex"></div>
                <div className="ml-1 mb-1 mt-2 text-gray-900">
                  <span className="text-sm">Vendor: {product?.vendor}</span>
                  <span className="ml-2 mr-2 text-sm">|</span>
                  <span className="text-sm">SKU: {product?.info?.sku}</span>
                </div>
                <div className="flex">
                  <span className="title-font mt-2 mb-2 ml-1 text-2xl font-medium text-green-600">
                    ${product?.info?.price}
                  </span>
                </div>
                <div className="flex">
                  <span className="ml-1 mb-1 mt-2 text-sm text-gray-900">
                    Availability:
                  </span>
                  {isAvailable ? (
                    <span className="ml-2 mb-1 mt-2 text-sm text-green-600">
                      {product?.stock} left in stock
                    </span>
                  ) : (
                    <span className="ml-2 mb-1 mt-2 text-sm text-green-600">
                      Out of stock
                    </span>
                  )}
                </div>

                <p className="ml-1 mb-1 mt-2 text-sm text-gray-900">
                  {product?.info?.fullDescription}
                </p>
                {product?.info?.size && (
                  <div className="mt-2 mb-2 flex items-center">
                    <div className="ml-1 flex items-center">
                      <span className="mr-3">Size:</span>
                      <div className="flex">
                        <button
                          onClick={() => setSize('s')}
                          className="hover:text-green-600 m-2"
                        >
                          s
                        </button>
                        <button
                          onClick={() => setSize('m')}
                          className="hover:text-green-600 m-2"
                        >
                          m
                        </button>
                        <button
                          onClick={() => setSize('l')}
                          className="hover:text-green-600 m-2"
                        >
                          l
                        </button>
                        <button
                          onClick={() => setSize('xl')}
                          className="hover:text-green-600 m-2"
                        >
                          xl
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {product?.info?.color && (
                  <div className="mt-2 mb-2 flex items-center">
                    <div className="flex">
                      <span className="mr-3">Color:</span>
                      <button
                        onClick={() => setColor('white')}
                        className="border-2 border-gray-300 w-6 h-6 active:outline"
                      ></button>
                      <button
                        onClick={() => setColor('black')}
                        className="border-2 border-gray-300 ml-3 bg-gray-700 w-6 h-6 active:outline"
                      ></button>
                      <button
                        onClick={() => setColor('red')}
                        className="border-2 border-gray-300 ml-3 bg-red-500 w-6 h-6 active:outline"
                      ></button>
                    </div>
                  </div>
                )}

                <div className="flex text-black">
                  <div className="flex lg:mx-2 title-text items-center">
                    Quantity
                    <div className="m-1 md:ml-4 border-2 border-gray-200 rounded">
                      <button
                        onClick={() => setAmount(amount - 1)}
                        {...(amount <= 1 ? (disableDecrement = true) : null)}
                        disabled={disableDecrement}
                        className="p-2"
                      >
                        -
                      </button>
                      <span className="p-2">{amount}</span>
                      <button
                        onClick={() => setAmount(amount + 1)}
                        disabled={disableIncrement}
                        className="p-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {isAvailable ? (
                    <button
                      onClick={() => toCart(product.id)}
                      className="my-1 ml-2 text-white bg-green-600 px-2 lg:px-16 sm:px-12 rounded focus:outline-none hover:bg-gray-600"
                      type="button"
                      data-modal-toggle="popup-modal"
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button
                      disabled={true}
                      className="my-1 ml-2 text-white bg-green-600 px-2 lg:px-16 sm:px-12 rounded focus:outline-none hover:bg-gray-600"
                    >
                      Soldout
                    </button>
                  )}
                </div>
                <div className=" flex flex-wrap">
                  <Link href="/cart" passHref>
                    <button
                      disabled={!isAvailable}
                      className="rounded mt-5 ml-1 bg-black flex w-full  md:px-32 items-center justify-center py-2 text-white hover:bg-green-400 transition duration-200 ease-out hover:ease-in	"
                    >
                      <span className="mx-auto">Buy Now</span>
                    </button>
                  </Link>
                </div>
                <div className="text-grey-700 ml-1">
                  <div>
                    <button
                      onClick={() => toWishlist(product?.id!, 1)}
                      disabled = {clicked ? true : false}
                      className="mt-10 hover:text-green-600"
                    >
                      {clicked ? 'Added to wishlist' : '+ Add to wishlist'}
                    </button>
                  </div>
                  <div>
                    <button
                      className="mt-2 hover:text-green-600"
                      onClick={() => {
                        handleAddToCompare();
                        dispatch(setModalState(!modalCmp));
                        dispatch(storeProductsToCompare(product));
                      }}
                    >
                      + Compare
                    </button>
                  </div>
                  <div>
                    <button className=" mt-2 flex hover:text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Ask about this product
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <ProductDescription product={product}></ProductDescription>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsComponent;