
import { CameraIcon, XIcon } from "@heroicons/react/solid";
import { useState, useRef, useContext } from "react";
import { useRecoilState } from "recoil";
import { productItem } from "../modalAtom";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import storage from "../firebase"
import axios from "axios";
import { AuthContext } from "../../context/admin/AuthContext";
import Pictures from "./Pictures";

export default function AddProduct({query}) {

  const {user} = useContext(AuthContext)
  const request = axios.create({
    baseURL: "https://maxigivez.herokuapp.com/api",
    headers: { token: `Bearer ${user?.token}`}
  });
  
  // const [product, SetProduct] = useRecoilState(productItem)
  const product = JSON.parse(window.localStorage.getItem("allGifts"))
  const [counter, setCounter] = useState(product?.quantity)
  const [file, setFile] = useState(null)
  const [addPic, setAddPic] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [removedPics, setRemovedPics] = useState([])
  const [uploadedPics, setUploadedPics] = useState([])

    // Select all inputs
    const name = useRef()
    const brand = useRef()
    const desc = useRef()
    const price = useRef()
    const quantity = useRef()
    const category = useRef();
    const chooseImg = useRef();
    const platform = useRef();
   
    const handleImage = (e) => {

      // If no image selected, return
      if (!/^image\//.test(e.target.files[0].type)) {
        console.log(`File ${e.target.files[0].name} is not an image.`);
        return false;
      }
      uploadedPics.push(e.target.files[0])
      setAddPic([...addPic, e.target.files[0]])

    };


    const updatePerfume = async (e) => {

      e.preventDefault();

      setLoading(true);

      const newProduct = {};
      name.current.value && (newProduct.name = name.current.value)
      category.current.value && (newProduct.category = category.current.value)
      price.current.value && (newProduct.price = price.current.value)
      quantity.current.value && (newProduct.quantity = quantity.current.value)
      desc.current.value && (newProduct.desc = desc.current.value)
      brand.current.value && (newProduct.brand = brand.current.value)
      platform.current.value && (newProduct.platform = platform.current.value)

      let newPictures = product.picture.filter(pic => !removedPics.includes(pic))

      if(removedPics.length > 0){

          removedPics.forEach(async (img) => {
                // delete previous file
                const deleteRef = ref(storage, `${img}`);
                // Delete the file
                deleteObject(deleteRef)
                  .then(() => {
                    // File deleted successfully
                    console.log("old picture deleted");
                     
                  })
                  .catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(error);
                  });
                });
        }

    try {

      if(uploadedPics.length > 0){

        for(const pic of uploadedPics){

          const firebaseImageRef = ref(storage, `${pic.name}`);
          const metadata = {
            contentType: "image/jpeg",
          };
          // const uploadTask = uploadBytes(storageRef, file, metadata)
          await uploadBytes(firebaseImageRef, pic, metadata).then(
            async (snapshot) => {
              const downloadURL = await getDownloadURL(firebaseImageRef);
              newPictures.push(downloadURL)
              newProduct.picture = newPictures;
            }
          );
        }
      } else{
        newProduct.picture = newPictures
      }

    } catch (error) {

        console.log(error);
        setLoading(false);
        setSuccess(false)
        setError(true)
        timeout()
        return;

      }

      const timeout = () => {
        setTimeout(() => {
          setLoading(false);
          setSuccess(false);
          setError(false);
        }, 4000);
      };

      try {
        console.log(newProduct)
        
        const res = await request.put(`/product/update/${user.id}?id=${product._id}`, newProduct)
        setLoading(false);
         name.current.value = ""
         price.current.value = ""
         category.current.value = ""
        //  setCounter(res.data.quantity)
         desc.current.value = ""
         brand.current.value = ""
         setFile(null)
         setError(false)
         setSuccess(true)
         timeout()
       } catch (error) {
         setLoading(false);
         setSuccess(false)
         setError(true)
         timeout()
       }

    };

  return (
    <div className="w-[99%] md:w-[95%] mx-auto p-4 border rounded-md border-gray-200 max-w-[950px] shadow-md">
      {success && (
        <h1 className="bg-green-500 opacity-80 p-2 text-white rounded-sm m-4 font-bold text-center">
          Product was succesffuly Updated
        </h1>
      )}
      {error && (
        <h1 className="bg-red-500 p-2 text-white rounded-sm m-4 font-bold text-center">
          An error occured
        </h1>
      )}
      <div className="flex flex-col gap-5 md:grid grid-cols-5 space-x-5">
        <div className="bg-gray-100 p-5 col-span-2 w-full h-[120px] flex flex-col items-center justify-center relative">
          <button
            onClick={() => chooseImg.current.click()}
            className="absolute top-5 border-b text-orange-600 font-semibold text-sm border-orange-500 z-10"
          >
            Add Picture
          </button>
          <CameraIcon
            onClick={() => chooseImg.current.click()}
            className="h-7 text-orange-600"
          />
          <input
            type="file"
            accept="image/"
            hidden
            ref={chooseImg}
            onChange={handleImage}
          />
        </div>

        {addPic?.map((pic) => (
          <div className="bg-gray-100 p-5 col-span-2 w-full min-h-[250px] flex flex-col items-center justify-center relative">
            <img
              src={URL.createObjectURL(pic)}
              alt=""
              className="w-full h-full absolute object-contain"
            />
            <span className="absolute top-2 text-md right-10 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer">
              <XIcon onClick={() => setAddPic(addPic.filter(p => p != pic))} className="h-4 text-red-700" />
            </span>
          </div>
        ))}

        {product?.picture.map((pic) => (
          <Pictures
            pic={pic}
            removedPics={removedPics}
            uploadedPics={uploadedPics}
          />
        ))}

        <form onSubmit={updatePerfume} className="col-span-3 space-y-5 py-5">
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Gift's Name
            </p>
            <input
              type="text"
              ref={name}
              defaultValue={product.name}
              placeholder="perfume name"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Gift's Description
            </p>
            <textarea
              type="text"
              ref={desc}
              defaultValue={product.desc}
              placeholder="Add a short description about the perfume"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Gift's Price (NGN)
            </p>
            <input
              type="number"
              ref={price}
              defaultValue={product?.price}
              placeholder="1200"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Brand
            </p>
            <input
              type="text"
              ref={brand}
              defaultValue={product.brand}
              placeholder="Dolce and Gbanana"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Quantity
            </p>
            <div className="border-b rounded-sm border-gray-300 flex items-center justify-between px-7">
              <button
                disabled={counter == 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCounter(counter - 1);
                }}
                className="text-xl text-gray-700 font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                ref={quantity}
                value={counter}
                onChange={(e) => setCounter(e.target.value)}
                className="outline-none text-gray-700 max-w-[20px] mx-4 text-center placeholder:text-gray-800 text-lg font-semibold"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCounter(counter + 1);
                }}
                className="text-xl text-gray-700 font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Category
            </p>
            <select
              ref={category}
              onChange={(e) => e.preventDefault()}
              className="border-b p-1 border-gray-400 outline-none rounded-md text-sm w-full"
            >
              <option value={product.category}>{product.category}</option>
              <option value="shoe">Shoes</option>
              <option value="male_clothes">Male Clothes</option>
              <option value="female_clothes">Female Clothes</option>
              <option value="electronics">Electronics</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Platform
            </p>
            <select
              ref={platform}
              onChange={(e) => e.preventDefault()}
              className="border-b p-1 border-gray-400 outline-none rounded-md text-sm w-full"
            >
              <option value={product?.platform}>{product?.platform}</option>
              <option value="all">All</option>
              <option value="top">Top</option>
              <option value="special">Special</option>
              <option value="new">New</option>
              <option value="trend">Trending</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white font-bold tracking-wider p-2 bg-orange-600 rounded-md block w-full mx-auto max-w-[500px]"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
