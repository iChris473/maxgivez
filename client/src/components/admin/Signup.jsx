import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PF } from "../pf";
import { useNavigate } from "react-router";
import { publicRequest } from "./axiosMethod";

export default function Signup() {

  const [passwrdErr, setPasswrdErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [signErr, setSignErr] = useState("")
  const [err, setErr] = useState(false)
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    
    const timeout = () => {
      setTimeout(() => {
        setPasswrdErr(false);
        setLoading(false);
        setErr(false)
        setSignErr("")
        return;
      }, 3000);
    } 
  
    if(password.current.value != confirmPassword.current.value){
      setSignErr("Passwords does not match");
      setErr(true)
        timeout()
      } else {
        if(password.current.value.length < 5) {
          setSignErr("Password should exceed 4 characters");
          setErr(true)
          timeout()
        } else {
          setLoading(true)
          // do the async registeration stuff
          const newUser = {
            email: email.current.value,
            password: password.current.value
          }

         try {
           await publicRequest.post("/user/register", newUser)
           navigate("/login")
         } catch (error) {
           setSignErr(error.response.data);
           setErr(true)
           setLoading(false)
           timeout()
         }
        }
      
    }
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center relative  bg-black bg-opacity-30 h-screen">
        <img
          src={require("../images/sign.jpg")}
          className="h-full w-full absolute object-cover opacity-50 -z-10 "
        />
        <div className="shadow-lg bg-white p-2 border rounded-md z-20 min-w-[350px] sm:w-[500px] mx-5">
          <h1 className="text-3xl text-gray-700 font-semibold pb-2 w-[90%] border-b border-blue-200 text-center m-2 mb-4 mx-auto">
            Create an Account
          </h1>
          {
            err && 
            <p className="p-2 bg-red-400 text-white w-full font-semibold text-md text-center rounded">{signErr}</p>
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
              <p className="text-xs tracking-wide text-gray-600">
                New Password
              </p>
              <input
                ref={password}
                type="password"
                required
                className="border text-lg outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
              />
            </div>
            <div className="w-full space-y-2">
              <p className="text-xs tracking-wide text-gray-600">
                Confirm Password
              </p>
              <input
                ref={confirmPassword}
                required
                type="password"
                className="border outline-none focus-ring-0 p-2 rounded-md focus:border-green-200 w-full "
              />
            </div>
            <button type="submit" className="bg-orange-600 p-1 rounded-lg w-full text-white font-semibold tracking-wide text-md">
              {loading ? "Registering..." : "Register"}
            </button>
            <Link to="/login">
              <p className="mt-5 cursor-pointer text-gray-700 font-semibold tracking-wide text-xs text-center">
                Already have an account?
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
