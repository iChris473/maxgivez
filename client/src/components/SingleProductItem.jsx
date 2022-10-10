
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { carts } from "../atom";
import { AuthContext } from "../context/AuthContext";
import { userRequest } from "./axiosMethod";

export default function SingleProductItem() {

  const { user } = useContext(AuthContext);
  const [totalCart, SetTotalCart] = useRecoilState(carts)
  const [counter, setCounter] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [product, setProduct] = useState([])

  const productId = window.location.search.split("=")[1]

  const navigate = useNavigate()
  
  useEffect(() => {

    const getUserCart = async () => {
      try {
        const usersCart = await userRequest.get(`/cart/user/${user.id}?userid=${user.id}`)
        SetTotalCart(usersCart.data)
        setAdded(usersCart.data.filter(data => data.productId == product?._id).length != 0)
      } catch (error) {
        console.log(error.message)
      }
    }

    user && getUserCart()

  }, [user, added])

  useEffect(() => {

    const getThisProduct = async () => {

      try {
        
        const res = await userRequest.get(`/product/get/${productId}`)
        console.log(res.data)
        setProduct(res.data)

      } catch (error) {
        console.log(error.message)
      }
      
    }

    const localProduct = JSON.parse(window.localStorage.getItem("product"))

    if(localProduct && (localProduct._id == productId)){
      setProduct(localProduct)
    } else{
      getThisProduct()
    }


    window.location.href = "#"

  }, [productId])

  const addToCart = async () => {
    
    if(!user){
      const uri = window.location.href
      window.localStorage.setItem("uri", uri)
      navigate("/register")
      return;
    }
    
    setLoading(true)

    const newCart =  {
      userId: user.id,
      productId: product?._id || new Date().getTime(),
      name: product?.name,
      price: product?.price,
      picture: product?.picture[0],
      quantity: counter
    }

    try {
      const res = await userRequest.post(`/cart/create/${user?.id}`, newCart)
      setAdded(true)
      console.log(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setAdded(false)
      setLoading(false)
    }

    
    }
    console.log(product)

  return (
    <div>
      <div>
        <div className="pt-32 flex flex-col md:flex-row items-center justify-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {
            product && product?.picture?.map((pic) => (
              <img
              src={pic}
              alt=""
              className="hs-[250px] ws-[250px] h-[350px] w-[350px] object-contain bg-gray-50 p-2"
            />
            ))
          }
        </div>
        </div>
        <div className="my-10 p-5">
          <h1 className="font-semibold text-orange-600 tracking-wide text-2xl text-left border-b border-orange-200 pb-2">
            {product?.name}
          </h1>
          <div className="flex items-center justify-between gap-5 max-w-[250px] border-b pb-4 my-4">
            <h2 className="text-gray-400 font-semibold text-lg tracking-wide">
              Brand:
            </h2>
            <h1 className="text-gray-700 font-semibold text-xl tracking-wide">
              {product?.brand}
            </h1>
          </div>
          <div className="flex items-center justify-between gap-5 max-w-[650px] border-b pb-4 my-4">
            <h2 className="text-gray-400 font-semibold text-lg tracking-wide">
              Description:
            </h2>
            <h1 className="text-gray-700 md:text-md text-left w-full ml-10 text-sm tracking-wide">
            {product?.desc}
            </h1>
          </div>
          <div className="flex items-center justify-between gap-5 max-w-[420px] border-b pb-4 my-4">
            <h2 className="text-gray-400 font-semibold text-md md:text-lg tracking-wide">
              Availability:
            </h2>
            <h1 className="text-green-500 font-semibold text-md tracking-wide">
              {product?.quantity} product(s) are In Stock
            </h1>
          </div>
          <div className="flex items-center justify-between gap-5 max-w-[250px] border-b pb-4 my-4">
            <h2 className="text-gray-400 font-semibold text-lg tracking-wide">
              Price:
            </h2>
            <h1 className="text-gray-800 font-bold text-xl tracking-wide">
              NGN {product?.price?.toLocaleString()}
            </h1>
          </div>
          {/* <div className="flex items-center justify-between gap-5 max-w-[250px] border-b pb-4 my-4">
            <h2 className="text-gray-400 font-semibold text-lg tracking-wide">
              Category:
            </h2>
            <h1 className="text-gray-800 font-bold text-xl tracking-wide">
            {product?.category}
            </h1>
          </div> */}
          <div className="flex items-center justify-between gap-5 max-w-[250px] border-b pb-4 my-4">
            <h2 className="text-gray-400 font-semibold text-lg tracking-wide">
              Quantity:
            </h2>
            <div className="border rounded-sm py-1 border-gray-300 flex items-center justify-center px-5">
              <button
                disabled={counter == 1}
                onClick={() => setCounter(counter - 1)}
                className="text-xl text-gray-400 cursor-pointer disabled:opacity-20"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                value={counter}
                onChange={(e) => setCounter(e.target.value)}
                className="outline-none text-gray-700 max-w-[20px] mx-4 text-center placeholder:text-gray-800 text-lg font-semibold"
              />
              <button
                onClick={() => setCounter(counter + 1)}
                className="text-xl text-gray-400 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      {added ? (
        <div className="flex flex-col items-center justify-center mb-10 gap-5">
          <p className="bg-green-500 max-w-[700px] p-2 rounded text-white font-semibold tracker-wider text-lg w-[90%] mx-auto text-center">
            Added to Cart
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-white max-w-[700px] hover:bg-black hover:text-white p-2 rounded-full text-black border border-black font-semibold tracker-wider text-lg w-[90%] mx-auto text-center"
          >
            View Cart
          </button>
          <button
            onClick={() => navigate("/product")}
            className="hover:bg-white hover:text-black border-black hover:border max-w-[700px] p-2 rounded-full text-white bg-gray-800 font-semibold tracker-wider text-lg w-[90%] mx-auto text-center"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <button
          onClick={addToCart}
          className="bg-orange-500 text-white p-2 font-semibold tracking-wide text-md w-[90%] rounded-2xl mb-10 max-w-[700px] block mx-auto animate-bounce hover:bg-orange-700"
        >
          {added ? "Remove from cart" : loading ? "Adding..." : "Add to Cart"}
        </button>
      )}
    </div>
  );
}
