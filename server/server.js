const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();


app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server side!' })
});



app.listen(PORT, () => {
  console.log(`Server listneing on ${PORT}`);
});

