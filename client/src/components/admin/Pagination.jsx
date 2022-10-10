
import {useState, useEffect} from "react"
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/outline"

export default function Pagination() {
    const [page, setPage] = useState(1)
    const [credential, setCredential] = useState([])
    const [pages, setPages] = useState(1)
    const [limit, setLimit] = useState(10)
    const [startValue, setStartValue] = useState(5)
    useEffect(() => {
        setStartValue(Math.floor((page - 1) / 5) * 5)
      },[page])
    
  return (
    <div>
      <div className="flex my-5 items-center">
        <button
          className="disabled:bg-gray-300 mr-[2px] lg:mr-2"
          onClick={() => setPage(page - 1)}
          disabled={page == 1}
        >
          <ArrowLeftIcon className="h-5 lg:h-9 text-gray-600 border border-gray-300 p-1" />
        </button>

        {/* middle paginations */}

        {page > 5 && pages - page >= 5 && (
          <>
            <button
              disabled={page == 1}
              onClick={() => setPage(1)}
              className=" text-gray-600 ml[2px] lg:ml-2 border text-sm lg:text-xl py-[2px] border-gray-300 px-3 disabled:bg-gray-300"
            >
              1
            </button>
            <button className=" text-gray-600 ml[2px] lg:ml-2 border text-sm lg:text-xl py-[2px] border-gray-300 px-3 disabled:bg-gray-300">
              ...
            </button>
          </>
        )}

        {page <= 5
          ? [...Array(5)].map((_, i) => (
              <button
                hidden={i + 1 > pages}
                key={i + 1}
                disabled={page == i + 1}
                onClick={() => setPage(i + 1)}
                className=" text-gray-600 ml-[2px] lg:ml-2 border text-sm lg:text-xl py-[2px] border-gray-300 px-3 disabled:bg-gray-300"
              >
                {i + 1}
              </button>
            ))
          : [...Array(5)].map((_, i) => (
              <button
                key={startValue + i + 1}
                hidden={startValue + i + 1 > pages}
                disabled={page == startValue + i + 1}
                onClick={() => setPage(startValue + i + 1)}
                className=" text-gray-600 border border-gray-300 ml-[2px] lg:ml-2 text-sm lg:text-xl py-[2px] px-3 disabled:bg-gray-300"
              >
                {startValue + i + 1}
              </button>
            ))}
        <button
          hidden={page >= pages - 2}
          className="text-sm lg:text-xl mx-[2px] lg:mx-2 py-[2px] text-gray-600 border border-gray-300 px-3 disabled:bg-gray-300"
        >
          ...
        </button>
        <button
          hidden={page >= pages - 2}
          onClick={() => setPage(pages)}
          className="text-sm lg:text-xl text-gray-600 border border-gray-300 py-[2px] px-3 disabled:bg-gray-300"
        >
          {pages}
        </button>
        <button
          className="disabled:bg-gray-300 ml-[2px] lg:ml-2"
          onClick={() => setPage(page + 1)}
          disabled={page == pages}
        >
          <ArrowRightIcon className="h-5 lg:h-9 text-gray-600 border border-gray-300 p-1" />
        </button>
      </div>
    </div>
  );
}
