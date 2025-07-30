import { Sequelize } from "sequelize";

const db = new Sequelize("ist_persona_intelligence", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
