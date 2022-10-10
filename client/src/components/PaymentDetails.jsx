
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { userRequest } from "./axiosMethod";

export default function PaymentDetails({setModal}) {
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()


  return (
    <div className="pt-20">
      <div className="flex items-center justify-center relative  bg-black bg-opacity-70 h-[30vh]">
        <img
          src={require("../images/checkout.jpg")}
          className="h-full w-full absolute object-cover opacity-80 -z-10 "
        />
        <h1 className="text-3xl md:text-6xl text-white font-semibold tracking-wide">
          Payment Methods
        </h1>
      </div>
      <div className="my-10 flex items-center justify-center flex-col p-2 border max-w-[800px] rounded-md mx-auto">
        <h1 className="text-3xl text-gray-700 font-semibold pb-3 w-[90%] border-b border-blue-200 text-center m-5">
          Pay Via the Following
        </h1>
       <div className="flex items-center justify-center flex-col sm:flex-wrap gap-10 my-10">
           <div onClick={() => setModal("cashapp")} className="flex cursor-pointer items-center flex-col gap-1 justify-center">
               <img src={require("../images/cashapp.png")} alt="" className="object-contain h-28 " />
               <h2 className="text-sm text-gray-600 font-semibold tracking-wide">Cashapp</h2>
           </div>
           <div onClick={() => setModal("paypal")} className="flex cursor-pointer items-center flex-col gap-2 justify-center">
               <img src={require("../images/paypal.png")} alt="" className="object-contain h-28" />
           </div>
           <div onClick={() => setModal("apple")} className="flex cursor-pointer items-center flex-col justify-center">
               <img src={require("../images/applepay.png")} alt="" className="object-contain h-28 " />
               <h2 className="text-sm text-gray-600 font-semibold tracking-wide">Apple Pay</h2>
           </div>
           <div onClick={() => setModal("btc")} className="cursor-pointer flex items-center flex-col justify-center">
               <img src={require("../images/btc.png")} alt="" className="object-contain h-28 " />
           </div>
       </div>
      </div>
    </div>
  );
}
