var exports = module.exports = {};



//to static files to server returns eg. CSS
exports.loadEntry = {
    directory: {
        path: 'public',
        listing: true
    }
}

//To serve the form page
exports.formHandler = function (req, res){
	res.file('./writecomment.html');
}

//To create a post
exports.postHandler = function(request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
       var collection = db.collection('comments');
    collection.find().toArray(function(err, result) {
        var newEntry = {
        user: request.payload.user,
        title: request.payload.title,
        message: request.payload.message,
        id: result.length
        };
    db.collection('comments').insert(newEntry, function(err, data){
        if (err) console.log('Problem with posting a new entry');
            reply("You did it man! You submitted a post!");
    }
    );

    });    
}

//To see all the blog posts
exports.usersHandler = function (request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('comments').find().toArray(function(err, result) {
	if (err) return reply(Hapi.error.internal('Internal MongoDB error', err));
	reply.view('list', {'message': result});
    });
}
