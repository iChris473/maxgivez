
import { CurrencyDollarIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";
import React from "react"
import { AuthContext } from "../../context/admin/AuthContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Widgets({users, earnings, orders}) {

  const {user} = React.useContext(AuthContext)
  const [usersNumber, setUsersNumber] = React.useState(0)
  const [ordersNumber, setOrdersNumber] = React.useState(0)

  const navigate = useNavigate()

  const request = axios.create({
    // baseURL: "https://maxigivez.herokuapp.com/api",
    baseURL: "http://localhost:8500/api",
    headers: { token: `Bearer ${user?.token}`}
  });

  
  React.useEffect(() => {

    const getAllData = async () => {
      
      const res = await request.get(`/admin/dashboard/${user.id}`)

      setUsersNumber(res.data.users)
      setOrdersNumber(res.data.orders)

    }

    getAllData()

  }, [])

  return (
    <div className="w-[97%] md:w-full p-4 border rounded-md border-gray-200 md:max-w-[350px] mx-auto shadow-md m-2 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-500 tracking-wider font-bold text-md">
          {users ? "USERS" : earnings ? "EARNINGS" : "ORDERS"}
        </h2>
        <p className="text-green-600 font-bold text-md">^ 20 %</p>
      </div>
      <h1 className="text-3xl font-bold text-gray-600">
        {users ? usersNumber : earnings ? "NGN 100,000" : ordersNumber}
      </h1>
      <div className="flex items-center justify-between">
        <button className="text-gray-600 border-b font-semibold text-sm border-gray-400">
          View all {users ? "Users" : earnings ? "Earnings" : "Orders"}
        </button>
        {
            users ? 
            <UserIcon className="h-6 text-pink-500" /> :
            earnings ? 
            <CurrencyDollarIcon className="h-6 text-yellow-500" /> :
            <ShoppingCartIcon className="h-6 text-green-500" />
        }
      </div>
    </div>
  );
}
