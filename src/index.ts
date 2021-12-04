import app from './app';
import config from './app/config';
import connect from './app/db';
import { panic } from './helpers/error';

const port = config('PORT');

connect();

app
  .listen(port, () => {
    console.log(`Server listens on http://127.0.0.1:${port}`);
  })
  .on('error', (err: string) => {
    panic(err);
  });
