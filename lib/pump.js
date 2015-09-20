
var Gpio = require('onoff').Gpio;
var exitHook = require('exit-hook');
var _ = require('lodash');

// light is 5
var pumps = [21, 20, 16, 26, 19, 13, 6].map(function(ch) {
  return new Gpio(ch, 'out');
});

exitHook(function() {
  pumps.forEach(function(pump) {
    pump.unexport();
  })
})

module.exports = function(opt, callb) {
  var max = 0;
  _.each(opt, function(millis, id) {
    var pump = pumps[id];
    if(pump && millis > 0) {
      pump.writeSync(1);
      max = Math.max(max, millis);
      setTimeout(function() {
        pump.writeSync(0);
      }, millis);
    }
  })
  if(callb && max > 0) {
    setTimeout(callb, max);
  }
}
