var Hashids = require('hashids');
var AlbumFactory = require(config.serverDir + '/model/album/AlbumFactory');

module.exports = function(req, res) {

	var albumFactory = new AlbumFactory(req.db);
	albumFactory.create(req.param('title'))
	.then(function(album) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(album));
	}).catch(function(err) {
		log.error(err);
		res.end();
	});

}
