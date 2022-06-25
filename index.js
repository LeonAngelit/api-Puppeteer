const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3020;
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./midlewares/error.handler');


app.use(express.json());

//Para el ejemplo he dejado la api abierta desde cualquier dirección mediante CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port' + port);
});
