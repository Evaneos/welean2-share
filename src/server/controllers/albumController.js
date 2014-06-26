var AlbumFactory = require(config.serverDir + '/model/album/AlbumFactory');

module.exports = function(req, res) {

    var data = {
        'home': false,
        'isnew': true,
        'files' : new Array(),
        'links': {},
        'error': '',
        'IMAGE_PATH': ''
    }

    if ( typeof req.param('uuid') == 'undefined' ) {
        data.home = true;
    } else {

        var albumFactory = new AlbumFactory(req.db);
        albumFactory.get(req.param('uuid')).then(function(album) {
            data.isNew = false;

            if (album && album.files) {
                files = album.files;
                links.download = config.uploadPath + '/' + album._id + '/archive.zip';
                links.new_album = '/';
            } else {
                files = [];
                isNew = true;
                log.info('Probably new album ' + req.param('uuid'));
            }
        }).catch(function(){
            log.warning('Unexisting album ' + req.param('uuid'));

        });
    }

    	res.render('index.ejs', {data:
            {
            }
        });

};
