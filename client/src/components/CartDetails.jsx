import React, { useContext, useState } from 'react'
import { useRecoilState } from 'recoil'
import { carts, updateTotal } from '../atom'
import { AuthContext } from '../context/AuthContext'
import { userRequest } from './axiosMethod'

export default function ({cart}) {
    
    const [allCarts, setAllCarts] = useRecoilState(carts)
    const [total, setTotal] = useRecoilState(updateTotal)
    const {user} = useContext(AuthContext)
    const [counter, setCounter] = useState(null)
    const [subTotal, setSubTotal] = useState((cart.price * cart.quantity))

    const handleUpdate = async () => {
        const newCart = {
           quantity: counter || cart.quantity
          }
          try {
            await userRequest.put(`/cart/update/${user.id}?id=${cart._id}`, newCart)
            // setSubTotal(cart.price * cart.quantity)
            setTotal(!total)
          } catch (error) {
            setSubTotal(cart.price * counter)
            console.log(error.response.data)
          }
    }

    const deleteCart = async () => {
        try {
          await userRequest.delete(`/cart/delete/${user.id}?id=${cart.productId}`);
          console.log("deleted");
          setAllCarts(allCarts.filter(c => c._id != cart._id))
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <div>
    <div className="relative pb-16 border border-gray-500 p-2 shadow my-10 mx-2 sm:mx-auto max-w-[600px] rounded-md">
      <div className="flex items-center gap-8 border-b p-3">
        <img
          src={cart.picture}
          alt=""
          className="h-[100px] w-[100px] object-cover"
        />
        <h2 className="text-gray-600 font-bold text-xl">
          {cart.name}
        </h2>
      </div>
      <div className="flex items-center gap-8 border-b p-3">
        <h2 className="text-gray-500 font-semibold tracking-wider text-lg">
          Price:
        </h2>
        <h2 className="text-gray-700 font-semibold tracking-widest text-lg">
          NGN {cart.price.toLocaleString()}
        </h2>
      </div>
      <div className="flex items-center gap-8 border-b p-3">
        <h2 className="text-gray-500 font-semibold tracking-wider text-lg">
          Quantity:
        </h2>
        <div className="border rounded-sm py-1 border-gray-300 flex items-center justify-center px-5">
          <button
            disabled={(counter || cart.quantity) == 1}
            onClick={() => {
                setSubTotal(subTotal - cart.price);
                setCounter((counter || cart.quantity) - 1);
            }}
            className="text-xl text-gray-400 cursor-pointer disabled:opacity-20"
          >
            -
          </button>
          <input
            id="quantity"
            type="number"
            value={counter || cart.quantity}
            onChange={(e) => setCounter(e.target.value)}
            className="outline-none text-gray-700 max-w-[20px] mx-4 text-center placeholder:text-gray-800 text-lg font-semibold"
          />
          <button
            onClick={() => {
              setSubTotal(parseFloat(subTotal) + parseFloat(cart.price));
              setCounter((counter || cart.quantity) + 1);
            }}
            className="text-xl text-gray-400 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center gap-8 border-b p-3">
        <h2 className="text-gray-500 font-semibold tracking-wider text-lg">
          Subtotal:
        </h2>
        <h2 className="text-gray-700 font-semibold tracking-widest text-lg">
          NGN {subTotal.toLocaleString()}
        </h2>
      </div>
      {subTotal != (cart.price * cart.quantity) && (
        <button onClick={handleUpdate} className="p-2 text-xs text-gray-700 border border-gray-700 px-4 rounded-md font-semibold absolute bottom-0 right-32 my-5">
          Update
        </button>
      )}
      <button onClick={deleteCart} className="bg-red-500 p-2 text-xs text-white rounded-md font-semibold absolute bottom-0 right-2 my-5">
        Remove from cart
      </button>
    </div>
  </div>
  )
}
