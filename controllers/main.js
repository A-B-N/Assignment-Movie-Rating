var lineReader = require("line-reader");
var mongo=require('mongodb');
const mongoose = require('mongoose');
var registeredUsers = [];

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Movie =  require("../model/movie")
function sendPage(fileName, res) {
    var html = '';

    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        /**
         * Append each line to string html.
         * Send the contents of html to the client
         * after the last line has been read.
         * @param line the line read from the file.
         * @param last set to true after the last line.
         */
        function(line, last) {
            html += line + '\n';

            if (last) {
                res.send(html);
                return false;
            } else {
                return true;
            }
        });
}
module.exports.index = function(req, res, next)  {  
    res.render('index', { title: 'Authentication Demo' });  
    console.log('Cookies: ', req.cookies);
};
module.exports.get_authentication = function(req, res) {
    res.render('authentication');
};

module.exports.post_authentication = function(req, res) {
    sendPage('sample.html',res);
};
module.exports.get_authentication = function(req, res) {
    res.render('authentication');
};

module.exports.display_movies = function(req, res) {
    Movie.find({},function(err,movies){
        if(err){
            console.log('err');
            
        } else{
            console.log("from the /movies",movies);
            
            res.render('movies',{
                title:'Movies',
                movies:movies
            })
        }
    }) 
};
module.exports.getadd_movies=function(req,res){
    res.render('addmovies',{
        title:'Add Movies'
            }
        ) 

}
module.exports.getedit_movies=function(req,res){
    Movie.findById(req.params.id,function(err,movies){
        if(err){
            console.log('err');
            
        } else{
            console.log("from the /movies",movies);
            
            res.render('editmovies',{
                title:'Edit Movies',
                movies:movies
            })
        }
    }) 
    

}
module.exports.edit_movies=function(req,res){
    let movies={}
    movies.moviename = req.body.moviename
    movies.Genre = req.body.genre
    movies.Rating = req.body.rating
    console.log('submitted')
    let query={_id:req.params.id}
    Movie.update(query,movies,function(err){
        if(err){
            console.log(err);
            
        } else{
            res.redirect('/movies')
        }
    })
    

}

module.exports.add_movies=function(req,res){
    let movies = new Movie()
    movies.moviename = req.body.moviename
    movies.Genre = req.body.genre
    movies.Rating = req.body.rating
    console.log('submitted')
    movies.save(function(err){
        if(err){
            console.log(err);
            
        } else{
            res.redirect('/movies')
        }
    })
    

}
module.exports.delete_movies=function(req,res){
    let query ={_id:req.params.id}
    Movie.remove(query,function(err){
        if(err){
            console.log(err);
        }
        res.send('Success')
    })

}

