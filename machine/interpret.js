
let through = require('through2');
let combine = require('stream-combiner2');
var byline = require('byline');


function fixResult(res) {
  if(typeof res !== 'object' || res === null)
    return [];
  if(Array.isArray(res))
    return res.reduce((ar, res) => {
      ar.push(...fixResult(res));
      return ar;
    }, []);
  return Object.keys(res).map(name => ({name, args:res[name]}));
}

function program(handlers) {
  let loop = through.obj(function(cmd, enc, cb) {
    let queue = [cmd];
    while(queue.length) {
      cmd = queue.pop();
      let handler = handlers[cmd.name];
      if(!handler) {
        this.push(cmd);
      } else {
        let res = handler.apply({
          push(res) {
            fixResult(res).forEach(cmd => { loop.write(cmd); })
          }
        }, cmd.args);
        //console.error('queue', res);
        queue.push(...fixResult(res).reverse());
      }
    }
    cb();
  });
  return loop;
}

function parse(line) {
  //console.error('#'+line+'#');
  let match = /^([^:]+)(?::(.*))?$/.exec(line);
  if(!match)
    throw new Error('Bad command', line);
  return { name: match[1].toLowerCase(), args:JSON.parse('['+(match[2]||'')+']') };
}

function stringify(cmd) {
  //console.error(cmd);
  return cmd.name + ':' + cmd.args.map(v => JSON.stringify(v)).join(',');
}

module.exports = function(...handlers) {
  return combine(
    byline.createStream(),
    through.obj(function(line, enc, cb) {
      cb(null, parse(line));
    }),
    ...handlers.map(program),
    through.obj(function(cmd, enc, cb) {
      cb(null, stringify(cmd)+'\n');
    })
  );
}
