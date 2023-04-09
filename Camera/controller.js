const express = require('express');
const router = express.Router();
const Camera = require('./model');
const CameraNetwork = require('../Network/model')
router.post('/', async (req, res) => {
    const camera = new Camera({
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
    });
  
    try {
      const newCamera = await camera.save();
      res.status(201).json(newCamera);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get('/cam',async(req,res)=>{
    const cameras = await Camera.find({})
    if(!cameras) return res.status(404).send('The camera with the given ID was not found.');
    res.send({"msg":cameras})
  })
 
  router.get('/:id', async (req, res) => {
    const camera = await Camera.findById(req.params.id);
    if (!camera) return res.status(404).send('The camera with the given ID was not found.');
    res.send(camera);
  });

  router.put('/:id', async (req, res) => {
    const camera = await Camera.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    }, { new: true });
    if (!camera) return res.status(404).send('The camera with the given ID was not found.');
    res.send(camera);
  }); 


  router.delete('/:id', async (req, res) => {
    const camera = await Camera.findByIdAndRemove(req.params.id);
    if (!camera) return res.status(404).send('The camera with the given ID was not found.');
  
    // Update CameraNetworks
    await CameraNetwork.updateMany({ cameras: camera._id }, { $pull: { cameras: camera._id } });
  
    res.send(camera);
  });
  
  




  module.exports = router;