import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import LoginPageBuyer from "./Components/LoginPageBuyer";
import SignUpPageBuyer from "./Components/SignupPageBuyer";
import SignUpPageSeller from "./Components/SignupPageSeller";
import LoginPageSeller from "./Components/LoginPageSeller";
import MainPage from "./Components/MainPage";
import BuyerDashboard from "./Components/BuyerDashboard";
import ProductDescription from "./Components/ProductDescription";
import PaymentPage from "./Components/paymentPage";
import DesignerDashboard from "./Components/DesignerDashboard";
import AddNewProduct from "./Components/AddNewProduct";
import Orders from "./Components/Orders";
import MyWishList from "./Components/MyWishList";
import ProfileUpdate from "./Components/ProfileUpdate";
import UpdateProduct from "./Components/UpdateProduct";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
   
  const hideNavbarPaths = [
    "/",
    "/buyer/login",
    "/buyer/signup",
    "/seller/login",
    "/seller/signup",
  ];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/buyer/login" element={<LoginPageBuyer />} />
        <Route path="/buyer/signup" element={<SignUpPageBuyer />} />
        <Route path="/seller/signup" element={<SignUpPageSeller />} />
        <Route path="/seller/login" element={<LoginPageSeller />} />
        <Route path="/buyerDashboard" element={<BuyerDashboard />} />
        <Route path="/product/:id" element={<ProductDescription />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/designer_dash" element={<DesignerDashboard />} />
        <Route path="/addProduct" element={<AddNewProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<MyWishList />} />
        <Route path="/profile_update" element={<ProfileUpdate />} />
        <Route path="/edit_prod" element={<UpdateProduct />} />
      </Routes>
    </>
  );
}

export default App;