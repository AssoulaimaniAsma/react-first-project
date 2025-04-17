import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import Signin from "../composante/Client/Signin/signin";
import Signup from "../composante/Client/Signup/signup";
import Navbar from "../composante/Client/Navbar/Navbar";
import ContactForm from "../composante/Client/feed_back/feed_back";
import Home from "../composante/Client/home/Home";
import Our_Menu from "../composante/Client/Our_Menu/Our_Menu";
import AccountSettings from "../composante/Client/Account_Setting/Account_Setting";
import CartPage from "../composante/Client/CartPage/CartPage";
import History from "../composante/Client/History/History";
import Checkout from "../composante/Client/Checkout/Checkout";
import ItemCard from "../composante/Client/Test_item_card/ItemCard";
import VerifyAccount from "../composante/Client/VerifyAccount/VerifyAccount";
import { CartProvider } from "../composante/Client/CartContext/CartContext";
import ForgotPasswordForm from "../composante/Reset/ForgotPasswordForm";
import ResetPasswordForm from "../composante/Reset/ResetPasswordForm";
import AddressForm from "../composante/Client/Address/AddressForm";
import UserAddresses from "../composante/Client/Address/UserAddresses";
import EditAddress from "../composante/Client/Address/EditAddress";
import ShowAddress from "../composante/Client/Address/ShowAddress";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();
  const signinRef = useRef(null);
  const signupRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const accountRef = useRef(null);
  const cartePageRef= useRef(null);
  const ourmenuRef= useRef(null);
  const itemCardRef=useRef(null);
  const historyRef= useRef(null);
  const checkoutRef=useRef(null);
  const verifyRef=useRef(null);
  const resetRef = useRef(null);
  const forgetRef=useRef(null);
  const addresRef= useRef(null);
  const useraddressRef= useRef(null);
  const editaddressRef= useRef(null);
  const showaddressRef= useRef(null);
    return (
    <TransitionGroup>
      <CSSTransition 
        key={location.pathname} 
        classNames="fade" 
        timeout={500} 
        nodeRef={
          location.pathname === "/signup" ? signupRef :  
          location.pathname === "/contact" ? contactRef : 
          location.pathname === "/signin" ? signinRef :
          location.pathname === "/account" ? accountRef :
          location.pathname === "/CartPage" ? cartePageRef : 
          location.pathname ==="/Our_Menu"  ? ourmenuRef:
          location.pathname === "/History" ? historyRef : 
          location.pathname ==="/SideBar"  ? ourmenuRef:
          location.pathname ==="/Checkout"  ? checkoutRef:
          location.pathname ==="/ItemCard"  ? itemCardRef:
          location.pathname==="/VerifyAccount" ? verifyRef:
          location.pathname==="/auth/ForgotPasswordForm" ? forgetRef:
          location.pathname==="/auth/resetPassword" ? resetRef:
          location.pathname==="/client/Address/:isEditable" ? addresRef:
          location.pathname==="/client/allAddress" ? useraddressRef:
          location.pathname==="/client/Address/edit/:id" ? editaddressRef:
          location.pathname==="/client/Address/show/:id" ? showaddressRef:

          homeRef
          
        }
      >
        <div ref={
          location.pathname === "/signup" ? signupRef :  
          location.pathname === "/contact" ? contactRef : 
          location.pathname === "/signin" ? signinRef :
          location.pathname === "/account" ? accountRef :
          location.pathname === "/CartPage" ? cartePageRef : 
          location.pathname ==="/Our_Menu"  ? ourmenuRef:
          location.pathname === "/History" ? historyRef :
          location.pathname ==="/SideBar"  ? ourmenuRef:
          location.pathname ==="/Checkout"  ? checkoutRef:
          location.pathname ==="/ItemCard"  ? itemCardRef:
          location.pathname==="/VerifyAccount" ? verifyRef:
          location.pathname==="auth/ForgotPasswordForm" ? forgetRef:
          location.pathname==="/auth/resetPassword" ? resetRef:
          location.pathname==="/client/Address/:isEditable" ? addresRef:
          location.pathname==="/client/allAddress" ? useraddressRef:
          location.pathname==="/client/Address/edit/:id" ? editaddressRef:
          location.pathname==="/client/Address/show/:id" ? showaddressRef:

          homeRef
        }>
          <Routes location={location}>
          <Route path="/client" element={<Home />} />
          <Route path="/client/signin" element={<Signin />} />
          <Route path="/client/signup" element={<Signup />} />
          <Route path="/client/contact" element={<ContactForm />} />
          <Route path="/client/CartPage" element={<CartPage />} />
          <Route path="/client/account" element={<AccountSettings />} />
          <Route path="/client/Our_Menu" element={<Our_Menu />} />
          <Route path="/client/ItemCard" element={<ItemCard />} />
          <Route path="/client/history/:userId" element={<History />} />
          <Route path="/client/Checkout" element={<Checkout />}/>
          <Route path="/client/verifyAccount" element={<VerifyAccount />}/>
          <Route path="/auth/resetPassword" element={<ResetPasswordForm />}/>
          <Route path="/auth/ForgotPasswordForm" element={<ForgotPasswordForm />}/>
          <Route path="/client/Address/:isEditable" element={<AddressForm />}/>
          <Route path="/client/allAddress" element={<UserAddresses />}/>
          <Route path="/client/Address/edit/:id" element={<EditAddress />}/>
          <Route path="/client/Address/show/:id" element={<ShowAddress />}/>

          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function Main() {
  const location = useLocation(); 
  return (
    <>
      {location.pathname !== "/client/signin" && location.pathname !== "/client/signup"&& location.pathname !== "/auth/resetPassword" && location.pathname !== "/auth/ForgotPasswordForm" && <Navbar />}
      <AnimatedRoutes />
    </>
  );
}

function AppClient() {
  return (
      <CartProvider>
          <Main />
      </CartProvider>
  );
}

export default AppClient;