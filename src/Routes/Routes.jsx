import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../admin/components/Dashboard/Dashboard';
import Products from '../admin/pages/Products/Products';
import AddProductForm from '../admin/pages/3DMode/ProductForm/AddproductForm';
import Home from '../Home';
import Login from '../clients/components/Login/Login';
import RegisterType from '../clients/components/Register/RegisterType';
import UserRegister from '../clients/components/Register/UserRegister';
import StoreRegister from '../clients/components/Register/StoreRegister';
import UserAccount from '../clients/components/UserAccount/UserAccount';
import Cart from '../clients/components/Cart/Cart';
import Payment from '../clients/pages/Payment/Payment';
import Orders from '../clients/pages/Orders/Orders';
import OrderDetails from '../clients/pages/Orders/OrderDetials';


const Links = () => {
  return (
    <Router>
      <Routes>
        {/* client */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterType />} />
        <Route path="/registeruser" element={<UserRegister />} />
        <Route path="/registerstore" element={<StoreRegister />} />
        <Route path="/useraccount" element={<UserAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment/:storeId" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />



        {/* admin */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/add" element={<AddProductForm />} />

      </Routes>
    </Router>
  )
}

export default Links
