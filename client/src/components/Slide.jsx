// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
// import { useState } from "react";
import img1 from "../images/hero.jpeg"
import { Link } from "react-router-dom";


export default function Slide() {
    // const [slider, setSlider] = useState(0)
    // // setSlider(0)
    
    // const rightArrorw = () => {
    //     if(slider == -200){
    //         setSlider(0)
    //     } else{
    //         setSlider(slider - 100)
    //     }
    // }
    // const leftArrorw = () => {
    //     if(slider === 0){
    //         setSlider(-200)
    //     } else {
    //         setSlider(slider + 100)
    //     }
    // }

  return (
    <div className="h-[100vh + 3rem] overflow-hidden bg-black bg-opacity-40">
      <div className="flex w-full">
        <div className="w-full h-screen relative">
          <img
            src={img1}
            alt=""
            className="absolute h-screen w-screen top-0 -z-10 opacity-80 object-cover"
          />
          <div className="w-screen mx-auto mt-[10rem] md:mt-60 px-5 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center jusitfy-center gap-1">
              <img src={require("../images/mlogo.png")} className="h-10 md:h-14 object-contain" alt="" />
            <h1 className="font-bold text-yellow-500 text-center text-3xl md:text-6xl tracking-widest">
              AXGIVEZ
            </h1>
            </div>
            <p className="mx-5 mb-10 text-lg text-gray-300 font-semibold text-center">
              Online store for shopping easily with your device from the comfort of your home or any place you find your self, <br></br> we are bringing the experience of going to local stores online, now get the best part of this experience by making an order straight away
            </p>
            <Link to="/product">
              <button className="text-white bg-orange-500 shadow-md p-2 rounded-md">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
