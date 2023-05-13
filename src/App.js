import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./Home";
import PaymentSucess from "./PaymentSucess";
import Event from "./Event";
import Details from "./Details";
import Header from "./Header";
import Login from "./Login";
import OTPBox from "./OtpScreen";
import OtpBox from "./OtpScreen";
import SignUp from "./SignUp";

import MyTickets from "./MyTickets";
function App() {
  return (
   <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/paymentsucess" element={<PaymentSucess/>}/>
      <Route path="/details" element={<Details/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/events" element={<Event/>}/>
      <Route path="/verify" element={<OtpBox/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/myTickets" element={<MyTickets/>}/>
    </Routes>
   </Router>
  );
}

export default App;
