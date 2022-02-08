const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

const server = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
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


server.listen(PORT, (err) => {
  if (err) console.log(`Error in starting main-app server at ${PORT}`);
  console.log(`main-app server started at ${PORT}`);
})