const path = require('path');

async function httpServeStaticImages(req, res) {
    console.log(path.join(__dirname, '..', 'assets', 'images', req.params.filename))
    console.log(path.resolve(path.resolve(__dirname, '..', 'assets', 'images', req.params.filename)))
    res.sendFile(path.join(__dirname, '..', 'assets', 'images', req.params.filename));
}

module.exports = {
    httpServeStaticImages
  }