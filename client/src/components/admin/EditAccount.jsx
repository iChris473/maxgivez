
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/admin/AuthContext";
import axios from 'axios'
import {PF} from "../pf"
// import { Request } from "./axiosMethod";

export default function EditAccount() {

    const {user, dispatch} = useContext(AuthContext)
    const request = axios.create({
      baseURL: "https://maxigivez.herokuapp.com/api",
      headers: { token: `Bearer ${user?.token}`}
    });

    const [editEmail, setEditEmail] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [passwrdSuccess, setPasswrdSuccess] = useState(false)
    const [emailSuccess, setEmailSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [paswrdErrorMessage, setPaswrdErrorMessage] = useState(false)

    const email = useRef()
    const oldPassword = useRef()
    const newPassword = useRef()
    const confirmPassword = useRef()

    const updatePassword = async e => {

        e.preventDefault()

        const timeOut = () => {
          setTimeout(() => {
            setPasswrdSuccess(false)
            setErrorMessage(false)
            setPaswrdErrorMessage(false)
          }, 3000)
        }  

        const newPasswrd = {
            password: newPassword.current.value,
            userID: user._id
        }

        if (confirmPassword.current.value == newPassword.current.value) {
            setLoading(true)
            try {
              await request.put(`/admin/update/${user.id}?p=${oldPassword.current.value}`, newPasswrd);
              setLoading(false)
              setErrorMessage(false);
              setPaswrdErrorMessage(false);
              setPasswrdSuccess(true);
              timeOut();
            } catch (err) {
                setLoading(false)
              setErrorMessage(err.response.data);
              timeOut();
            }
        } else {
            setErrorMessage(false)
            setPaswrdErrorMessage(true)
            timeOut()
        }
    }
    const updateEmail = async e => {
        e.preventDefault()
        if(user.email == email.current.value){
            setEditEmail(false)
            return;
        }
        setLoading(true)
        const timeOut = () => {
            setTimeout(() => {
              setLoading(false)
            setEmailSuccess(false)
            setErrorMessage("")
          }, 3000)
        }  

        const newPasswrd = {
            email: email.current.value,
            password: oldPassword.current.value,
            userID: user._id
        }

        try {
            await request.put(`/admin/update/${user.id}?p=${newPasswrd.password}`, newPasswrd)
            const newUser = {
                id: user.id,
                token: user.token,
                email: email.current.value
            }
            console.log(newUser)
            dispatch({type: "LOGIN_SUCCESS", payload:newUser});
            setErrorMessage(false)
            setEmailSuccess(true)
            setLoading(false)
            email.current.value = ''
            oldPassword.current.value = ''
            timeOut()
        } catch (err) {
            setErrorMessage(err.response.data)
            setLoading(false)
            timeOut()
        }
    }


  return (
    <div className="w-[99%] md:w-[95%] mx-auto p-8 border rounded-md border-gray-200 max-w-[950px] shadow-md">
      <div>
        <div
          className={`gap-3 items-center justify-center ${
            editEmail || editPassword ? "hidden" : "flex"
          }`}
        >
          <button
            onClick={() => setEditEmail(true)}
            className="hover:border-2 border p-2 text-gray-700 rounded-md cursor-pointer border-red-600"
          >
            Change Email
          </button>
          <button
            onClick={() => setEditPassword(true)}
            className="hover:scale-110 border text-sm border-blue-600 text-gray-700 cursor-pointer p-2 rounded-md"
          >
            Change Password
          </button>
        </div>
        {/* Edit Email or password */}
        {editEmail ? (
          <form onSubmit={updateEmail} className="flex flex-col">
            <div className="w-full flex flex-col gap-3">
              <p className="text-md text-green-500 font-semibold">
                Enter new email
              </p>
              {emailSuccess && (
                <p className="text-xs bg-green-500 p-2 text-white text-center font-semibold">
                  Email Changed
                </p>
              )}
              {errorMessage && (
                <p className="text-md font-bold bg-red-500 p-2 text-white text-center rounded-sm">
                  {errorMessage}
                </p>
              )}
              <input
                ref={email}
                type="email"
                className="border-none mt-4 outline-none focus:ring-0 text-gray-800 w-full text-md"
                placeholder={user.email}
              />
              <div className="border-b border-green-500 opacity-40 mt-1" />
              <div className="w-full flex flex-col gap-3">
                <p className="text-sm text-green-500">Enter Password</p>
                <input
                  ref={oldPassword}
                  required
                  type="password"
                  className="text-xs border-none outline-none focus:ring-0 text-gray-500 w-full"
                  placeholder="Password"
                />
              </div>
              <div className="border-b border-green-500 opacity-40 mt-1" />
            </div>
            <div className="flex items-center gap-5 justify-end my-3">
              <button
                onClick={() => setEditEmail(false)}
                className="hover:border-2 border p-1 font-semibold px-3  text-gray-700 rounded-md cursor-pointer border-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="hover:scale-110 border bg-green-500 text-white cursor-pointer p-1 px-3 font-semibold rounded-md"
              >
                {loading ? "Updating..." : "Confirm"}
              </button>
            </div>
          </form>
        ) : (
          editPassword && (
            <form onSubmit={updatePassword} className="flex flex-col">
              <div className=" w-full flex flex-col gap-3">
                <p className="text-lg text-green-500 font-semibold">
                  Edit Password
                </p>
                {passwrdSuccess && (
                  <p className="text-xs bg-green-500 p-2 text-white text-center font-semibold">
                    Password Changed
                  </p>
                )}
                {errorMessage && (
                  <p className="text-md font-bold bg-red-500 p-2 text-white text-center rounded-sm">
                    {errorMessage}
                  </p>
                )}
                {paswrdErrorMessage && (
                  <p className="text-xs bg-red-500 p-2 text-white text-center font-semibold">
                    Passwords doesnt match
                  </p>
                )}
                <input
                  ref={oldPassword}
                  required
                  type="password"
                  className="text-xs border-none outline-none focus:ring-0 text-gray-500 w-full"
                  placeholder="enter old password"
                />
                <div className="border-b border-green-500 opacity-40 mt-1" />
                <input
                  ref={newPassword}
                  required
                  type="password"
                  className="text-xs border-none outline-none focus:ring-0 text-gray-500 w-full"
                  placeholder="enter new password"
                />
                <div className="border-b border-green-500 opacity-40 mt-1" />
                <input
                  ref={confirmPassword}
                  required
                  type="password"
                  className="text-xs border-none outline-none focus:ring-0 text-gray-500 w-full"
                  placeholder="confirm new password"
                />
                <div className="border-b border-green-500 opacity-40 mt-1" />
              </div>
              <div className="flex items-center gap-5 justify-end my-3">
                <button
                  onClick={() => setEditPassword(false)}
                  className="hover:border-2 border p-1 font-semibold px-3  text-gray-700 rounded-md cursor-pointer border-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="hover:scale-110 border bg-green-500 text-white cursor-pointer p-1 px-3 font-semibold rounded-md"
                >
                  {loading ? "Updating..." : "Confirm"}
                </button>
              </div>
            </form>
          )
        )}
      </div>
    </div>
  );
}