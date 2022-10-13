import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { SwiperSlide } from 'swiper/react';
import { NextComponentType } from 'next';

import { useAppSelector } from 'store/hooks/index';

import Banner from '@/modules/home/bestSell/banner';
import ProductRow from '@/modules/home/bestSell/productRow.component';
import SwiperGrid from '@/modules/global/components/swipergrid';
import Container from '@/modules/global/components/container';
import { CustomerProduct } from '@bs-commerce/models';

const BestSell: NextComponentType = () => {
  const { t } = useTranslation();

  const products = useAppSelector(
    (state) => state.persistedReducer.product.publicProducts
  );
  const getMinimumProduct = () => {
    const w = window.innerWidth;
    if (w >= 980) return 6;
    return 3;
  };
  return (
    <>
      <Container className="">
        <div className="mb-6 text-center">
          <p className="font-serif text-lg italic">
            {t('home:recently_added')}
          </p>
          <h1 className="text-bold text-4xl ">{t('home:best_sell')}</h1>
        </div>
        <div className="flex w-full flex-wrap">
          <div className="w-full px-3 md:w-5/12 lg:w-2/6 lg:px-0">
            <Link href="/">
              <a>
                <Banner />
              </a>
            </Link>
          </div>
          <div className="w-full md:w-6/12 md:pl-5 lg:w-4/6">
            <SwiperGrid
              slidesPerViewmobile={1}
              slidesPerView768={1}
              slidesPerView980={2}
              rows={1}
              loop={products?.length > getMinimumProduct() ? true : false}
            >
              {products &&
                products.length > 0 &&
                products.map((product: CustomerProduct, index: number) =>
                  index % 3 === 2 ? (
                    <React.Fragment
                      key={product?.id! + products[index - 1]?.id}
                    >
                      <SwiperSlide key={Math.random() * 999999}>
                        <ProductRow
                          products={[
                            products[index - 2],
                            products[index - 1],
                            products[index],
                          ]}
                        />
                      </SwiperSlide>
                    </React.Fragment>
                  ) : index + 1 === products.length ? (
                    <React.Fragment
                      key={product?.id! + products[index - 1]?.id}
                    >
                      <SwiperSlide key={Math.random() * 999999}>
                        <ProductRow
                          products={[
                            products[index],
                            index % 3 === 0 &&
                            products.length > getMinimumProduct()
                              ? products[0]
                              : products[index - 1],
                            index % 3 === 0 &&
                            products.length > getMinimumProduct()
                              ? products[1]
                              : products[0],
                          ]}
                        />
                      </SwiperSlide>
                    </React.Fragment>
                  ) : null
                )}
            </SwiperGrid>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BestSell;