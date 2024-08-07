import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';

const client = new Client();

(async () => {
  try {
    await client.connect();
    console.log('Connected to postgres :)');
  } catch (e) {
    console.log(e);
  }
})();

dotenv.config();

const app = express();
const { PORT } = process.env;

app.get('/', async (req, res) => {
  try {
    const result = await client.query('select 1 as helloworld'); 
    res.send(`Hello there! ${result.rowCount ?? 'was null'}`);
  } catch (e) {
    res.send(`Hello there! ${e}`);
  }
});

app.get('/health', (req, res) => {
  res.status(200);
  res.send('OK');
});

app.post('/addShortlink', (req, res) => {
  res.send('TBD'); 
});

app.listen(PORT, () => {
  console.log(`Linkerman started on port ${PORT}`);
});
