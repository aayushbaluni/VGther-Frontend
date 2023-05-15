import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./Home";
import PaymentSucess from "./PaymentSucess";
import Event from "./Event";
import Details from "./Details";
import Header from "./Header";
import Login from "./Login";
import OtpBox from "./OtpScreen";
import SignUp from "./SignUp";
import Privacy from "./Privacy";
import Terms from "./Terms";
import Scrolltop from "./Scrolltop";
import React, { useState,useEffect } from 'react';

import MyTickets from "./MyTickets";
import Footer from "./Footer";
function App() {
  const [isLogedin,setisLogedin] = useState('');
  useEffect(() => {
//  Define the 'otpless' function
 window.otpless = (otplessUser) => {
  // console.log(JSON.stringify(otplessUser));
  console.log(otplessUser.mobile.number);
  localStorage.setItem("number",9413465367);
  setisLogedin(JSON.stringify(otplessUser))
  console.log(isLogedin)
 };
}, []);
  return (
   <Router>
    <Header isLogedin={isLogedin}/>
    <Scrolltop/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/paymentsucess" element={<PaymentSucess/>}/>
      <Route path="/details" element={<Details/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/events" element={<Event/>}/>
      <Route path="/verify" element={<OtpBox/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/myTickets" element={<MyTickets/>}/>
      <Route path="/legal/privacy" element={<Privacy/>}/>
      <Route path="/legal/terms" element={<Terms/>}/>
    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
