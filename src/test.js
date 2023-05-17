const { default: axios } = require("axios");
// const jwt = require("jsonwebtoken");

// // const secret = "otpless-test-secret-key";


//   const payload = {
//     waId: "248ef842ce174bca8eed1ed7129357d6",
//   };
//   const headers = {
//     clientId: "02fz9i8d",
//     clientSecret: "cjzgfh73hsqxgnt8",
//     "Content-Type": "application/json",
//   };
// async function run(){

// //   axios
// //   .post("https://vgthr.authlink.me", payload, { headers: headers })
// //   .then(async (response) => {
// // console.log(response.data);
// //   })
//   const {data}=await axios.post("https://v-gther-server-1.vercel.app/api/paymentverificationadmin",{
//     isLogedin: {
//       token: "248ef842ce174bca8eed1ed7129357d6",
//       timestamp: "2023-05-17 02:51:15",
//       timezone: "+05:30",
//       mobile: {
//         name: "iamkunal9",
//         number: "919413465367"
//       },
//       email: {
//         name: "kunal sharma",
//         email: "ks4428560@gmail.com"
//       },
//       waNumber: "919413465367",
//       waName: "iamkunal9"
//     },
//     razorpay_order_id: "order_LqTuVUnugK7JQ8",
//     referer: "NA",
//     amount: 350,
//     parent_number: "919413465367"
//   });
//   console.log(data);
//   console.log();
// }
// run();
// import axios from 'axios';

// async function run(){
// const response = await axios.post(
//   'https://api.razorpay.com/v1/payment_links/',
//   // '{\n  "upi_link": "true",\n  "amount": 1000,\n  "currency": "INR",\n  "accept_partial": false,\n  "first_min_partial_amount": 100,\n  "expire_by": 1691097057,\n  "reference_id": "TS1989",\n  "description": "Payment for policy no #23456",\n  "customer": {\n    "name": "Gaurav Kumar",\n    "contact": "+919000090000",\n    "email": "gaurav.kumar@example.com"\n  },\n  "notify": {\n    "sms": true,\n    "email": true\n  },\n  "reminder_enable": true,\n  "notes": {\n    "policy_name": "Jeevan Bima"\n  },\n  "callback_url": "https://example-callback-url.com/",\n  "callback_method": "get"\n}',
//   {
//     'upi_link': 'true',
//     'amount': 100,
//     'currency': 'INR',
//     'accept_partial': false,
//     'expire_by': 1691097057,
//     'reference_id': 'TS1991',
//     'description': 'Payment for policy no #23456',
//     'customer': {
//       'name': 'Kunal Sharma',
//       'contact': '+919413465367',
//       'email': 'kunalsharma0553@gmail.com'
//     },
//     'notify': {
//       'sms': true,
//       'email': true
//     },
//     'reminder_enable': true,
//     'notes': {
//       'policy_name': 'Jeevan Bima'
//     },
//     'callback_url': 'https://v-gther-server-1.vercel.app/api/paymentverification?parent_number=919413465367&referer=NA',
//     'callback_method': 'get'
//   },
//   {
//     headers: {
//       'Content-type': 'application/json'
//     },
//     auth: {
//       username: 'rzp_live_gjrprcZ5HLXBO7',
//       password: 'R6JFBwIT2SgA6CIkw2WvdDYA'
//     }
//   }
// );
// console.log(response.data)
// }
// run()
// const Razorpay = require('razorpay');


// var instance = new Razorpay({ key_id: 'rzp_live_gjrprcZ5HLXBO7', key_secret: 'R6JFBwIT2SgA6CIkw2WvdDYA'})

// instance.paymentLink.fetch("plink_LqdKfxSHifqutu").then((response)=>{
//   console.log(response)
// })
// var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

// import axios from 'axios';
const moment = require('moment-timezone');

const indianTimezone = 'Asia/Kolkata';
const currentTime = moment().tz(indianTimezone).valueOf();

console.log(currentTime);
axios.get('https://payments-tesseract.bharatpe.in/api/v1/merchant/transactions', {
  params: {
    'module': 'PAYMENT_QR',
    'merchantId': '41134598',
    'sDate': '1684261800000',
    'eDate': currentTime.toString()
  },
  headers: {
    'authority': 'payments-tesseract.bharatpe.in',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'en-GB,en;q=0.8',
    'origin': 'https://enterprise.bharatpe.in',
    'referer': 'https://enterprise.bharatpe.in/',
    'sec-ch-ua': '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'sec-gpc': '1',
    'token': 'aa177567d8e44c448e2b7d81c0b2faa5',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
  }
}).then((response)=>{
  console.log(response.data.data.transactions)
})