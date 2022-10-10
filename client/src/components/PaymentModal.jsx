
import { CameraIcon, XIcon } from "@heroicons/react/solid";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { carts } from "../atom";
import { AuthContext } from "../context/AuthContext";
import { userRequest } from "./axiosMethod";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import storage from "./firebase"

export default function PaymentDetails({modal, setModal}) {

  const { user } = useContext(AuthContext);
  const [totalCart, SetTotalCart] = useRecoilState(carts)
  const navigate = useNavigate();

  const totalAmount = window.localStorage.getItem("totalAmount");

  const chooseImg = useRef();
  const [file, setFile] = useState(null);
  const [insta, setInsta] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    // If no image selected, return
    if (!/^image\//.test(e.target.files[0].type)) {
      console.log(`File ${e.target.files[0].name} is not an image.`);
      return false;
    }
    // console.log(allPictures)
    setFile(e.target.files[0]);
  };

  const completePayment = async () => {

    if(!file){
      setErrorMsg("Please upload an image")
      return
    }

    setLoading(true);
    
    const newPayment = {
      userId: user.id,
      gift: totalCart[0].name,
      amount: totalAmount,
      email: user.email
    }

    const firebaseImageRef = ref(storage, `${file?.name}`);
    const metadata = {
      contentType: "image/jpeg",
    };

    try {
        // const uploadTask = uploadBytes(storageRef, file, metadata)
        await uploadBytes(firebaseImageRef, file, metadata).then(
          async (snapshot) => {
            const downloadURL = await getDownloadURL(firebaseImageRef);
            newPayment.reciept = downloadURL;
          }
        );
    } catch (error) {
      console.log(error)
      setErrorMsg("An error occured while uploading the image")
      setLoading(false);
      return
    }

    try {
        await userRequest.post(`/order/create/${user.id}`, newPayment)
        setInsta(true)
        setErrorMsg(null)
        setLoading(false);
    } catch (error) {
      console.log(error.response.data)
      setErrorMsg("An error occured while creating the order")
      setLoading(false);
    }

  }
  console.log(insta)

  return (
    <div className="relative flex items-center justify-center flex-col p-8 border max-w-[800px] rounded-md mx-auto">
        <XIcon onClick={() => setModal(null)} className="h-12 text-red-700 absolute right-2 top-3" />
        {errorMsg && <h1 className='text-red-500 text-md md:text-lg text-center'>{errorMsg}</h1>}
        {
          !insta ? 
          <div className="flex items-center justify-center flex-col sm:flex-wrap gap-10 my-3">
            {/* CASH APP PAYMENT METHOD */}
            <div className={`${(modal == 'cashapp') ? "flex" : "hidden"} cursor-pointer items-center flex-col gap-1 justify-center`}>
              <img
                src={require("../images/cashapp.png")}
                alt=""
                className="object-contain h-28 "
              />
              <h2 className="text-sm text-gray-600 font-semibold tracking-wide">
                Cashapp
              </h2>
              <p className="font-semibold text-md my-5 text-center text-gray-600">
                Send ${totalAmount} to the Cashapp tag below to buy your ticket
              </p>
              <h1 className="font-bold text-xl text-center text-gray-800 mb-2">
                $Angelo473
              </h1>
              <div>
                {file ? (
                  <div>
                    <p className="text-xs text-center text-green-500 mb-2">
                      Add a screenshot of the payment to validate your transaction
                    </p>
                    <div className="relative bg-gray-100 p-5 col-span-2 w-full h-[150px] flex flex-col items-center justify-center">
                      <img
                        src={URL.createObjectURL(file)}
                        className="rounded-sm object-contain h-full w-full"
                        alt=""
                      />
                      <span
                        onClick={() => chooseImg.current.click()}
                        className="absolute -top-2 text-md right-0 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
                      >
                        <CameraIcon className="h-7 text-orange-600" />
                      </span>
                      <input
                        type="file"
                        accept="image/"
                        hidden
                        ref={chooseImg}
                        onChange={handleImage}
                      />
                      <span
                        onClick={() => setFile(null)}
                        className="absolute -top-2 text-md right-10 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
                      >
                        <XIcon className="h-7 text-red-700" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-center text-green-500 mb-2">
                      Add a screenshot of the payment to validate your transaction
                    </p>
                    <div className="bg-gray-100 p-5 col-span-2 w-full h-[150px] flex flex-col items-center justify-center">
                      <CameraIcon
                        onClick={() => chooseImg.current.click()}
                        className="h-24 text-gray-300 cursor-pointer"
                      />
                      <p
                        onClick={() => chooseImg.current.click()}
                        className="text-xs font-bold text-gray-400 cursor-pointer"
                      >
                        Click to Add Photo of Product
                      </p>
                      <input
                        type="file"
                        accept="image/"
                        hidden
                        ref={chooseImg}
                        onChange={handleImage}
                      />
                    </div>
                  </div>
                )}
              </div>
              <button onClick={completePayment} className="bg-green-500 p-2 rounded-md mt-3 text-white text-sm font-bold">
                {loading ? "Loading..." : "Complete Payment"}
              </button>
            </div>
            {/* PAYPAL PAYMENT */}
            <div className={`${(modal == 'paypal') ? "flex" : "hidden"} cursor-pointer items-center flex-col gap-1 justify-center`}>
                <img
                  src={require("../images/paypal.png")}
                  alt=""
                  className="object-contain h-28 "
                />
                <p className="font-semibold text-md my-5 text-center text-gray-600">
                  Send ${totalAmount} to our paypal email below to buy your ticket
                </p>
                <h1 className="font-bold text-xl text-center text-gray-800 mb-2">
                  angelo@gmail.com
                </h1>
                <div>
                  {file ? (
                    <div>
                      <p className="text-xs text-center text-green-500 mb-2">
                        Add a screenshot of the payment to validate your transaction
                      </p>
                      <div className="relative bg-gray-100 p-5 col-span-2 w-full h-[150px] flex flex-col items-center justify-center">
                        <img
                          src={URL.createObjectURL(file)}
                          className="rounded-sm object-contain h-full w-full"
                          alt=""
                        />
                        <span
                          onClick={() => chooseImg.current.click()}
                          className="absolute -top-2 text-md right-0 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
                        >
                          <CameraIcon className="h-7 text-orange-600" />
                        </span>
                        <input
                          type="file"
                          accept="image/"
                          hidden
                          ref={chooseImg}
                          onChange={handleImage}
                        />
                        <span
                          onClick={() => setFile(null)}
                          className="absolute -top-2 text-md right-10 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
                        >
                          <XIcon className="h-7 text-red-700" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-center text-green-500 mb-2">
                        Add a screenshot of the payment to validate your transaction
                      </p>
                      <div className="bg-gray-100 p-5 col-span-2 w-full h-[150px] flex flex-col items-center justify-center">
                        <CameraIcon
                          onClick={() => chooseImg.current.click()}
                          className="h-24 text-gray-300 cursor-pointer"
                        />
                        <p
                          onClick={() => chooseImg.current.click()}
                          className="text-xs font-bold text-gray-400 cursor-pointer"
                        >
                          Click to Add Photo of Product
                        </p>
                        <input
                          type="file"
                          accept="image/"
                          hidden
                          ref={chooseImg}
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={completePayment} className="bg-blue-500 p-2 rounded-md mt-3 text-white text-sm font-bold">
                  {loading ? "Loading..." : "Complete Payment"}
                </button>
            </div>
            {/* APPLE PAY PAYMENT */}
            <div className={`${(modal == 'apple') ? "flex" : "hidden"} cursor-pointer items-center flex-col gap-1 justify-center`}>
                <img
                  src={require("../images/applepay.png")}
                  alt=""
                  className="object-contain h-28 "
                />
                <p className="font-semibold text-md my-5 text-center text-gray-600">
                  Send ${totalAmount} to our Apple Pay email below to buy your ticket
                </p>
                <h1 className="font-bold text-xl text-center text-gray-800 mb-2">
                  angelo@gmail.com
                </h1>
                <div>
                  {file ? (
                    <div>
                      <p className="text-xs text-center text-green-500 mb-2">
                        Add a screenshot of the payment to validate your transaction
                      </p>
                      <div className="relative bg-gray-100 p-5 col-span-2 w-full h-[150px] flex flex-col items-center justify-center">
                        <img
                          src={URL.createObjectURL(file)}
                          className="rounded-sm object-contain h-full w-full"
                          alt=""
                        />
                        <span
                          onClick={() => chooseImg.current.click()}
                          className="absolute -top-2 text-md right-0 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
                        >
                          <CameraIcon className="h-7 text-orange-600" />
                        </span>
                        <input
                          type="file"
                          accept="image/"
                          hidden
                          ref={chooseImg}
                          onChange={handleImage}
                        />
                        <span
                          onClick={() => setFile(null)}
                          className="absolute -top-2 text-md right-10 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
                        >
                          <XIcon className="h-7 text-red-700" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-center text-green-500 mb-2">
                        Add a screenshot of the payment to validate your transaction
                      </p>
                      <div className="bg-gray-100 p-5 col-span-2 w-full h-[150px] flex flex-col items-center justify-center">
                        <CameraIcon
                          onClick={() => chooseImg.current.click()}
                          className="h-24 text-gray-300 cursor-pointer"
                        />
                        <p
                          onClick={() => chooseImg.current.click()}
                          className="text-xs font-bold text-gray-400 cursor-pointer"
                        >
                          Click to Add Photo of Product
                        </p>
                        <input
                          type="file"
                          accept="image/"
                          hidden
                          ref={chooseImg}
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={completePayment} className="bg-black p-2 rounded-md mt-3 text-white text-sm font-bold">
                  {loading ? "Loading..." : "Complete Payment"}
                </button>
            </div>
            {/* BITCOIN PAYMENT */}
            <div className={`${(modal == 'btc') ? "flex" : "hidden"} cursor-pointer items-center flex-col gap-1 justify-center`}>
                <img
                  src={require("../images/btc.png")}
                  alt=""
                  className="object-contain h-28 "
                />
                <p className="font-semibold text-md my-5 text-center text-gray-600">
                  Send ${totalAmount} worth of bitcoin to the address below to buy your ticket
                </p>
                <h1 className="font-bold text-xl text-center text-gray-800 mb-2">
                  b1dhgowsn293bfi293bf29bdf9839
                </h1>
                <div>
                  {file ? (
                    <div>
                      <p className="text-xs text-center text-green-500 mb-2">
                        Add a screenshot of the payment to validate your transaction
                      </p>
                      <div className="relative bg-gray-100 p-5 col-span-2 w-full h-[150px] flex flex-col items-center justify-center">
                        <img
                          src={URL.createObjectURL(file)}
                          className="rounded-sm object-contain h-full w-full"
                          alt=""
                        />
                        <span
                          onClick={() => chooseImg.current.click()}
                          className="absolute -top-2 text-md right-0 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
                        >
                          <CameraIcon className="h-7 text-orange-600" />
                        </span>
                        <input
                          type="file"
                          accept="image/"
                          hidden
                          ref={chooseImg}
                          onChange={handleImage}
                        />
                        <span
                          onClick={() => setFile(null)}
                          className="absolute -top-2 text-md right-10 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer"
                        >
                          <XIcon className="h-7 text-red-700" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-center text-green-500 mb-2">
                        Add a screenshot of the payment to validate your transaction
                      </p>
                      <div className="bg-gray-100 p-5 col-span-2 w-full h-[150px] flex flex-col items-center justify-center">
                        <CameraIcon
                          onClick={() => chooseImg.current.click()}
                          className="h-24 text-gray-300 cursor-pointer"
                        />
                        <p
                          onClick={() => chooseImg.current.click()}
                          className="text-xs font-bold text-gray-400 cursor-pointer"
                        >
                          Click to Add Photo of Product
                        </p>
                        <input
                          type="file"
                          accept="image/"
                          hidden
                          ref={chooseImg}
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={completePayment} className="bg-orange-400 p-2 rounded-md mt-3 text-white text-sm font-bold">
                  {loading ? "Loading..." : "Complete Payment"}
                </button>
            </div>
          </div> :
          <div className="flex items-center justify-center flex-col sm:flex-wrap gap-10 my-3">
            <div className="flex cursor-pointer items-center flex-col gap-1 justify-center">
              <img src={require("../images/insta.png")} alt="" className="object-contain h-28"/>
              <p className="font-semibold text-md my-5 text-center text-gray-500">
                Click the button below to message our admin on instagram to verify your transaction and get your gifts shipped to you
              </p>
              <h1 className="font-bold text-xl text-center text-gray-800 mb-2">
                @maxigivez
              </h1>
              <div className="bg-gray-100 p-5 col-span-2 h-[150px] w-[150px] md:h-[200px] md:w-[200px] rounded-md flex flex-col items-center justify-center">
                <img src={require("../images/mlogo.png")} className="rounded-sm object-contain w-full h-full" alt="" />
              </div>  
              <a href="https://www.instagram.com" target={"_blank"} className="mt-3 bg-pink-600 p-2 rounded-md text-white font-semibold">Message Now</a>            
            </div>
          </div>
        }
    </div>
  );
}
