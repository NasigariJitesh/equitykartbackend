// const express = require("express");
// const mongoSanitize = require("express-mongo-sanitize");

// const cors = require("cors");
// const app = express();
// const PORT = process.env.PORT || 8000;
// const mongodb = require("./src/config/mongoose");
// const passport = require("passport");
// const passportJWT = require("./src/config/passport");

// app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(mongoSanitize());

// app.use("/", require("./src/routes"));

// app.listen(PORT, (err) => {
//   if (err) console.log(`Error in starting main-app server at ${PORT}`);
//   console.log(`main-app server started at ${PORT}`);
// });
