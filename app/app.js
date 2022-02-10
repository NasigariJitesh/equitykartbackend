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


app.use(express.json());
app.use(mongoSanitize());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use('/api/users',userRouter);
app.use('/api/listings', organisationsRouter);
app.use('/api/admin', adminRouter);
app.get("/", (req, res) => {
  res.send("Welcome To Équitykart API");
});
app.use(erroHandler)





app.listen(PORT, (err) => {
  if (err) console.log(`Error in starting main-app server at ${PORT}`);
  console.log(`main-app server started at ${PORT}`);
})

module.exports = app;