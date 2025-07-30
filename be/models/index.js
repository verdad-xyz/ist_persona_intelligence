import User from "./User.js";
import FraudName from "./FraudNameModel.js";
import FraudCategory from "./FraudCategoryModel.js";

User.hasMany(FraudName);
FraudName.belongsTo(User);

FraudName.belongsToMany(FraudCategory, { through: "FraudNameCategory" });
FraudCategory.belongsToMany(FraudName, { through: "FraudNameCategory" });

export { User, FraudName, FraudCategory };
