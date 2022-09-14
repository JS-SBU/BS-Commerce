import { FC } from 'react';
import { useAppSelector } from 'customHooks/hooks';
import CategoryProductCard from '@/components/cateoryProducts/categoryProducts/categoryProductCard';

const CategoryProductSegment: FC = () => {
  const products = useAppSelector(
    (state) => state.persistedReducer.product.categorizedProduct
  );

  return (
    <>
      <div>
        {products && products[0] ? (
          <div className="grid grid-cols-1 justify-items-center gap-2 md:grid-cols-2 md:gap-2 lg:ml-8 lg:w-fit lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[25px]">
            {products.map((product) => (
              <CategoryProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="m-auto text-center">
            There is no product in this category
          </p>
        )}
      </div>
    </>
  );
};

export default CategoryProductSegment;