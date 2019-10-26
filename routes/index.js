var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");
var multer = require("multer");
var bodyParser = require("body-parser")

router.get('/', ctrlMain.get_authentication);
router.get('/authentication',ctrlMain.get_authentication);
router.post('/authentication',ctrlMain.post_authentication);

router.get('/movies',ctrlMain.display_movies);
router.post('/addmovies',ctrlMain.add_movies);
router.get('/addmovies',ctrlMain.getadd_movies);
router.post('/editmovie/:id',ctrlMain.edit_movies);
router.get('/editmovie/:id',ctrlMain.getedit_movies);
router.delete('/deletemovie/:id',ctrlMain.delete_movies);

module.exports=router;