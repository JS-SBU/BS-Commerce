import type { NextComponentType } from "next";
import React, { useState } from "react";
import Buttons from "../../../global/components/buttons/button";
import Image from "next/image";
interface IICardData {
  id: number;
  meta: {
    title: string;
    price: string;
    img: string;
  };
  quantity: string;
}
const DataTable = (props: { cartDatas: IICardData[] }) => {
  const tableData = () => {
    return props.cartDatas.map((cartData) => {
      return (
        <tr key={cartData.id}>
          <td className="border border-slate-300 px-8 md:px-4 py-4">
            <Image
              src={cartData.meta.img}
              alt="product Image"
              width={130}
              height={120}
            />
          </td>
          <td className="border border-slate-300 md:px-4 xl:px-10 py-10">
            {cartData.meta.title}
          </td>
          <td className="border border-slate-300 px-6 py-14 ">
            <span className="flex justify-center"> {cartData.meta.price}</span>
          </td>
          <td className="border border-slate-300 md:px-4 xl:px-10 py-4">
            <div className="box-content h-4 w-20 p-4 border-4">
              <div className="flex justify-between">
                <button>+</button>
                <div>{cartData.quantity}</div>
                <button>-</button>
              </div>
            </div>
          </td>
          <td className="border border-slate-300 md:px-4 xl:px-8 py-14">
            $55.00
          </td>
          <td className="border border-slate-300 md:px-6 xl:px-12 py-14">
            <button className="flex justify-center">X</button>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <div className="md:px-2 lg:px-20 xl:px-30 2xl:40 py-20">
        <table className="border-collapse border border-slate-400">
          <thead className="">
            <tr>
              <th className="border-0 border-slate-300 border-b border-green-600 px-16 py-4 md:px-12 text-base bg-slate-200">
                Image
              </th>
              <th className="border border-slate-300 md:px-2 xl:px-10 py-4 text-base bg-slate-200">
                Product
              </th>
              <th className="border border-slate-300 px-10 py-4 text-base bg-slate-200">
                Price
              </th>
              <th className="border border-slate-300 md:px-4 xl:px-10 py-4 text-base bg-slate-200">
                Quantity
              </th>
              <th className="border border-slate-300 md:px-4 xl:px-6 py-4 text-base bg-slate-200">
                Total
              </th>
              <th className="border border-slate-300 md:px-6 xl:px-10 py-4 text-base bg-slate-200">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData()}
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th className="p-4">
                <Buttons
                  bgColor="black"
                  height={12}
                  width={120}
                  text={"UPDATE CART"}
                />
              </th>
              <th className="p-4">
                <Buttons
                  bgColor="black"
                  height={12}
                  width={150}
                  text={"CONTINUE SHOPPING"}
                />
              </th>
              <th className="p-4">
                <Buttons
                  bgColor="black"
                  height={12}
                  width={120}
                  text={"CLEAR CART"}
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;