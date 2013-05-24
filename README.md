# deviate
<img src="http://i.imgur.com/g3GNbqw.png" align="right"/>

Redirecting middlware for express or node.js

- supports [ert](https://github.com/ForbesLindesay/ert) syntax
- supports a function that takes `req` and returns the path
- uses `res.redirect` if it's used with express
- falls back to manually writing the header elsewhere

[![Build Status](https://travis-ci.org/ForbesLindesay/deviate.png?branch=master)](https://travis-ci.org/ForbesLindesay/deviate)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/deviate.png)](https://gemnasium.com/ForbesLindesay/deviate)

## Usage

```js
var deviate = require('deviate');

var express = require('express');
var app = express();

app.get('/random', deviate(function (req) { return '/post/' + Math.random(); }));

app.get('/page/:no/next', deviate('/page/[Number:no + 1]'));
app.get('/page/:no/prev', deviate('/page/[Number:no - 1]'));

app.get('/:number', deviate(301, '/post/:number'));

app.listen(3000);
```

## API

`deviate([status,] path)`

Deviate takes an optional status (which defaults to 302) and a path or function.  It then returns a middleware function which takes `req` and `res` and redirects `res` to the path.

## License

MIT
