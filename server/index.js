const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const cors = require('cors')

const port = process.env.PORT || 9000;

dotenv.config({ path: "./.env" });

const db = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connection successful!"));
mongoose.Promise = global.Promise;

//using cors middlware
app.use(cors());

//middlwares
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//init routes
app.use("/api", require("./routes/api"));

//error handling middlware
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(422).send({error: err.message});
});

//listen for requests
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
