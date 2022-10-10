
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { filter } from "../atom";
import menF from "../images/menF.png"
import womenF from "../images/womenF.png"
import allP from "../images/allP.jpg"
import ringL from "../images/ringL.jpg"

export default function Category() {

  const [catgry, setCatgry] = useRecoilState(filter)
  const navigate = useNavigate()

  return (
    <div className="my-12 p-5 flex flex-wrap gap-5 items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-[450px] shadow-md bg-gray-100 p-10 gap-5">
        <img src={menF} alt="" className="md:w-40 w-[8rem] h-[8rem] md:h-40" />
        <div>
          <h2 className="text-gray-700 font-bold text-2xl md:text-3xl">Men's</h2>
          <h1 className="text-gray-700 font-bold text-2xl md:text-3xl">Fashion</h1>
          <button onClick={() => navigate("/product")} className="p-1 text-xs rounded-sm font-semibold mt-5 text-gray-600 border border-gray-600">view collection</button>
        </div>
      </div>
      <div className="flex items-center justify-between w-full max-w-[450px] shadow-md bg-gray-100 p-10 gap-5">
        <img src={womenF} alt="" className="md:w-40 w-[8rem] h-[8rem] md:h-40" />
        <div>
          <h2 className="text-gray-700 font-bold text-2xl md:text-3xl">Women's</h2>
          <h1 className="text-gray-700 font-bold text-2xl md:text-3xl">Fashion</h1>
          <button onClick={() => navigate("/product")} className="p-1 text-xs rounded-sm font-semibold mt-5 text-gray-600 border border-gray-600">view collection</button>
        </div>
      </div>
      <div className="flex items-center justify-between w-full max-w-[450px] shadow-md bg-gray-100 p-10 gap-5">
        <img src={ringL} alt="" className="md:w-40 w-[8rem] h-[8rem] md:h-40" />
        <div>
          <h2 className="text-gray-700 font-bold text-2xl md:text-3xl">General</h2>
          <h1 className="text-gray-700 font-bold text-2xl md:text-3xl">Accessories</h1>
          <button onClick={() => navigate("/product")} className="p-1 text-xs rounded-sm font-semibold mt-5 text-gray-600 border border-gray-600">view collection</button>
        </div>
      </div>
      <div className="flex items-center justify-between w-full max-w-[450px] shadow-md bg-gray-100 p-10 gap-5">
        <img src={allP} alt="" className="md:w-40 w-[8rem] h-[8rem] md:h-40" />
        <div>
          <h2 className="text-gray-700 font-bold text-2xl md:text-3xl">All</h2>
          <h1 className="text-gray-700 font-bold text-2xl md:text-3xl">PRODUCTS</h1>
          <button onClick={() => navigate("/product")} className="p-1 text-xs rounded-sm font-semibold mt-5 text-gray-600 border border-gray-600">view collection</button>
        </div>
      </div>
    </div>
  );
}
