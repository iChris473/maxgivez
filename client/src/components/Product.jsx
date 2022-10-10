
import ProductItem from "./ProductItem"
import {useState, useEffect} from "react"
import {publicRequest} from "./axiosMethod"
import { filter } from "../atom"
import { useRecoilState } from "recoil"

export default function Products() {

  const [catgry, setCatgry] = useRecoilState(filter)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const [cat, setCat] = useState(catgry)
  const [price, setPrice] = useState("")

  useEffect(() => {
    setLoading(true)
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/product/get?cat=${cat}&plat=all`)
        setAllProducts(res.data) 
        setLoading(false)
        setCatgry('')
      } catch (error) {
        console.log(error)
        setLoading(false)
        setErr(true)
      }
    }
    getProducts()
  }, [cat, price])

  return (
    <div className="overflow-hidden mb-20 w-full pt-32 p-3">
      <h1 className="font-bold text-center text-3xl text-gray-800 mb-10 border-b border-orange-500 w-[80%] mx-auto pb-3">
        ALL PRODUCTS
      </h1>
      {/* <div className="flex flex-col items-start sm:ml-7 justify-start gap-5 mb-10">
        <h1 className="text-gray-600 font-semibold text-xl">Filter Products</h1>
        <div className="flex gap-10">
          <div className="flex items-center gap-3">
            <p className="font-semibold text-orange-600">Categories:</p>
            <select
              onChange={(e) => setCat(e.target.value)}
              className="border p-1 border-gray-400 outline-none rounded-md text-sm"
            >
              <option value="">All</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="access">Accesories</option>
              <option value="jewels">Jwelries</option>
            </select>
          </div>
        </div>
      </div> */}
      <div className="flex flex-wrap gap-10 items-center justify-center ">
        {loading ? (
          <img src={require("../images/assets/loading.gif")} alt="" className="h-42" />
        ) : err ? (
          <h1 className="bg-red-500 p-2 text-white rounded-md text-lg w-full max-w-[500px] opacity-70 text-center">
            An error occured
          </h1>
        ) : (
          allProducts.map((p) => <ProductItem key={p._id} product={p} />)
        )}
      </div>
    </div>
  );
}
