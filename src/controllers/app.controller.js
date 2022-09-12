const path = require('path');

async function httpServeStaticImages(req, res) {
    res.sendFile(path.join(__dirname, '..', 'assets', 'images', req.params.filename));
}

module.exports = {
    httpServeStaticImages
  }