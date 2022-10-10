

import { useContext, useEffect } from "react";
import {

  Routes,
  Route,
  Link
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { carts, updateTotal } from "./atom";
import { userRequest } from "./components/axiosMethod";
import { AuthContext } from "./context/AuthContext";
import { AuthContext as AdminContext } from "./context/admin/AuthContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

// ROUTES FOR PUBLIC DOMAIN
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import CustomProduct from "./pages/CustomProduct";

// ROUTES FOR ADMIN DOMAINS
import AdminHome from "./pages/admin/Home"
import AdminLogin from "./pages/admin/Login"
import AdminList from "./pages/admin/List"
import AllUsers from "./pages/admin/AllUsers"
import Arrival from "./pages/admin/Arrival"
import NewProduct from "./pages/admin/NewProduct"
import AdminAbout from "./pages/admin/About"
import Edit from "./pages/admin/Edit"
import Settings from "./pages/admin/Settings"
import Order from "./pages/admin/Order"
import Delivery from "./pages/admin/Delivery"

function App() {

  const [allCarts, setAllCarts] = useRecoilState(carts)
  const [total, setTotal] = useRecoilState(updateTotal)
  const {user} = useContext(AuthContext)
  const {user:admin} = useContext(AdminContext)

  useEffect(() => {

    const getUserCart = async () => {
      try {
        const usersCart = await userRequest.get(`/cart/user/${user?.id}?userid=${user?.id}`)
        setAllCarts(usersCart.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    user && getUserCart()

  }, [user, total])



  return (
    <>
      <Routes>

        {/* PUBLIC DOMAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/single" element={<SingleProduct />} />
        <Route path="/custom" element={<CustomProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/" element={ admin ? <AdminHome /> : <AdminLogin />} />
        <Route path="/admin/product" element={ admin ? <AdminList /> :  <AdminLogin /> } />
        <Route path="/admin/users" element={ admin ? <AllUsers /> : <AdminLogin />} />
        <Route path="/admin/arrival" element={ admin ? <Arrival /> :  <AdminLogin /> } />
        <Route path={`/admin/new`} element={ admin ? <NewProduct /> :  <AdminLogin />} />
        <Route path={`/admin/about`} element={ admin ? <AdminAbout /> :  <AdminLogin /> } />
        <Route path={`/admin/edit`} element={ admin ? <Edit /> :  <AdminLogin />}  />
        <Route path={`/admin/login`} element={ admin ? <AdminHome /> : <AdminLogin /> } />          
        <Route path={`/admin/settings`} element={ admin ? <Settings /> : <AdminLogin /> } />          
        <Route path={`/admin/order`} element={ admin ? <Order /> : <AdminLogin /> } />          
        <Route path={`/admin/delivery`} element={ admin ? <Delivery /> : <AdminLogin /> } />    

      </Routes>
    </>
  );
}

export default App;
