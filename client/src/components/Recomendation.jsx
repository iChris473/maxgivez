
import ProductItem from "./ProductItem"
import {useState, useEffect} from "react"
import {publicRequest} from "./axiosMethod"
import { filter } from "../atom"
import { useRecoilState } from "recoil"

export default function Recommendation() {

  const product = JSON.parse(window.localStorage.getItem("product"))
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const [price, setPrice] = useState("")

  useEffect(() => {
    setLoading(true)
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/product/recommends?cat=${product.category}`)
        setAllProducts(res.data.filter(p => p._id != product._id)) 
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setErr(true)
      }
    }
    getProducts()
  }, [price])

  return (
    <div className="overflow-hidden mb-20 w-full pt-32 p-3">
      {allProducts.length != 0 &&
       <h1 className="font-bold text-center text-3xl text-gray-800 mb-10 border-b border-orange-500 w-[80%] mx-auto pb-3">
        You may also like
      </h1>}
      <div className="flex flex-wrap gap-10 items-center justify-center ">
        {loading ? (
          <img src={require("../images/assets/loading.gif")} alt="" className="h-42" />
        ) : err ? (
          <h1 className="bg-red-500 p-2 text-white rounded-md text-lg w-full max-w-[500px] opacity-70 text-center">
            An error occured
          </h1>
        ) : (
          allProducts?.map((p) => <ProductItem key={p._id} product={p} />)
        )}
      </div>
    </div>
  );
}
