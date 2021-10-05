const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const controller = require("./controllers/controller");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful."))
  .catch((err) => {
    console.log("Error connecting to mongo", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "pug");

routes(app, bodyParser, controller);
