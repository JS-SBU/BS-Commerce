import { SwiperSlide } from "swiper/react";

import ProductShow from "./product";
import productData from "../../../allData/product-data.json";
import SwiperGrid from "@/components/global/components/swipergrid";
import Container from "@/components/global/components/container";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/pagination";
import { productInterface } from "./models";
import { Product } from "models";

interface Products {
  products: Product[];
}

const FeaturedProducts = ({products}: Products) => {
  const getMinimumProduct =()=>{
    const w = window.innerWidth;
    if(w>=980) return 9;
    return 6;
  }
  return (
    <Container className="max-w-6xl">
      <div className="text-center mb-6">
        <p className="text-lg font-serif italic">Recently added our store</p>
        <h1 className="text-4xl text-bold ">Featured Products</h1>
      </div>
      <SwiperGrid
        slidesPerViewmobile={1}
        slidesPerView768={2}
        slidesPerView980={3}
        rows={3}
        loop={products.length>getMinimumProduct() ? true : false}
      >
        {products &&
          products.length > 0 &&
          products.map((product: any) => (
            <SwiperSlide key={product.id} className="justify-items-center">
              <ProductShow product={product} />
            </SwiperSlide>
          ))}
      </SwiperGrid>
    </Container>
  );
};

export default FeaturedProducts;