
var lame = require('lame');
var Speaker = require('speaker');
var fs = require('fs');


module.exports = {

  sound(path) {
    fs.createReadStream(path)
    .pipe(new lame.Decoder())
    .on('format', function (format) {
      this.pipe(new Speaker(format));
    });
  }

}
