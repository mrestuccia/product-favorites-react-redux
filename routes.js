const app = require('express').Router();
const models = require('./db').models;
const jwt = require('jwt-simple');
const secret = process.env.SECRET || 'foo';

module.exports = app;


// Products
app.get('/products', (req, res, next) => {
  models.Product.findAll({ order: 'name' })
    .then(products => res.send(products))
    .catch(next);
});


app.delete('/products/:id', (req, res, next) => {
  models.Product.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.post('/products', (req, res, next) => {
  models.Product.create({ name: req.body.name })
    .then((product) => res.status(200).send(product))
    .catch(next);
});


// User
app.get('/users', (req, res, next) => {
  models.User.findAll({
    order: 'name',
    include: [
      { model: models.Product, as: 'best' },
      { model: models.Product, as: 'worst' },
    ]
  })
    .then(users => res.send(users))
    .catch(next);
});

// User
app.put('/users/:id', (req, res, next) => {
  console.log('put for user ', req.params.id);
  models.User.findById(req.params.id)
    .then(user => {
      if (user) {
        console.log('updating best from product', req.body);
        user.bestId = req.body.id;
        return user.save();
      } else {
        return null;
      }
    })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
});


// Session
app.post('/session', (req, res, next) => {
  models.User.findOne({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        const token = jwt.encode({ id: user.id }, secret);
        return res.send({ token });
      }
      return res.sendStatus(401);
    })
    .catch(next);
});


app.get('/session/:token', (req, res, next) => {
  try {
    console.log(secret);
    const token = jwt.decode(req.params.token, secret)
    models.User.findById(token.id)
      .then(user => {
        if (!user) {
          return res.sendStatus(401);
        }
        res.send(user);
      })
  }
  catch (e) {
    res.sendStatus(500);
  }
});