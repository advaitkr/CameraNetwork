const express = require('express');
const router = express.Router();
const CameraNetwork = require('./model');
const Camera = require('../Camera/model')

router.post('/', async (req, res) => {
    const {name,description,cameras} = req.body
       for(let index in cameras){
             let camera_data = await Camera.findOne({_id:cameras[index]})
             if(!camera_data) res.send({"msg":"Data input not valid"})
             cameras[index] = camera_data
       }
       const network = new CameraNetwork({
        name: req.body.name,
        description: req.body.description,
        cameras: cameras.map(camera => camera._id)
      });
      await network.save();
      res.send(network);
});

router.get('/networks', async (req, res) => {
    const network = await CameraNetwork.find({})
    if (!network) return res.status(404).send('The camera network with the given ID was not found.');
    res.send(network);
  });

  router.put('/:id', async (req, res) => {
    //const {id} = req.body
    const CameraNetwork = await CameraNetwork.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
      }, { new: true });
      if (!CameraNetwork) return res.status(404).send('The camera with the given ID was not found.');
      res.send(CameraNetwork);
})

router.delete('/:id', async (req, res) => {
    const network = await CameraNetwork.findByIdAndRemove(req.params.id);
    if (!network) return res.status(404).send('The camera network with the given ID was not found.');
    res.send(network);
  });


 module.exports = router;