import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./Home";
import PaymentSucess from "./PaymentSucess";
import Event from "./Event";
import Eventadmin from "./Eventadmin";
// import Details from "./Details";
import Detailsadmin from "./Detailsadmin";
import Header from "./Header";
import Privacy from "./Privacy";
import Terms from "./Terms";
import Scrolltop from "./Scrolltop";
import React, { useState,useEffect } from 'react';

import MyTickets from "./MyTickets";
import Footer from "./Footer";
import ContactUs from "./Contactus";
import Cancellation from "./Cancellation";
function App() {
  const [isLogedin,setisLogedin] = useState({mobile:{number:null}});
  useEffect(() => {
//  Define the 'otpless' function
 window.otpless = (otplessUser) => {
  // console.log(JSON.stringify(otplessUser));
  console.log(otplessUser.mobile.number);
  // localStorage.setItem("data",otplessUser);
  setisLogedin(otplessUser)
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
      {/* <Route path="/details" element={<Details isLogedin={isLogedin}/>}/> */}
      <Route path="/detailsadmin" element={<Detailsadmin isLogedin={isLogedin}/>}/>
      {/* <Route path="/login" element={<Login/>}/> */}
      <Route path="/events" element={<Event isLogedin={isLogedin}/>}/>
      <Route path="/eventsadmin" element={<Eventadmin isLogedin={isLogedin}/>}/>
      
      {/* <Route path="/verify" element={<OtpBox/>}/> */}
      {/* <Route path="/signup" element={<SignUp/>}/> */}
      <Route path="/myTickets" element={<MyTickets isLogedin={isLogedin}/>}/>
      <Route path="/legal/privacy" element={<Privacy/>}/>
      <Route path="/legal/terms" element={<Terms/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route path="/legal/cancellation" element={<Cancellation/>}/>
    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
