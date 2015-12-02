
var Gpio = require('onoff').Gpio;
var pb = require('pi-blaster.js');
var exitHook = require('exit-hook');

// light is 5
var pumps = [21, 20, 16, 26, 19, 13, 6, 5].map(function(ch) {
  return new Gpio(ch, 'out');
});

exitHook(function() {
  pb.setPwm(17,0);
  pb.setPwm(22,0);
  pb.setPwm(27,0);
  pumps.forEach(function(pump) {
    pump.writeSync(0);
    pump.unexport();
  })
})

module.exports = {

  light(r,g,b) {
    pb.setPwm(17,r);
    pb.setPwm(22,g);
    pb.setPwm(27,b);
  },

  pump(i, on) {
    let p = pumps[i];
    p && p.writeSync(on ? 1 : 0);
  }
}
