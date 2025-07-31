import User from "./UserModel.js";
import FraudName from "./FraudNameModel.js";
import FraudCategory from "./FraudCategoryModel.js";

User.hasMany(FraudName, { foreignKey: "userId" });
FraudName.belongsTo(User, { foreignKey: "userId" });

FraudName.belongsToMany(FraudCategory, {
  through: "FraudNameCategory",
  as: "categories",
});

FraudCategory.belongsToMany(FraudName, {
  through: "FraudNameCategory",
  as: "fraudNames",
});

export { User, FraudName, FraudCategory };
