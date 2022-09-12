const path = require('path');

async function httpServeStaticImages(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'assets', 'images', req.params.filename));
}

module.exports = {
    httpServeStaticImages
  }