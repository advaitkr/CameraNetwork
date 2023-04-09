const mongoose = require('mongoose');

const cameraNetworkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    cameras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Camera' }]
  });
  
  module.exports = mongoose.model('CameraNetwork', cameraNetworkSchema);
  