import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const FraudName = db.define("fraud_name", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default FraudName;
