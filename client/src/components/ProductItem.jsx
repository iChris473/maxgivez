import { ShoppingCartIcon } from "@heroicons/react/outline"
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "./axiosMethod";
import { AuthContext } from "../context/AuthContext";
import { carts, productItem } from "../atom";


export default function ProductItem({product}) {

  const [added, setAdded] = useState(false)
  const [inCart, setInCart] = useState([])
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const [totalCart, SetTotalCart] = useRecoilState(carts)

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const usersCart = await userRequest.get(`/cart/user/${user?.id}?userid=${user?.id}`)
        SetTotalCart(usersCart.data)
        setAdded(usersCart.data.filter(data => data.productId == product._id).length != 0)
      } catch (error) {
        console.log(error.message)
      }
    }
    user && getUserCart()
  }, [user, added])

  const addToCart = async () => {

    if(!user){
      const uri = window.location.href
      window.localStorage.setItem("uri", uri)
      navigate("/register")
      return
    }

    const newCart = {
      userId: user.id,
      productId: product._id || new Date().getTime(),
      name: product.name,
      price: product.price,
      picture: product.picture[0]
    }

    try {
      if(added){
        await userRequest.delete(`/cart/delete/${user.id}?id=${product._id}`)
        setAdded(false)
      } else {
        await userRequest.post(`/cart/create/${user.id}`, newCart)
        setAdded(true)
      }
    } catch (error) {
      setAdded(false)
      console.log(error.response.data)
    }
  }

  const handleNavigation = () => {

    window.localStorage.setItem("product", JSON.stringify(product));

    navigate(`/single?id=${product._id}`);

    if(window.location.href.includes('single')){

      window.location.href = `/single?id=${product._id}#`

    }

  }

  return (
    <div>
        <div className="border p-2 flex flex-col rounded-md items-center justify-center bg-[#fcfbf9] shadow max-w-[150px] md:max-w-[200px] relative hover:scale-110 cursor-pointer">
          <div onClick={handleNavigation} className="h-full w-full bg-tansparent z-10 absolute" />
          <img
            src={product.picture}
            alt=""
            className="h-[100px] w-[100px] object-cover"
          />
          <div className="flex flex-col items-center justify-between">
            <p className="text-gray-400 text-xs my-2">{product.category}</p>
            <p className="text-md text-center truncate w-[100px] text-gray-500 font-semibold">
              {product.name}
            </p>
            <p className="text-green-500 font-bold"># {product.price.toLocaleString()}</p>
            <button
              onClick={addToCart}
              className={`p-1 text-xs z-20 rounded-sm w-full ${!added ? "bg-gray-800 text-white hover:bg-black" : "hover:bg-white border border-orange-500 bg-orange-500 text-white hover:text-orange-500 font-semibold"} top-0 right-0`}
            >{added ? "Remove from Cart" : "Add to Cart"}</button>
          </div>
        </div>
    </div>
  );
}
