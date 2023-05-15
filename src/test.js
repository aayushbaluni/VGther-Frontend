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

  const {data}=await axios.post("https://v-gther-server-1.vercel.app/api/getall",isLogedin);
  console.log(data);
}
run();