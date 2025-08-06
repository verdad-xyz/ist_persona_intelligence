import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import swaggerUi from "swagger-ui-express";

import db from "./config/Database.js";
import "./models/index.js";

import UserRoute from "./routes/UserRoute.js";
import FraudRoute from "./routes/FraudRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(UserRoute);
app.use(FraudRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT || 5000, () => {
  console.log("Server is running on port", process.env.APP_PORT || 5000);
});
