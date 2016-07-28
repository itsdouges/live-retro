import express from 'express';

const app = express();

app.get('/', (res) => {
  res.send('Hello');
});

app.listen(3000, () => {
  console.log('up');
});
