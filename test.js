
var deviate = require('./');

var assert = require('assert');
var hyperquest = require('hyperquest');
var express = require('express');
var app = express();

app.get('/fn/:param', deviate(function (req) { return '/fn-res/' + req.params.param; }));

app.get('/page/:no/next', deviate('/page/[Number:no + 1]'));
app.get('/page/:no/prev', deviate('/page/[Number:no - 1]'));

app.get('/:number', deviate(301, '/post/:number'));

app.listen(3000);

function test(path, pattern, description, status, location) {
  describe('deviate(' + pattern + ')', function () {
    it(description, function (done) {
      hyperquest('http://localhost:3000' + path, {}, function (err, res) {
        if (err) return done(err);
        assert.equal(res.statusCode, status);
        assert.equal(res.headers.location, location);
        done();
      });
    });
  })
}
test('/fn/foo', 'function(foo)', 'redirects to the result of the function', 302, '/fn-res/foo');
test('/page/1/next', '"/page/[1 + :no]"', 'goes to the next page', 302, '/page/2');
test('/page/2/prev', '"/page/[-1 + :no]"', 'goes to the next page', 302, '/page/1');
test('/10', '301, "/post/:number"', 'expands with ert', 301, '/post/10');