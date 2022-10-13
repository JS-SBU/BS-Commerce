import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CustomerProduct, IProductSearchSchema } from '@bs-commerce/models';

import { userAPI } from 'APIs';
import Icon from '@/modules/search/icon';
import ProductInfo from '@/modules/global/components/product/productInfo';

interface SingleProduct {
  product: IProductSearchSchema;
  imgHeight?: number;
  imgWeight?: number;
}

const Product = ({ product, imgHeight, imgWeight }: SingleProduct) => {
  const [customerProduct, setCustomerProduct] = useState<CustomerProduct>();
  const getProduct = async () => {
    const res = await userAPI.getPublicProductsById(product.id);
    if ('data' in res!) setCustomerProduct(res.data);
    return res;
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div
      className="duration-0 my-3 mx-auto w-fit justify-items-center transition hover:bg-white hover:duration-700"
      id="searchProductTestID"
    >
      <Link
        href={{
          pathname: `product/${customerProduct?.meta.friendlyPageName}`,
          // query: {
          //   id: product.id,
          //   name: product.info.name,
          // },
        }}
        passHref
      >
        <div className="group relative grid cursor-pointer grid-cols-2 ">
          {product.photos![0].url ? (
            <Image
              src={product.photos![0].url!}
              alt={product.photos![0].alt}
              height={imgHeight ? imgHeight : 120}
              width={imgWeight ? imgWeight : 120}
              className="col-span-2"
            />
          ) : (
            'Problem Loading Image'
          )}

          <div className="absolute bottom-12 right-0 w-36 origin-left transition-transform duration-300 hover:-translate-y-3 group-hover:scale-100 md:scale-0">
            {customerProduct && <Icon product={customerProduct} />}
          </div>
          <div className="col-span-1">
            {customerProduct && <ProductInfo product={customerProduct} />}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;