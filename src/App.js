import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./Home";
import PaymentSucess from "./PaymentSucess";
import Event from "./Event";
import Eventadmin from "./Eventadmin";
import Details from "./Details";
import Detailsadmin from "./Detailsadmin";
import Header from "./Header";
import Privacy from "./Privacy";
import Terms from "./Terms";
import axios from 'axios';
import Scrolltop from "./Scrolltop";
import React, { useState,useEffect } from 'react';
import MyRewards from "./MyRewards"
import MyTickets from "./MyTickets";
import Footer from "./Footer";
import ContactUs from "./Contactus";
import Cancellation from "./Cancellation";
function App() {
  const [isLogedin,setisLogedin] = useState({mobile:{number:null}});
  useEffect(() => {
//  Define the 'otpless' function
if(localStorage.getItem("nekoTssel-PTO") == null){
  localStorage.removeItem("mobile")
}
else{
  setisLogedin({token:localStorage.getItem("nekoTssel-PTO"),mobile:{number:localStorage.getItem("mobile")}})
}
 window.otpless = (otplessUser) => {
  // console.log(JSON.stringify(otplessUser));
  
  localStorage.setItem("mobile",otplessUser.mobile.number)
  setisLogedin(otplessUser)
  axios.post('https://v-gther-server-1.vercel.app/user/register', {name:otplessUser.mobile.name,number:otplessUser.mobile.number.slice(2,12)})

  
 };
}, []);

  return (
   <Router>
    <Header isLogedin={isLogedin}/>
    <Scrolltop/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/paymentsucess" element={<PaymentSucess/>}/>
      <Route path="/details" element={<Details isLogedin={isLogedin}/>}/>
      <Route path="/detailsadmin" element={<Detailsadmin isLogedin={isLogedin}/>}/>
      {/* <Route path="/login" element={<Login/>}/> */}
      <Route path="/events" element={<Event isLogedin={isLogedin}/>}/>
      <Route path="/eventsadmin" element={<Eventadmin isLogedin={isLogedin}/>}/>
      
      {/* <Route path="/verify" element={<OtpBox/>}/> */}
      {/* <Route path="/signup" element={<SignUp/>}/> */}
      <Route path="/myTickets" element={<MyTickets isLogedin={isLogedin}/>}/>
      <Route path="/myRewards" element={<MyRewards isLogedin={isLogedin}/>}/>
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
