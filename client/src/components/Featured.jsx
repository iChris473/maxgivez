
import {useState, useEffect} from "react"
import {publicRequest} from "./axiosMethod"
import { useNavigate } from "react-router"

export default function Featured() {

  const [allFeatured, setAllFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/product/get?plat=top")
        setAllFeatured(res.data) 
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setErr(true)
      }
    }
    getProducts()
  }, [])

  const handleNavigation = (product) => {

    window.localStorage.setItem("product", JSON.stringify(product));

    navigate(`/single?id=${product._id}`);

    if(window.location.href.includes('single')){

      window.location.href = `/single?id=${product._id}#`

    }

  }



  return (
    <div className="mb-16 min-h-[70vh] bg-blue-100 w-screen px-3 py-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-gray-700 text-3xl">TOP GIFTS</h1>
      </div>
      {/* Featured products cards */}
      <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-8 mt-12">
        {loading ? (
          <img
            src={require("../images/assets/loading.gif")}
            alt=""
            className="h-42"
          />
        ) : ( err ? <h1 className="border tracking-wide border-red-500 p-5 text-red-500 rounded-md text-lg w-full max-w-[500px] opacity-70 text-center">Unable to get featured products due to bad connection</h1> :
          allFeatured.map((product) => (
            <div
              key={product._id}
              onClick={handleNavigation.bind(null, product)}
              className="border cursor-pointer hover:scale-110 border-gray-200 p-2 shadow-md w-full  md:max-w-[250px] lg:max-w-xs flex bg-gray-100 items-center justify-center flex-col gap-2 relative"
            >
              <img
                src={product.picture}
                alt=""
                className="w-52 h-52 object-contain"
              />
              <h3 className="font-bold text-gray-600 text-center text-lg">
                {product.name}
              </h3>
              <p className="bg-[#fcc68b] font-bold py-2 px-5 text-md rounded-sm">
                # {product.price.toLocaleString()}
              </p>
              <p className="p-2 pr-5 font-semibold rounded-r-md bg-orange-500 absolute top-0 left-0 text-white">
                NEW
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
