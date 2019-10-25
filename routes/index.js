var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");
var multer = require("multer");
var bodyParser = require("body-parser")

router.get('/', ctrlMain.get_authentication);
router.get('/authentication',ctrlMain.get_authentication);
router.post('/authentication',ctrlMain.post_authentication);
router.get('/movielist',modelMain.get_movielist);
router.get('/newmovie',ctrlMain.get_Newmovie);
router.post('/addmovie',modelMain.post_Addmovie);
router.get('/displaymovie/:moviename',modelMain.get_displaymovie);
router.get('/deletemovie/:moviename',ctrlMain.get_deletemovie);
router.post('/deletemovie/:moviename',modelMain.post_deletemovie);

module.exports=router;
