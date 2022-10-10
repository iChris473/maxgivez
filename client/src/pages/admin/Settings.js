

import Datatables from "../../components/admin/Datatables";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import EditAccount from "../../components/admin/EditAccount";
import { useState } from "react";
import Pagination from "../../components/admin/Pagination";
import { useNavigate } from "react-router";

export default function List() {
    const [mobile, setMobile] = useState(false)
    const navigate = useNavigate()
  return (
    <div
      className={`${
        mobile && "overflow-y-hidden h-screen"
      } overflow-x-hidden grid grid-cols-4`}
    >
      <Navbar setMobile={setMobile} />
      <div
        className={`${
          mobile ? "absolute" : "hidden"
        } md:block z-10 col-span-1 border-r border-blue-200 min-h-screen h-full mt-18`}
      >
        <Sidebar />
      </div>
      <div className="col-span-4 md:col-span-3 mt-24">
        <h1 className="text-2xl tracking-wider ml-5 font-bold text-gray-600">
          Settings
        </h1>
        <div className="flex items-center justify-between w-[95%] mx-auto m-5">
          <EditAccount />
        </div>
      </div>
    </div>
  );
}
