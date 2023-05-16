const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

// const secret = "otpless-test-secret-key";


  const payload = {
    waId: "248ef842ce174bca8eed1ed7129357d6",
  };
  const headers = {
    clientId: "02fz9i8d",
    clientSecret: "cjzgfh73hsqxgnt8",
    "Content-Type": "application/json",
  };
async function run(){

//   axios
//   .post("https://vgthr.authlink.me", payload, { headers: headers })
//   .then(async (response) => {
// console.log(response.data);
//   })
  const {data}=await axios.post("https://v-gther-server-1.vercel.app/api/paymentverificationadmin",{
    isLogedin: {
      token: "248ef842ce174bca8eed1ed7129357d6",
      timestamp: "2023-05-17 02:51:15",
      timezone: "+05:30",
      mobile: {
        name: "iamkunal9",
        number: "919413465367"
      },
      email: {
        name: "kunal sharma",
        email: "ks4428560@gmail.com"
      },
      waNumber: "919413465367",
      waName: "iamkunal9"
    },
    razorpay_order_id: "order_LqTuVUnugK7JQ8",
    referer: "NA",
    amount: 350,
    parent_number: "919413465367"
  });
  console.log(data);
  console.log();
}
run();