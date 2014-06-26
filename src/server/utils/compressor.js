var gm = require("gm").subClass({ imageMagick: true });

module.exports = {

    compress : function(origin, destination, width, height){

        return new Promise(function(resolve, reject) {
            // miniature
            gm(origin)
                .autoOrient()
                .resize(width, height)
                .gravity('Center')
                .write(destination, function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    // size
                    resolve(destination);
                }.bind(this))
        });
    }
};

