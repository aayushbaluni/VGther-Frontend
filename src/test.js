const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

// const secret = "otpless-test-secret-key";


  const payload = {
    waId: "999eb4e12a1840c1b06c8ea42d161b6d",
  };
  const headers = {
    clientId: "02fz9i8d",
    clientSecret: "cjzgfh73hsqxgnt8",
    "Content-Type": "application/json",
  };
async function run(){
var isLogedin = {token:"999eb4e12a1840c1b06c8ea42d161b6d",mobile:{number:"919413465367"}}

  // const {data}=await axios.post("https://v-gther-server-1.vercel.app/api/getall",isLogedin);
  // console.log(data);
  const axios = require('axios');

// Replace 'http://localhost:3000' with your actual server URL
const serverUrl = 'https://v-gther-server-1.vercel.app/user/coupon';
const couponCode = 'SUMMER25'; // Replace with your desired coupon code

axios.post(`${serverUrl}`, { code: couponCode })
  .then((response) => {
    console.log('Discount Amount:', response.data.discountAmount);
  })
  .catch((error) => {
    console.error('Error:', error.response.data.message);
  });

}
run();