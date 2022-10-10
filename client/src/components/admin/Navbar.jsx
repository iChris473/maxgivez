
import {MenuAlt3Icon, XIcon} from "@heroicons/react/outline"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({setMobile}) {
  const [x, setX] = useState(false)
  return (
    <nav className="bg-gray-100 border-b shadow border-gray-50 p-5 fixed w-full z-50 flex items-center justify-between md:block">
      <Link to="/admin">
        <div className="flex items-center jusitfy-start">
          <img
            src={require("../../images/mlogo.png")}
            className="h-10 object-contain"
            alt=""
          />
          <h1 className="text-gray-800 text-center text-3xl md:text-4xl font-bold tangerine">
            Admin
          </h1>
        </div>
      </Link>
      {x ? (
        <XIcon
          onClick={() => {
            setX(false);
            setMobile(false);
          }}
          className="w-7 h-7 text-green-800 ml-2 md:hidden"
        />
      ) : (
        <MenuAlt3Icon
          onClick={() => {
            setX(true);
            setMobile(true);
          }}
          className="w-7 h-7 text-green-800 ml-2 md:hidden"
        />
      )}
    </nav>
  );
}
