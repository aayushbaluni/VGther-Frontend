const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

// const secret = "otpless-test-secret-key";


  const payload = {
    waId: "6c896352ad5c4af6b9047edebed16f5e",
  };
  const headers = {
    clientId: "02fz9i8d",
    clientSecret: "cjzgfh73hsqxgnt8",
    "Content-Type": "application/json",
  };

  axios
    .post("https://vgthr.authlink.me", payload, { headers: headers })
    .then((response) => {
      
      console.log(response.data);
    //   res.status(200).json(responseData);
    })
    .catch((err) => console.log(err))