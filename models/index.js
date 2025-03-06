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
db.sizes = require("./Sizes")(sequelize, Sequelize);
db.favourite = require("./Favourites")(sequelize, Sequelize);
db.orders = require("./Orders")(sequelize, Sequelize);
db.db_vars = require("./DbVars")(sequelize, Sequelize);

db.category.hasMany(db.product, { as: "product" })
db.product.belongsTo(db.category, {
    foreignKey: "categoryId",
    as: "category",
});

db.colors.hasMany(db.product, { as: "product" });
db.product.belongsTo(db.colors, {
    foreignKey: "colorId",
    as: "colors",
});

db.product.hasOne(db.favourite);
db.favourite.belongsTo(db.product,{
    foreignKey: "productId",
    as: "product"
});

db.orders.hasMany(db.product, { as: "product" });
db.product.belongsTo(db.orders, {
    foreignKey: "orderId",
    as: "orders",
});

db.orders.hasMany(db.user, { as: "user" });
db.user.belongsTo(db.orders, {
    foreignKey: "userId",
    as: "orders",
});

db.orders.hasMany(db.db_vars, { as: "status" });
db.db_vars.belongsTo(db.orders, {
    foreignKey: "statusId",
    as: "orders",
});
module.exports = db;
