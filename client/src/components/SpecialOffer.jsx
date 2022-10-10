
import bg from "../images/e400.png"
import {useState, useEffect} from "react"
import {publicRequest} from "./axiosMethod"
import { useNavigate } from "react-router"

export default function SpecialOffer() {
  
  const [product, setProduct] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [err, setErr] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/product/get?plat=special")
        setProduct(res.data[0]) 
        console.log(res.data)
        // setLoading(false)/
      } catch (error) {
        console.log(error)
        // setLoading(false)
        // setErr(true)
      }
    }
    getProducts()
  }, [])

  const handleButton = () => {
    
    window.localStorage.setItem("product", JSON.stringify(product));
    
    navigate(`/single?id=${product._id}`);
  
  }


  return (
    <div className="relative h-[90vh] bg-black bg-opacity-60 flex justify-center">
        <img src={product?.picture} alt="" className="absolute top-0 w-screen h-full -z-10 object-cover opacity-90" />
        <div className="flex items-center justify-center flex-col gap-3">
            <h1 className="text-white text-3xl sm:text-4xl md:text-6xl tracking-wider font-bold russo">SPECIAL OFFER</h1>
            <p className="font-bold text-gray-300 text-2xl tracking-wide text-center"> {product?.name} <br /> <span className="text-green-500 font-bold"># {product?.price?.toLocaleString()} </span></p>
            <button onClick={handleButton} className="bg-orange-500 p-2 font-semibold text-white text-lg rounded-xl">SHOP NOW</button>
        </div>
    </div>
  )
}
