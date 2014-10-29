var Hapi = require("hapi");
var handlers = require("./handlers.js");
var Config = require("./config.js");

// turn debugging on
var serverOpts = {
    debug: {
	request: ['error']
    }
};

//config
var dbOpts = {
    url: Config.db,
    settings: {
        db: {
            native_parser: false
        }
    }
};

// include the serverOpts
var server = new Hapi.Server(process.env.PORT|| 8080, serverOpts);

server.views({
    engines: { jade: require('jade') },
    path: './jade'
});

server.pack.register([
  {
    plugin: require( 'hapi-mongodb'),
    options: dbOpts
  }],
 function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

server.route({
    method: 'GET',
    path: '/create',
    handler: handlers.formHandler
});

server.route({
    "method" :  'POST',
    "path"   :  '/post',
    "handler":  handlers.postHandler
});

server.route( {
   method  : "GET",
   path    : "/index",
   handler : handlers.usersHandler
});

//For CSS etc.
server.route( {
  method : "GET",
  path :  "/{param*}",
  handler :   handlers.loadEntry
});

if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}
module.exports = server;
