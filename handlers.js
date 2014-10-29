var exports = module.exports = {};


//To create a post
exports.postHandler = function(request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
       var collection = db.collection('comments');
    collection.find().toArray(function(err, result) {
        var newEntry = {
        user: request.payload.user,
        title: request.payload.message,
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
