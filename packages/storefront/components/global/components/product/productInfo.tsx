import React from "react";

import { CustomerProduct } from "models";

interface SingleProduct {
  product: CustomerProduct
}

const ProductInfo = (props: SingleProduct) => {
  const { product } = props;
  return (
    <div>
      <div className="px-6">
        <div className="text-base font-medium text-gray-600">
          {product?.info?.name}
        </div>
        <p className="text-xs font-['arial'] text-gray-600 py-2">
          {product?.tags[0]}
        </p>
        <p className="text-base font-semibold text-green-600">
          {product?.info?.price}
          {product?.info?.oldPrice ? (
            <span className="text-xs font-semibold text-black ml-2">
              <s>$</s>
              {product?.info?.oldPrice ? <s>{product?.info?.oldPrice}</s> : null}
            </span>
          ) : (
            null
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;