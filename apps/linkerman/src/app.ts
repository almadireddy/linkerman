import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send('Hello there!');
});

app.post('/addShortlink', (req, res) => {
  res.send('TBD'); 
});

app.listen(PORT, () => {
  console.log(`Linkerman started on port ${PORT}`);
});
