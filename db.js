const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('product', {
  name: conn.Sequelize.STRING
});

const User = conn.define('user', {
  name: conn.Sequelize.STRING,
  password: conn.Sequelize.STRING
});

User.belongsTo(Product, { as: 'best' });
User.belongsTo(Product, { as: 'worst' });


const sync = () => conn.sync({ force: true });

const seed = () => {
  const products = ['foo', 'bar', 'bazz'];
  const users = ['moe', 'larry', 'curly'];

  return sync()
    .then(() => {
      const productPromises = products.map(name => Product.create({ name }));
      const userPromises = users.map((name, idx) => User.create({ name, password: products[idx] }));
      return Promise.all(productPromises.concat(userPromises))
        .then(([foo, bar, bazz, moe, larry, curly]) => Promise.all([
          moe.setBest(foo),
          moe.setWorst(bar),
          curly.setBest(bazz),
          larry.setWorst(foo)
        ]));
    });
};

module.exports = {
  models: {
    Product,
    User
  },
  sync,
  seed
};
