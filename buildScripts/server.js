import express from 'express';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD-B9yL_qkpkcmHC9G6zE2i-odPFNKoEP4'
});

const port = 3000;
const app = express();
const compiler = webpack(config);


const dataController = require('./dataController');

// connect to mongo database
mongoose.connect('mongodb://YanYan123:YanYan789@ds147890.mlab.com:47890/mountainchicken')
.then(() => {
  console.log('did it work? i hope so')
}).catch(err => console.log(err));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});


app.get('/getResults', dataController.getData);
app.post('/addLocation', dataController.googleApiHandler, dataController.postData);

app.listen(port, function (error) {
  if(error) {
      console.log(error);
  } else {
      open(`http://localhost:${port}`)
  }
});