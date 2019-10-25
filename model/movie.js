/*
 * GET user list page.
 */
module.exports.get_movielist = function(req, res) 
{
    var db = req.db;
    var collection = db.get('moviecollection');
    collection.find({}, {}, 
                    function(err, docs)
                    {
                        res.render('movielist', { "movielist" : docs });
                    });
};

/*
 * GET show user page.
 */
module.exports.get_displaymovie = function(req, res) 
{
    var mname = req.params.moviename;
    var db = req.db;
    var collection = db.get('moviecollection');
    
    collection.find( { moviename : mname }, 
                     function(err, doc) 
                     {
                         if (err) {
                             res.send("Find failed.");
                         }
                         else {
                             res.render('movieList', 
                                        { title: 'Show Moviename: ' + mname,
                                          //mail: doc[0].email 
                                        })
                         }
                     });
};

/*
 * POST add movie page.
 */
module.exports.post_addmovie = function(req, res) 
{
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes.
    var movieName = req.body.moviename;
    var movieGenre = req.body.moviegenre;
    var movieRating = req.body. movierating;

    // Set our collection.
    var collection = db.get('moviecollection');

    // Submit to the database.
    collection.insert( { "moviename" : movieName,
                         "moviegenre" : movieGenre,
                        "movierating" = movieRating },
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Insert failed.");
                           }
                           else {
                               // Forward to success page
                               res.redirect("movielist");
                           }
                       });
};

/*
 * POST delete user page.
 */
module.exports.post_deletemovie = function(req, res) 
{
    var mname = req.params.moviename;
    var db = req.db;
    var collection = db.get('moviecollection');

    // Submit to the database.
    collection.remove( { "moviename" : mname },
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Delete failed.");
                           }
                           else {
                               res.send("Successfully deleted " + mname);
                           }
                       });
};