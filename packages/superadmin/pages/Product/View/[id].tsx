import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userAPI } from "../../../APIs";
import ViewProduct from "../../../components/products/productView.component";

const LogDetailPage: NextPage = () => {
  // const LogDetailPage: NextPage = ({ product }) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>();
  const id = "" + `${router.query.id}`;

  const getAllProducts = async () => {
    const res = await userAPI.getProduct({ productId: `${id}` });
    res?.data ? setProduct(res.data) : "";
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="bg-light px-5">
      <main>
        {product ? <ViewProduct product={product} /> : "Nothing Found"}
      </main>
    </div>
  );
};
// export async function getServerSideProps(context) {
//   const res = await userAPI.getProduct({ productId: context.params.id });
//   return {
//     props: { product: res?.data },
//   };
// }

export default LogDetailPage;