
var byline = require('byline');
var hexRgb = require('hex-rgb');

// var rl = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// rl.on('line', lineHandler);

byline.createStream(process.stdin)
  .on('data', function(buf) {
    var line = buf.toString();
    lineHandler(line);
  })

function lineHandler(line) {
  var cmd = /([^:]*)(?::(.*))?/.exec(line);
  if(!cmd) {
    console.log('Unknown command', line);
    return;
  }
  var handler = handlers[cmd[1]];
  if(!handler) {
    console.log('Unknown instruction', cmd[1], cmd[2]);
    return;
  }
  try {
    handler(cmd[2]);
  }
  catch(e) {
    console.log('Error:',e);
  }

}

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
