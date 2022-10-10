
import { useContext, useEffect, useState } from "react"
import Navbar from "../../components/admin/Navbar"
import Sidebar from "../../components/admin/Sidebar"
import EditPerfume from "../../components/admin/EditPerfume"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/admin/AuthContext"
import axios from "axios"
import { useRecoilState } from "recoil"
import { productItem } from "../../components/modalAtom"
import { ref, deleteObject } from "firebase/storage";
import storage from "../../components/firebase"

export default function NewProduct() {

    const navigate = useNavigate()
    const [mobile, setMobile] = useState(false)
    const [query, setQuery] = useState("products")

    useEffect(() => {
        setQuery(window.location.href.split("=")[1])
    }, [window])

    const {user} = useContext(AuthContext)

    const request = axios.create({
      baseURL: "https://maxigivez.herokuapp.com/api",
      headers: { token: `Bearer ${user?.token}`}
    });
    
    const product = JSON.parse(window.localStorage.getItem("allGifts"))
    const [deleting, setDeleting] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [Error, setError] = useState(false)


    const deleteProduct = async () => {

      if(deleted){
        navigate(`/admin/product`)
        return
      } else {
        
        setDeleting(true)
        
        try {
          // delete image from firebase
          for(const picture of product.picture){

            const deleteRef = ref(storage, `${picture}`);
            // Delete the file
            deleteObject(deleteRef)
              .then(() => {
                // File deleted successfully
                console.log("old picture deleted");
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
                setError(true);
              });

          }

        } catch (error) {
          console.log(error);
        }

        try {
          await request.delete(`/product/delete/${user.id}?id=${product._id}`);
          setDeleting(false);
          setDeleted(true);
        } catch (error) {
          console.log(error);
          setDeleting(false);
        }
      }
    }

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
      <div className="col-span-4 md:col-span-3 mt-20 p-5 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide text-green-600 capitalize">
            Update Gift
          </h1>
          <button
            onClick={deleteProduct}
            className="text-black font-bold tracking-wider py-2 px-5 border border-gray-800 rounded-md max-w-[500px]"
          >
            {deleted ? "Back" : deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
        <div className="mt-6 p-2">
          {deleted ? (
            <h1 className="bg-green-500 text-xl text-white font-bold mt-20 p-2 w-full text-center mx-auto rounded-md">
              Product has been deleted succesfully
            </h1>
          ) : (
            <div>
              {Error && (
                <h1 className="bg-red-500 text-xl text-white font-bold mb-5 p-2 w-full text-center mx-auto rounded-md">
                  An error occured
                </h1>
              )}
              <EditPerfume query={query} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
