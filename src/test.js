const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

// const secret = "otpless-test-secret-key";


  const payload = {
    waId: "9cbd4196579846dab359d3fc7dc108a5",
  };
  const headers = {
    clientId: "02fz9i8d",
    clientSecret: "cjzgfh73hsqxgnt8",
    "Content-Type": "application/json",
  };
async function run(){
var isLogedin = {token:"9cbd4196579846dab359d3fc7dc108a5",mobile:{number:"919413465367"}}

  const {data}=await axios.post("https://v-gther-server-1.vercel.app/api/paymentverificationadmin",{isLogedin,razorpay_order_id:"order_Lo1aON26TvRuMt",referer:"Kunal",amount:123,parent_number:"919413465367"});
  console.log(data);
  console.log({isLogedin,razorpay_order_id:"order_Lo1aON26TvRuMt",referer:"Kunal",amount:123});
}
run();