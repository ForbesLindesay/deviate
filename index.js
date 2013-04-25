var ert = require('ert').compileFn;

module.exports = deviate;
function deviate(status, path) {
  if (arguments.length === 1) {
    path = status;
    status = undefined;
  }
  if (typeof path === 'number') {
    var temp = status;
    status = path;
    path = temp;
  }
  status = status || 302;
  var fn = typeof path === 'function' ? path : ert(path);
  return function (req, res) {
    if (typeof res.redirect === 'function') {
      res.redirect(status, fn(req));
    } else {
      res.writeHead(status, {
        'Location': fn(req)
      });
      res.end();
    }
  }
}