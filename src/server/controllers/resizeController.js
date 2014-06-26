var compressor = require(config.serverDir + '/utils/compressor.js');
var fs = require('fs');

module.exports = function(req, res) {
    var albumId = req.param('auid');
    var imageId = req.param('uid');
    var params = req.param('params');

    var original_img = config.uploadDir + '/' + albumId + '/' + config.originFolderName + '/' + imageId + '.jpg';
    var destination_img = config.uploadDir + '/' + albumId + '/' + config.miniatureFolderName + '/' + imageId + '--' + params + '.jpg';

    compressor.compress(original_img, destination_img, 500, 200).then(function(image_path){
        log.info('resized image ' + image_path);
        var img = fs.readFileSync(image_path);
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
    }).catch(function(err){
        console.log(err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(res.__('Un problème technique est survenu'));
    });
}
