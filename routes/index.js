var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");
var multer = require("multer");
var bodyParser = require("body-parser")

router.get('/', ctrlMain.get_authentication);
router.get('/authentication',ctrlMain.get_authentication);
router.post('/authentication',ctrlMain.post_authentication);

module.exports=router;