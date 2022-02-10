const express = require('express');
const userRouter = require(`./routes/userRoutes`);
const adminRouter = require(`./routes/adminRoutes`);
const organisationsRouter = require(`./routes/organisationsRoutes`);
const mongoSanitize = require("express-mongo-sanitize");
const erroHandler = require("./controllers/errorController");
const dotenv = require('dotenv').config();


const cors = require("cors");

const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL.replace('<password>', process.env.Password);;
//database connect
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected');
}).catch((err) => {
  console.log(err);
})
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://ekback-dev.ap-south-1.elasticbeanstalk.com",
    "https://equitykart.com/",
    "https://equitykarttest.netlify.app/",
  ],
  optionsSuccessStatus: 200,
  // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(mongoSanitize());

app.use('/api/users',userRouter);
app.use('/api/listings', organisationsRouter);
app.use('/api/admin', adminRouter);

app.use(erroHandler)





app.listen(PORT, (err) => {
  if (err) console.log(`Error in starting main-app server at ${PORT}`);
  console.log(`main-app server started at ${PORT}`);
})

module.exports = app;