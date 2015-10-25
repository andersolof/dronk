
require('babel/register');

var interpret = require('./interpret.js')

process.stdin
.pipe(interpret(require('./program.js'), require('./lib/sound.js'), require('./lib/gpio.js')))
.pipe(process.stdout);
/*
var handlers = {
  'exit': function() {
    process.exit(0);
  },
  'pump': function(opt) {
    var ob = {};
    opt.split(',').forEach(function(keyvalue) {
      var parts = keyvalue.split(':');
      ob[parts[0]] = parts[1];
    })
    require('./lib/pump')(ob);
  },
  'light': function(opt) {
    require('./lib/light').apply(null, hexRgb(opt).map(function(b) { return b/255 }));
  },
  'sound': function(opt) {
    require('./lib/sound')(opt);
  },
  'QR-Code': function(code) {
    lineHandler(code);
  }
}
*/
