
const PUMP_CL_PER_MIN = [6,7,8,7.5,7,7,7];

module.exports = {
  // qr-code:[1,1,1,1,1,1,1],10
  'qr-code': function(recepie,size) {
    return {
      'mix-drink': [recepie, size],
      'sound': ['test.mp3']
    }
  },

  'mix-drink': (recepie, size = 12) => {
    let sum = recepie.reduce((s,x) => s+x);
    return recepie.map((x,i) => ({pour:[i, x/sum*size]}))
  },

  'pour': (pump, cl) => {
    let t = cl/PUMP_CL_PER_MIN[pump]*60000;
    return [
      {pump:[pump, true]},
      {queue:[t, {pump:[pump, false]}]},
    ];
  },

  queue(t, cmd) {
    setTimeout(()=>{ this.push(cmd); }, t);
  }
}
