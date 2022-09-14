const express =  require('express');
const route =  express.Router();

const { 
    httpServeStaticImages,
    httpServeStaticVideos
  } = require('../controllers/app.controller');

route.get('/static/images/:filename', httpServeStaticImages);
route.get('/static/videos/:filename', httpServeStaticVideos); 

module.exports = route;