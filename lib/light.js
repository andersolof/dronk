
var pb = require('pi-blaster.js');
var exitHook = require('exit-hook');

exitHook(function() {
  pb.setPwm(17,0);
  pb.setPwm(22,0);
  pb.setPwm(27,0);
})

module.exports = function(r,g,b) {
    pb.setPwm(17,r);
    pb.setPwm(22,g);
    pb.setPwm(27,b);
}
