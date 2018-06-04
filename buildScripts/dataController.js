const Data = require('./DataModel');

const getData = (req, res) => {
    Data.find({}, (err, foundData) => {
        if(err) {
            return res.end(err);
        } else {
            res.send(foundData);
        }
    });
  };

const postData = (req, res) => {
    console.log('Req-body:' , req.body);
    console.log('In post data!')
    const DataToSave = {
      name: req.body.name,
      tags: req.body.tags,
      googleInfo: req.body.googleInfo,
    }
     console.log('Data To Save: ', DataToSave);
    Data.create(DataToSave, (err, savedData) => {
        console.log('In Data.create');
      if (err){
        console.log('err',err); 
        return res.end(err);
      } 
      else res.status(200).send(savedData);
      console.log('Saving to DB')
    });
  }

  module.exports = {getData, postData};