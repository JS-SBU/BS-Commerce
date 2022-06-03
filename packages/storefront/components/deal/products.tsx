import type { NextComponentType } from "next";
import productData from "../../allData/product-data.json";
import Product from "../deal/singleProduct";

const Products: NextComponentType = (props) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-5 justify-items-center">
                {productData["products"] &&
                    productData["products"].length > 0 &&
                    productData.products.map((product: any) => (
                        <Product key = {product.id} product={product}></Product>
                    ))}
            </div>
        </>
    );
};

export default Products;