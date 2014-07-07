var tolerantUrl = require('../');
var t           = require('assert');

describe('.parse', function () {

  it('should produce documentation #lazy', function(){
    var parsed = tolerantUrl.parse('protocol://user:auth@domain.com:port');
    // JSON.stringify(parsed, null, 2);
    t.deepEqual(parsed, {
      'protocol': 'protocol:',
      'auth': 'user:auth',
      'hostname': 'domain.com',
      'host': 'domain.com:port',
      'port': 'port',
      'href': 'protocol://user:auth@domain.com:port'
    });
  });

  it('should be able to parse sometime weird urls', function (f) {
    [
      { // just domain without protocol
        input: 'my.own.domain.name.com',
        output: {
          protocol: null,
          auth: null,
          hostname: 'my.own.domain.name.com',
          port: null,
          host: 'my.own.domain.name.com'
        }
      },

      { // just domain
        input: 'redis://pub-redis-12000.us-east-0-0.0.ec1.garantiadata.com',
        output: {
          protocol: 'redis:',
          auth: null,
          hostname: 'pub-redis-12000.us-east-0-0.0.ec1.garantiadata.com',
          port: null,
          host: 'pub-redis-12000.us-east-0-0.0.ec1.garantiadata.com'
        }
      },
      { // just domain with port
        input: 'redis://redsmin.ok.com:12000',
        output: {
          protocol: 'redis:',
          auth: null,
          hostname: 'redsmin.ok.com',
          port: '12000',
          host: 'redsmin.ok.com:12000'
        }
      },
      { // full (easy)
        input: 'redis://user:password@plop.redsmin.com:12000',
        output: {
          protocol: 'redis:',
          auth: 'user:password',
          hostname: 'plop.redsmin.com',
          port: '12000',
          host: 'plop.redsmin.com:12000'
        }
      },
      { // weird auth + domain
        input: 'redis://z4fsoVXGIt:53c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=@redsmin.com',
        output: {
          protocol: 'redis:',
          auth: 'z4fsoVXGIt:53c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=',
          hostname: 'redsmin.com',
          port: null,
          host: 'redsmin.com'
        }
      },
      { // weird auth + domain + port
        input: 'redis://z4fsoVXGIt53c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=@redsmin.com:6379',
        output: {
          protocol: 'redis:',
          auth: 'z4fsoVXGIt53c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=',
          hostname: 'redsmin.com',
          port: '6379',
          host: 'redsmin.com:6379'
        }
      },
      { // weird auth (multi @) + domain + port
        input: 'redis://user:z4fsoVXGIt5@3c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=@redsmin.com:6379',
        output: {
          protocol: 'redis:',
          auth: 'user:z4fsoVXGIt5@3c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=',
          hostname: 'redsmin.com',
          port: '6379',
          host: 'redsmin.com:6379'
        }
      }
    ].forEach(function(test){
      var p = tolerantUrl.parse(test.input);
      t.deepEqual(p.protocol, test.output.protocol);
      t.strictEqual(p.auth, test.output.auth);
      t.strictEqual(p.host, test.output.host);
      t.strictEqual(p.port, test.output.port);
      t.strictEqual(p.hostname, test.output.hostname);
    });
    f();
  });
});
