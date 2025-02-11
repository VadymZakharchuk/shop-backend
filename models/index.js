const dbConfig = require("../config/mySQL.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({ ...dbConfig })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./Category")(sequelize, Sequelize);
db.product = require("./Product")(sequelize, Sequelize);
db.user = require("./User")(sequelize, Sequelize);
db.colors = require("./Colors")(sequelize, Sequelize);

db.colors.hasMany(db.product, { as: "product" });
db.category.hasMany(db.product, { as: "product" });
db.product.belongsTo(db.category, {
    foreignKey: "categoryId",
    as: "category",
});
db.product.belongsTo(db.colors, {
    foreignKey: "colorId",
    as: "colors",
});

module.exports = db;
