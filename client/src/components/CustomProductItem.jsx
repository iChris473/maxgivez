
// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { carts } from "../atom";
// import { AuthContext } from "../context/AuthContext";
// import { userRequest } from "./axiosMethod";

export default function SingleProductItem() {

  // const { user } = useContext(AuthContext);
  // const [totalCart, SetTotalCart] = useRecoilState(carts)
  // const [counter, setCounter] = useState(1)
  // const [loading, setLoading] = useState(false)
  // const [added, setAdded] = useState(false)
  // const [product, setProduct] = useState([])

  // const productId = window.location.search.split("=")[1]

  // const navigate = useNavigate()

  const handleCheckout = () => {

    // if(!user){
    //   window.localStorage.setItem("uri", `${window.location.href.split('custom')[0]}checkout`)
    //   navigate("/register")
    //   return
    // } 
    // navigate("/checkout")
    window.location.href ='https://api.whatsapp.com/send?phone=+2349134534917&text=Hello%2C%20I%20just%20placed%20an%20order%2C%0AIm%20ready%20to%20pay%20right%20now%20to%20complete%20the%20Order%20%0AMy%20email%20is.....%20my%20phone%20number%20is%.....'
  }

  return (
    <div className="min-h-screen pt-28">

      {/* Header Section */}
      <div className="m-5">
        <h1 className="text-center mt-20 text-4xl text-orange-500 font-extrabold border-b border-orange-400 pb-4">T55 Series 7 Smartwatch</h1>
        <p className="text-gray-600 text-md md:text-lg my-8">This Smartwatch is suitable for everyone and its actually a must have because of it's great features, you can literally make calls or recieve calls with this Smartwatch, you can recieve notifications from Facebook, Whatsapp or other social medias, Besides it can be very useful for your health becuase you can also check your heartbeats and track your calories</p>
      </div>

      {/* DESC SECTION */}
      <div className="my-10 mx-5 flex items-center jusitfy-center gap-5 flex-col">
        <h1 className="text-center font-bold text-2xl text-gray-800">A MUST HAVE FOR EVERYONE</h1>
        <img src={require("../images/assets/w2.jpeg")} className="w-[90%] max-w-[500px] object-contain bg-gray-50 p-2" alt="" />
        <p className="text-gray-600 text-lg my-5 font-semibold text-center">Calculates Heart rate , Blood pressure and ECG steps</p>
        <p className="text-gray-600 text-center text-md my-5 max-w-[700px] mx-auto">There are a lot of benefits of a smart watch for everyone generally, because it helps you access some informations from your phone especially notifcatioins without always having to remove your phone from your pocket, the important features of this watch are actually listed below?</p>
        <p className="bg-orange-400 font-bold text-center text-white p-4 rounded-md text-lg w-[93%] max-w-[700px]">High Durablity</p>
        <img src={require("../images/assets/w3.jpeg")} className="w-[90%] max-w-[500px] object-contain bg-gray-50 p-2" alt="" />
        <p className="bg-gray-700 font-bold text-center text-white p-4 rounded-md text-lg w-[93%] max-w-[700px]">Key Features</p>
        {/* WATCH SPECFICATIONS */}
        <div className="flex items-start flex-col gap-5 justify-center mx-auto max-w-[700px]">
          <p className="text-gray-700 text-lg font-semibold">▪  Series 7 supports bluetooth , calls and receive calls </p>
          <p className="text-gray-700 text-lg font-semibold">▪ Heart rate , Blood pressure and ECG steps Ip68 waterproof  </p>
          <p className="text-gray-700 text-lg font-semibold">▪ Colours interchangeable straps </p>
          <p className="text-gray-700 text-lg font-semibold">▪ Magnetic pin charger </p>
          <p className="text-gray-700 text-lg font-semibold">▪ Magnetic pin charger </p>
          <p className="text-gray-700 text-lg font-semibold">▪ Colours , Black , Blue , Red , Rose gold and White  </p>
          <p className="text-gray-700 text-lg font-semibold">▪ Bluetooth push , SMS , webchat , Email , and Gmail notifications , Facebook , WhatsApp and other Notifications app </p>
          <p className="text-gray-700 text-lg font-semibold">▪ Heart rate monitor and heart beat monitor ECG Analysis Pedometer , Exercise steps , calories control Exercise mileage records</p>
          <p className="text-gray-700 text-lg font-semibold">▪ Sedentary reminder Hurry now and grab, discount will soon be over</p>
        </div>
        {/* ALL PICTURES */}
        <div className="flex flex-col items-center justify-center gap-5">
          <img src={require("../images/assets/w1.jpeg")} className="w-[90%] max-w-[500px] object-contain bg-gray-50 p-2" alt="" />
          <img src={require("../images/assets/w4.jpeg")} className="w-[90%] max-w-[500px] object-contain bg-gray-50 p-2" alt="" />
          <img src={require("../images/assets/w5.jpeg")} className="w-[90%] max-w-[500px] object-contain bg-gray-50 p-2" alt="" />
        </div>
        {/* PROMO PRICE */}
        <div className="max-w-[800px] w-[95%] m-5 border-y border-gray-500 py-7 space-y-5">
          <p className="p-4 text-white bg-red-600 w-full rounded-md text-center font-bold text-xl">4 Days Promo Price</p>
          <p className="p-3 text-white bg-red-600 w-full rounded-md text-center font-bold text-xl">Series 7 Smartwatch = #20,000 </p>
        </div>
        {/* FREE DELIVERY */}
        <div className="max-w-[800px] w-[95%] m-5 border-b border-gray-500 pb-7 flex flex-col items-center justify-center gap-5">
          <p className="text-gray-600 text-center font-bold text-xl">Don't wait until price goes back to #25,000</p>
          <img src={require("../images/freedelivery.webp")} className="w-[90%] max-w-[500px] object-contain bg-gray-50 p-2" alt="" />
          <p className="text-gray-400 text-center font-bold text-lg">FREE DELIVERY WITHIN IMO STATE</p>
          <p className="text-red-600 text-center font-bold text-md"> All orders are payment before delivery - which means you HAVE to pay before you receive the product.</p>
        </div>
        {/* CHECKOUT BUTTON */}
        <button onClick={handleCheckout} className="max-w-[700px] hover:animate-pulse p-2 rounded-full text-lg font-semibold tracking-wide w-[90%] bg-blue-500 text-white animate-bounce">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
