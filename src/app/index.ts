import * as express from 'express';
import api from '../router/api';
import error from '../middlewares/error';

const app = express();

app.use(express.json());
app.use(api());
app.use(error());

export default app;
