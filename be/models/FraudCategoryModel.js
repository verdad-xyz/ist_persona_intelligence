import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const FraudCategory = db.define("fraud_category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default FraudCategory;
