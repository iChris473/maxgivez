
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil";
import { carts, updateTotal } from "../atom";
import CartDetails from "./CartDetails";
import { userRequest } from "./axiosMethod";
import { AuthContext } from "../context/AuthContext";

export default function CartItem() {

  const [allCarts, setAllCarts] = useRecoilState(carts)
  const [total, setTotal] = useRecoilState(updateTotal)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalPefs, setTotalPefs] = useState(0)
  
  useEffect(() => {
    let cash = 0
    let pef = 0
    allCarts.map(
      cart => {
        cash += parseFloat(cart.price * cart.quantity);
        pef += parseFloat(cart.quantity)
      }
    )
    window.localStorage.setItem("totalAmount", cash)
    setTotalAmount(cash)
    setTotalPefs(pef)
  }, [allCarts, total])
  // console.log()
  
  return (
    <div className="min-h-screen pt-20">
      <div className="relative bg-black bg-opacity-50 h-[30vh] flex items-center justify-center">
        <img
          src={require("../images/cartbg.jpg")}
          className="absolute w-full h-full opacity-50 -z-10 object-cover"
        />
        <h1 className="text-white font-bold text-4xl">Shopping Cart</h1>
      </div>
      {allCarts.length != 0 ? (
        <div>
          {allCarts.map((cart) => (
            <CartDetails cart={cart} key={cart._id} />
          ))}
          <div className="my-10  ml-5">
            <h1 className="text-2xl text-gray-800 font-semibold tracking-wide border-b border-orange-300 w-[90%] pb-2">
              Summary
            </h1>
            <div className="space-y-5">
              <h1 className="mt-4 text-gray-700 font-semibold tracking-wide text-xl">
                Total Products: {totalPefs.toLocaleString()}
              </h1>
              <h1 className="mt-4 text-gray-700 font-semibold tracking-wide text-xl">
                Total Amount: NGN {totalAmount.toLocaleString()}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center justify-center my-10">
            <button
              onClick={() => navigate("/product")}
              className="max-w-[700px] hover:bg-black hover:text-white  p-2 border rounded-full text-lg font-semibold tracking-wide w-[90%] border-black"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="max-w-[700px] hover:animate-pulse p-2 rounded-full text-lg font-semibold tracking-wide w-[90%] bg-blue-500 text-white animate-bounce"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col md:flex-row">
          <ShoppingCartIcon className="text-gray-300 h-[500px] md:w-[400px] w-[300px]" />
          <div className="flex flex-col gap-3 m-5 items-start justify-center">
            <h1 className="text-xl text-gray-600 font-semibold">
              Your shopping cart does not appear to be smelling so sweetly.
            </h1>
            <p className="text-lg text-green-600 font-semibold">
              Add items to your cart
            </p>
            <Link to="/product">
              <button className="p-2 bg-[#403e38] text-white rounded-sm">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
