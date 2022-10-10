
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "./axiosMethod";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";


export default function Signin() {

  
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  const email = useRef()
  const password = useRef()
  const [loginErr, setLoginErr] = useState(false)
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const  handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    
    const timeout = () => {
      setTimeout(() => {
        setErr(false);
        setLoading(false);
      }, 3000);
    } 
     const newUser = {
       email: email.current.value,
       password: password.current.value
     }
    try {

      const uri = window.localStorage.getItem('uri')
      
      const res = await publicRequest.post("/user/login", newUser);

      dispatch({type: "LOGIN_SUCCESS", payload:res.data})

      uri ? (window.location.href = uri) : navigate('/product')

    } catch (error) {
      setLoginErr(error.response.data);
      setErr(true)
      setLoading(false)
      timeout()
    }

  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center relative bg-black bg-opacity-30 h-screen">
        <img
          src={require("../images/sign.jpg")}
          className="h-full w-full absolute object-cover opacity-50 -z-10 "
        />
        <div className="shadow-lg bg-white p-2 border rounded-md z-20 min-w-[350px] sm:w-[500px] mx-5">
          <h1 className="text-3xl text-gray-700 font-semibold pb-2 w-[90%] border-b border-blue-200 text-center m-2 mb-4">
            Log in
          </h1>
          {
            err && 
            <p className="p-2 bg-red-400 text-white w-full font-semibold text-md text-center rounded">{loginErr}</p>
          }
          <form onSubmit={handleSubmit} className="space-y-4 mb-5 m-2">
            <div className="w-full space-y-2">
              <p className="text-xs tracking-wide text-gray-600">Email</p>
              <input
                ref={email}
                required
                type="email"
                placeholder="user@email.com"
                className="border font-sans outline-none text-gray-700 focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
              />
            </div>
            <div className="w-full space-y-2">
              <p className="text-xs tracking-wide text-gray-600">Password</p>
              <input
                type="password"
                required
                ref={password}
                className="border text-lg outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
              />
            </div>
            <button type="submit" className="bg-orange-600 p-1 rounded-lg w-full text-white font-semibold tracking-wide text-md">
              {loading ? "Sginin in..." : "Sign In"}
            </button>
            <Link to="/register">
              <p className="mt-5 cursor-pointer text-gray-700 font-semibold tracking-wide text-xs text-center">
                Create an account
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
