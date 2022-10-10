

import { CameraIcon, XIcon } from '@heroicons/react/solid';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';


export default function Pictures({pic, uploadedPics, removedPics}) {

    const [file, setFile] = useState(null)
    const [deletePic, setDeletePic] = useState(false)

      const handleImage = (e) => {
        // If no image selected, return
        if (!/^image\//.test(e.target.files[0].type)) {
          console.log(`File ${e.target.files[0].name} is not an image.`);
          return false;
        }
        uploadedPics.push(e.target.files[0])
        !deletePic && removedPics.push(pic)
        setDeletePic(false)
        setFile(e.target.files[0]);
      };

      const chooseImg = useRef();

      const updateButton = () => {

        if(file){
            removedPics.filter(img => img != pic)
            setFile(null)
        } else {
            chooseImg.current.click();
          }

      }

      const deletePicture = () => {
        removedPics.push(pic)
        setDeletePic(true)
      }


  return (
    <div className="bg-gray-100 p-5 col-span-2 w-full min-h-[250px] flex flex-col items-center justify-center relative">
      <button
        onClick={updateButton}
        className="absolute top-5 border-b text-blue-500 font-semibold text-sm border-blue-500 z-10"
      >
        {file ? "Remove Picture" : deletePic ? "Add Picture" : "Change Picture"}
      </button>
      <input
        type="file"
        accept="image/"
        hidden
        ref={chooseImg}
        onChange={handleImage}
      />
      {deletePic ?
        <CameraIcon className="h-7 text-orange-600" /> :
        <img
        src={file ? URL.createObjectURL(file) : pic}
        alt=""
        className="w-full h-full absolute object-contain"
      />
      }
      { !deletePic  &&
      <span className="absolute top-2 text-md right-10 h-8 font-bold bg-white ml-3 p-1 mb-3 rounded-lg cursor-pointer">
          <XIcon onClick={deletePicture} className="h-4 text-red-700" />
      </span>
      }
    </div>
  );
}
