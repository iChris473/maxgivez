import { CameraIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { productItem } from "../modalAtom";

export default function AddProduct() {

  const [counter, setCounter] = useState(1)
  // const [product, SetProduct] = useRecoilState(productItem)
  const product = JSON.parse(window.localStorage.getItem("allGifts"))

  return (
    <div className="w-[99%] md:w-[95%] mx-auto p-4 border rounded-md border-gray-200 max-w-[950px] shadow-md">
      <div className="flex flex-col gap-5 md:grid grid-cols-5 space-x-5">
        <div className="bg-gray-100 p-5 col-span-2 w-full min-h-[250px] flex flex-col items-center justify-center relative">
          <img
            src={product.picture}
            alt=""
            className="w-full h-full absolute object-contain"
          />
        </div>
        <div className="col-span-3 space-y-5 py-5">
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Name
            </p>
            <p className="border-b text-lg text-gray-600 w-full border-gray-400">
              {product.name}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Description
            </p>
            <p className="border-b text-lg text-gray-600 w-full border-gray-400">
            {product.desc}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Price
            </p>
            <p className="border-b text-lg text-gray-600 w-full border-gray-400">NGN {product.price.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Brand
            </p>
            <p className="border-b text-lg text-gray-600 w-full border-gray-400">{product.brand}</p>
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Quantity
            </p>
            <p className="border-b w-full border-gray-500 font-bold text-xl">{product.quantity}</p>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Category
            </p>
            <p className="border-b text-lg text-gray-600 w-full border-gray-400">{product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
