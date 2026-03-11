const express = require("express");
const connectDB = require('./db');
require("dotenv").config();
const app = express();
connectDB();
const signup = require("./routes/signup");
const login = require("./routes/login");
const dashboardRoute = require("./routes/dashboard");
app.use(express.json());


app.use("/api", signup);
app.use("/api", login);
app.use("/api", dashboardRoute);

app.get("/", (req, res) => {
  res.send("Testing Express Server");
});


app.listen(process.env.PORT, () => {
  console.log("Server running at http://localhost:" + process.env.PORT);
});
