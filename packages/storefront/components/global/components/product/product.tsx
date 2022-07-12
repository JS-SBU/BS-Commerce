import Link from "next/link";

import { CustomerProduct } from "models";

import ProductInfo from "@/components/global/components/product/common/productInfo";
import Picture from "@/components/global/components/product/common/picture";
import Icon from "@/components/global/components/icon";

interface SingleProduct {
  product: CustomerProduct;
}

const Product = (props: SingleProduct) => {
  const { product } = props;

  return (
    <>
      <Link href={`product/${product?.id}`} passHref>
        <div className="mb-0 overflow-hidden" key={product?.id}>
          <div className="transition duration-0 hover:duration-700 group hover:bg-white cursor-pointer">
            <div className="rounded overflow-hidden max-w-sm">
              <div className="relative flex items-center justify-center flex-col">
                <div className="relative text-white overflow-hidden transition-all duration-700">
                  <div className="relative inset-0 bg-cover bg-center z-0">
                    <Picture
                      product={product}
                      height={212}
                      width={212}
                      src={product?.photos[0]?.url}
                      alt={product?.info?.name}
                    />

                    {product?.info?.oldPrice !== 0 ? (
                      <div className="border text-xs border-[#40a944] rounded-lg bg-[#40a944] absolute top-3 left-3 px-1 py-1 text-white">
                        <p>Sale</p>
                      </div>
                    ) : null}

                    {product?.discountPercentage && product?.stock > 0 ? (
                      <div className="border border-[#40a944] rounded-lg bg-[#40a944] absolute top-3 right-3 px-1 py-1 text-white text-xs">
                        <p>{`-${product?.discountPercentage}%`}</p>
                      </div>
                    ) : null}
                    {product?.info?.oldPrice !== 0 ? (
                      <div className="border border-[#40a944] rounded-lg bg-[#40a944] absolute top-3 right-3 px-1 py-1 text-white text-xs">
                        <p>{`-$${Math.abs(
                          product?.info?.oldPrice - product?.info?.price
                        )}`}</p>
                      </div>
                    ) : (
                      null
                    )}
                  </div>
                </div>
                <div className="hover:-translate-y-3 opacity-0 hover:opacity-70 duration-300 absolute inset-0 z-10 flex justify-center items-center text-black font-semibold">
                  <Icon product={product} />
                </div>
                <ProductInfo product={product} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;