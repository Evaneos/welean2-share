var AlbumFactory = require(config.serverDir + '/model/album/AlbumFactory');

module.exports = function(req, res) {

    if ( typeof req.param('id') == 'undefined' ) {

    } else {

        var albumFactory = new AlbumFactory(req.db);
        albumFactory.get(req.param('id')).then(function(album) {
            if (album.title != req.param('title')) {
                res.send(404, 'Album not found!');
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(album));
        }).catch(function(){
            log.warning('Unexisting album ' + req.param('uuid'));
            res.send(404, 'Album not found!');
        });
    }

};
