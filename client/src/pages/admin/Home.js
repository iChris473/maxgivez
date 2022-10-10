
import Charts from '../../components/admin/Charts';
import Featured from '../../components/admin/Featured';
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import Widgets from '../../components/admin/Widgets';
import Table from '../../components/admin/Tables';
import Pagination from '../../components/admin/Pagination';
import {useState} from "react"

export default function Home() {
  const [mobile, setMobile] = useState(false)
  return (
    <div className={`${mobile && "overflow-y-hidden h-screen"} overflow-x-hidden grid grid-cols-4`}>
      <Navbar setMobile={setMobile} />
      <div className={`${mobile ? "absolute" : "hidden"} md:block z-10 col-span-1 border-r border-blue-200 min-h-screen h-full mt-18`}>
        <Sidebar />
      </div>
      <div className="col-span-4 md:col-span-3 mt-24">
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-5 p-2 w-full">
          <Widgets users={true} />
          <Widgets orders={true} />
          <Widgets earnings={true} />
        </div>
        <div className="flex flex-col m-1">
          <Featured />
          <Charts />
        </div>
        {/* <div className="m-5 my-8">
          <h1 className="text-xl tracking-wider mb-4 font-bold text-gray-600">
            Recent Transactions
          </h1>
          <Table />
          <div className="flex justify-end my-5">
            <Pagination />
          </div>
        </div> */}
      </div>
    </div>
  );
}
