
var byline = require('byline');
var hexRgb = require('hex-rgb');

var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// var stream = byline.createStream(process.stdin);
//
// stream.on('data', function(buf) {
//   var line = buf.toString();
//   lineHandler(line);
// })

rl.on('line', lineHandler);
//rl.prompt();

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
    console.err(e);
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
  'QR-Code': function(code) {
    lineHandler(code);
  }
}
