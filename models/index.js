// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  key: 'id',
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  key: 'id',
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag }) //not sure if I need more than this here.

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag })

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
