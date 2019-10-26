var mongo=require('mongodb');
var monk=require('monk');

// var db=monk('localhost:27017/movies');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
const mongoose = require('mongoose');
var app = express();
var Movie =  require("./model/movie")
        
//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(session({
    secret: "String for encrypting cookies.",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
}));
app.use('/', index);
// app.use(express.static(path.join(__dirname, 'stylesheets')));
app.use("/static", express.static('./static/'));
module.exports = app;

mongoose.connect('mongodb://localhost/moviedb', {useNewUrlParser: true});
let db = mongoose.connection;


db.once('open',function(){
    console.log('connected to db');  
})
db.on('error',function(err){
    console.log(err);
    
})

app.get('/', function(req, res) {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send(req.seesion.page_views);
        console.log('Cookies:', req.cookie);
    } else {
        req.session.page_views = 1;
        // res.send("first time!");
    }
});

// app.get('/movies',function(req,res){
//     Movie.find({},function(err,movies){
//         if(err){
//             console.log('err');
            
//         } else{
//             console.log("from the /movies",movies);
            
//             res.render('movies',{
//                 title:'Movies',
//                 movies:movies
//             })
//         }
//     }) 
// })
// app.get('/addmovies',function(req,res){
//     res.render('addmovies',{
//     title:'Add Movies'
//         }
//     ) 
// })
// app.get('/editmovie/:id',function(req,res){
//     Movie.findById(req.params.id,function(err,movies){
//         if(err){
//             console.log('err');
            
//         } else{
//             console.log("from the /movies",movies);
            
//             res.render('editmovies',{
//                 title:'Edit Movies',
//                 movies:movies
//             })
//         }
//     }) 
// })
// app.post('/editmovie/:id',function(req,res){
//     let movies={}
//     movies.moviename = req.body.moviename
//     movies.Genre = req.body.genre
//     movies.Rating = req.body.rating
//     console.log('submitted')
//     let query={_id:req.params.id}
//     Movie.update(query,movies,function(err){
//         if(err){
//             console.log(err);
            
//         } else{
//             res.redirect('/movies')
//         }
//     })
// })
// app.post('/addmovies',function(req,res){
//     let movies = new Movie()
//     movies.moviename = req.body.moviename
//     movies.Genre = req.body.genre
//     movies.Rating = req.body.rating
//     console.log('submitted')
//     movies.save(function(err){
//         if(err){
//             console.log(err);
            
//         } else{
//             res.redirect('/movies')
//         }
//     })
// })
// app.delete('/deletemovie/:id',function(req,res){
//     let query ={_id:req.params.id}
//     Movie.remove(query,function(err){
//         if(err){
//             console.log(err);
            
//         }
//         res.send('Success')
//     })
// })

app.listen(3000);