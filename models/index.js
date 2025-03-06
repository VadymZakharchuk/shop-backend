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
db.dbvars = require("./DbVars")(sequelize, Sequelize);

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

db.orders.hasOne(db.product, { foreignKey: 'id', as: "product" });

db.orders.hasOne(db.user, { foreignKey: 'id',  as: "user" });

db.orders.hasOne(db.dbvars, { foreignKey: 'id', as: "status" });

module.exports = db;
