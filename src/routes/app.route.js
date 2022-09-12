const express =  require('express');
const route =  express.Router();

const { 
    httpServeStaticImages
  } = require('../controllers/app.controller');

route.get('/static/images/:filename', httpServeStaticImages);

module.exports = route;