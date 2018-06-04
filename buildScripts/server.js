import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD-B9yL_qkpkcmHC9G6zE2i-odPFNKoEP4'
});

const port = 3000;
const app = express();
const compiler = webpack(config);

//const Data = require('./dataModel');

const dataController = require('./dataController');

// connect to mongo database
mongoose.connect('mongodb://YanYan123:YanYan789@ds147890.mlab.com:47890/mountainchicken')
.then(() => {
  console.log('did it work? i hope so')
}).catch(err => console.log(err));

///SCHEMA STUFF///
// const Schema = mongoose.Schema;

// const dataSchema = new Schema({
//     name: {type: String, required: true},
//     tags: [{
//         type: String
//     }],
//     googleInfo: [{
//         type: String
//     }],
//   });
///////////////////


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// app.get('/getResults', function(req,res) {
//   console.log('We have reached the getresults route')
//   res.send([
//     {name:'Shaf house', tags:['favorite', 'guys-night'], googleInfo: [' Astoria, NY 10019, USA']}, 
//     {name:'MoMA', tags:['NYC', 'take Parents', 'cultural'], googleInfo: [' 11 W 53rd St, New York, NY 10019, USA']},
//     {name:'Central Park South', tags:['NYC', 'take Parents', 'date night'], googleInfo: [' 160 Central Park S, New York, NY 10019, USA']}
//   ]);

// });

//app.post('/addLocation', function(req, res) {
app.get('/getResults', dataController.getData);
app.post('/addLocation', dataController.googleApiHandler, dataController.postData);
//   console.log('Req-body:' , req.body);
//   console.log('In post data!')
// const DataToSave = {
//     name: req.body.name,
//     tags: req.body.tags,
//     googleInfo: req.body.googleInfo,
//   }
//   console.log('Data To Save: ', DataToSave);
//   Data.create(DataToSave, (err, savedData) => {
//     if (err) return res.end(err);
//     else res.status(200).send(savedData);
//     console.log('Saved Data to DB');
//   });
//   ////////
//   let addedData = {};
//   if(req.body.name) {
//     addedData.name = req.body.name;
//   }
//   if(req.body.tags) {
//     addedData.tags = req.body.tags.slice();
//   }
//   console.log('In server side - addedData: ',addedData);
//   googleMapsClient.geocode({
//     address: req.body.name
//   }, function(err, response) {
//     if (!err) {
//       console.log('In server side - google map result[0].formatted_address: ',response.json.results[0].formatted_address);
//       addedData.googleInfo = [];
//       addedData.googleInfo.push(response.json.results[0].formatted_address);
//       console.log('In server side - after google map api - addedData: ', addedData);
//       res.json(addedData);
//     } else {
//       console.log('Error: ',err);
//       res.json(addedData);
//     }
//   });
// });
//});

// app.post('/addLocation', dataController.postData);
  // res.json(addedData);


app.listen(port, function (error) {
  if(error) {
      console.log(error);
  } else {
      open(`http://localhost:${port}`)
  }
});