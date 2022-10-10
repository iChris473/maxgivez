
import { useEffect, useState } from "react"
import Navbar from "../../components/admin/Navbar"
import Sidebar from "../../components/admin/Sidebar"
import AddProduct from "../../components/admin/AddProduct"


export default function NewProduct() {

    const [mobile, setMobile] = useState(false)

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
      <div className="col-span-4 md:col-span-3 mt-20">
        <div className="p-5">
          <h1 className="text-2xl font-bold tracking-wide text-green-600 capitalize">
            Add {(window.location.href.split("=")[1] == "featured") ? "Top Gift" : "New Gift"}
          </h1>
          <div className="mt-6 p-2">
            <AddProduct query={window.location.href.split("=")[1]} />
          </div>
        </div>
      </div>
    </div>
  );
}
