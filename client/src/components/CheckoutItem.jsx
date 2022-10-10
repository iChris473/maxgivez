
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { userRequest } from "./axiosMethod";

export default function CheckoutItem() {
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const [cart, setCart] = useState([[]])
  const [submit, setSubmit] = useState(false)
  const totalAmount = window.localStorage.getItem("totalAmount");

  const firstName = useRef()
  const lastName = useRef()
  const middleName = useRef()
  const street = useRef()
  const zip = useRef()
  const phone = useRef()
  const state = useRef()
  const city = useRef()
  const country = useRef()

  useEffect(() => {

    const getUserCart = async () => {
      try {
        const usersCart = await userRequest.get(`/billing/user/${user?.id}`)
        console.log(usersCart.data)
        setCart(usersCart.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    user && getUserCart()
  }, [])

  const createNewOrder = async () => {

    const newOrder = {
      userId: user?.id,
      city: city.current.value,
      email: user?.email,
      phone: phone.current.value,
      amount: totalAmount || 'N/A',

    }

    try {
      
      await userRequest.post(`/order/create/${user?.id}`, newOrder)
      
      setSubmit(false)
        window.location.href = 'https://api.whatsapp.com/send?phone=+2349134534917&text=Hello%2C%20I%20just%20placed%20an%20order%2C%0AIm%20ready%20to%20pay%20right%20now%20to%20complete%20the%20Order%20%0AMy%20email%20is.....%20my%20phone%20number%20is%.....'
        // navigate("/payment")

    } catch (error) {
      console.log(error)
    }

  }

  const handleSubmit = async e => {
    
    e.preventDefault()

    setSubmit(true)

    const newUser = {
      userId: user.id,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      middleName: middleName.current.value,
      street: street.current.value,
      zip: zip.current.value,
      phone: phone.current.value,
      state: state.current.value,
      city: city.current.value,
      country: country.current.value
    }

     try {

      if(cart.length == 0){
        await userRequest.post(`/billing/create/${user.id}`, newUser)
      } else {
        await userRequest.put(`/billing/update/${user.id}`, newUser)
      }

      createNewOrder()
       
     } catch (error) {
       console.log(error);
       setSubmit(false)
      }
      
  }


  return (
    <div className="pt-20">
      <div className="flex items-center justify-center relative  bg-black bg-opacity-70 h-[30vh]">
        <img
          src={require("../images/checkout.jpg")}
          className="h-full w-full absolute object-cover opacity-80 -z-10 "
        />
        <h1 className="text-6xl text-white font-semibold tracking-wide">
          Checkout
        </h1>
      </div>
      <div className="my-10 flex items-center justify-center flex-col p-2 border max-w-[800px] rounded-md mx-auto">
        <h1 className="text-3xl text-gray-700 font-semibold pb-3 w-[90%] border-b border-blue-200 text-center m-5">
          Shipping Address
        </h1>
        <form onSubmit={handleSubmit} className="w-full p-5 space-y-5">
          <div>
            <p className="text-md tracking-wide text-gray-600">First Name *</p>
            <input
              required
              defaultValue={cart[0]?.firstName}
              ref={firstName}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <div>
            <p className="text-md tracking-wide text-gray-600">Last Name *</p>
            <input
              required
              defaultValue={cart[0]?.lastName}
              ref={lastName}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <div>
            <p className="text-md tracking-wide text-gray-600">Middle Name</p>
            <input
              defaultValue={cart[0]?.middleName}
              ref={middleName}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <div>
            <p className="text-md tracking-wide text-gray-600">
              Street Address *
            </p>
            <input
              required
              defaultValue={cart[0]?.street}
              ref={street}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <div>
            <p className="text-md tracking-wide text-gray-600">
              Zip/Postal Code *
            </p>
            <input
              required
              defaultValue={cart[0]?.zip}
              ref={zip}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <div>
            <p className="text-md tracking-wide text-gray-600">
              Phone Number *
            </p>
            <input
              required
              defaultValue={cart[0]?.phone}
              ref={phone}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <div>
            <p className="text-md tracking-wide text-gray-600">Country</p>
            <input
              required
              defaultValue={cart[0]?.country}
              ref={country}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <div>
            <p className="text-md tracking-wide text-gray-600">State *</p>
            <input
              required
              defaultValue={cart[0]?.state}
              ref={state}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <div>
            <p className="text-md tracking-wide text-gray-600">
              City *
            </p>
            <input
              required
              defaultValue={cart[0]?.city}
              ref={city}
              type="text"
              className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
            />
          </div>
          <button type="submit" className="p-2 text-white rounded-md bg-orange-600 block mx-auto font-semibold w-full hover:bg-white hover:text-black hover:border border-gray-700">
            {submit ? "Submitting..." : "Proceed to Checkout"}
          </button>
        </form>
      </div>
    </div>
  );
}
