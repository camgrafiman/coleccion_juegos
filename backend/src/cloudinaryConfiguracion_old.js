const { config, uploader } = require('cloudinary');


const cloudinaryConfig = () => config({
  cloud_name: 'cloudcamgraf',
  api_key: '997535939772535',
  api_secret: 'vckDGuIfbjezxQN2T-YEIg5dGCc'
});

module.exports = { cloudinaryConfig, uploader };

// module.exports = cloudinaryConfiguracion;