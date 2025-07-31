import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import "./models/index.js";
import db from "./config/Database.js";

import UserRoute from "./routes/UserRoute.js";
import FraudRoute from "./routes/FraudRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

(async () => {
  await db.sync({ alter: true });
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(FraudRoute);
app.use(UserRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT || 5000, () => {
  console.log("Server is running on port ", process.env.APP_PORT);
});
