const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3020;
const { logErrors, errorHandler, boomErrorHandler } = require('./midlewares/error.handler');
app.use(express.json());
const whitelist = ['https://agleondev.com'];
const options = {
  origin: (origin, callback) =>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true)
    } else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));






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
