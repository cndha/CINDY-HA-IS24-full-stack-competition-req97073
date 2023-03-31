const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const data = require('./data.json');

app.use(express.json()); // converts all incoming put, patch, post to js objects

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/api', (req, res) => {
  res.json(data);
  res.sendStatus(200);
});

app.get('/api/products', (req, res) => {
  res.json(data.products)
});


app.get('/api/products/:id', (req, res) => {
  const db = data.products;
  const product = db.find((x) => x.productId === parseInt(req.params.id));
  res.json(product);
});


app.patch('/api/products/:id', (req, res) => {  
  const db = data.products;
  const productIndex = db.findIndex((x) => x.productId === parseInt(req.params.id));
  db.splice(productIndex, 1, req.body);
  res.json(req.body);
})


app.post('/api/products', (req, res) => {
  data.products.push(req.body);
  res.json(req.body);
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

