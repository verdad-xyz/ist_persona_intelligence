import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import FraudRoute from "./routes/FraudRoute.js";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";

dotenv.config();

const app = express();

(async () => {
  await db.sync();
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

app.listen(process.env.APP_PORT || 5000, () => {
  console.log("Server is running on port ", process.env.APP_PORT);
});
