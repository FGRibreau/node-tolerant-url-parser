tolerant url-parser [![Build Status](https://drone.io/github.com/FGRibreau/node-tolerant-url-parser/status.png)](https://drone.io/github.com/FGRibreau/node-tolerant-url-parser/latest) [![Deps](https://david-dm.org/FGRibreau/node-tolerant-url-parser.png)](https://david-dm.org/FGRibreau/node-tolerant-url-parser)
========================

Overly tolerant url parser specialized in parsing protocol, auth (even invalid ones), host and port url parts.

[![npm](https://nodei.co/npm/tolerant.png)](https://npmjs.org/package/tolerant)

### Usage

```javascript
var TolerantUrl = require('tolerant');

console.log(TolerantUrl.parse('protocol://user:auth@domain.com:port/path/a'));

// should print
{
  'protocol': 'protocol:',
  'auth': 'user:auth',
  'hostname': 'domain.com',
  'host': 'domain.com:port',
  'port': 'port',
  'href': 'protocol://user:auth@domain.com:port/path/a',
  'path': '/path/a'
}

// and that's all.
```

### How `tolerant` differs from nodejs url.parse

NodeJS [url standard library](nodejs.org/docs/latest/api/url.html):

```javascript
require('url')
.parse('redis://plop:z4fsoV:_git://53c2nd@koo3@1hFldzFG/2ojyPwcTCPZgRo=@redsmin.com:6379')
{
  protocol: 'redis:',
  slashes: true,
  auth: null,
  host: 'plop',
  port: null,
  hostname: 'plop',
  hash: null,
  search: null,
  query: null,
  pathname: '/:z4fsoV:_git//53c2nd@koo3@1hFldzFG/2ojyPwcTCPZgRo=@redsmin.com:6379',
  path: '/:z4fsoV:_git//53c2nd@koo3@1hFldzFG/2ojyPwcTCPZgRo=@redsmin.com:6379',
  href: 'redis://plop/:z4fsoV:_git//53c2nd@koo3@1hFldzFG/2ojyPwcTCPZgRo=@redsmin.com:6379'
}
```

`url.parse` was not able to extract the auth while the tolerant url-parser can:

```javascript
require('tolerant')
.parse('redis://plop:z4fsoV:_git://53c2nd@koo3@1hFldzFG/2ojyPwcTCPZgRo=@redsmin.com:6379')
{
  protocol: 'redis:',
  auth: 'plop:z4fsoV:_git://53c2nd@koo3@1hFldzFG/2ojyPwcTCPZgRo=',
  hostname: 'redsmin.com',
  host: 'redsmin.com:6379',
  port: '6379',
  href: 'redis://plop:z4fsoV:_git://53c2nd@koo3@1hFldzFG/2ojyPwcTCPZgRo=@redsmin.com:6379',
  path: null
}
```

Check `test/main.js` for examples of weird urls parsed by `tolerant`.

### [Changelog](/CHANGELOG.md)

### License

Copyright (c) 2014, Francois-Guillaume Ribreau node@fgribreau.com.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
