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
var server = new Hapi.Server(process.env.PORT|| 4000, serverOpts);

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
    "method" :  'POST',
    "path"   :  '/post',
    "handler":  handlers.postHandler
});

if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}
module.exports = server;
