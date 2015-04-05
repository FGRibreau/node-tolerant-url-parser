'use strict';
var tolerantUrl = require('../');
var t = require('chai').assert;

describe('.parse', function () {

  it('should produce documentation #lazy', function () {
    var parsed = tolerantUrl.parse('protocol://user:auth@domain.com:port/path');
    // JSON.stringify(parsed, null, 2);
    t.deepEqual(parsed, {
      'protocol': 'protocol:',
      'auth': 'user:auth',
      'hostname': 'domain.com',
      'host': 'domain.com:port',
      'port': 'port',
      'href': 'protocol://user:auth@domain.com:port/path',
      'path': '/path'
    });
  });

  it('should be able to parse sometime weird urls', function (f) {
    [{ // just domain without protocol
        input: 'my.own.domain.name.com',
        output: {
          protocol: null,
          auth: null,
          hostname: 'my.own.domain.name.com',
          port: null,
          host: 'my.own.domain.name.com',
          path: null
        }
      },

      { // just domain
        input: 'redis://pub-redis-12000.us-east-0-0.0.ec1.garantiadata.com',
        output: {
          protocol: 'redis:',
          auth: null,
          hostname: 'pub-redis-12000.us-east-0-0.0.ec1.garantiadata.com',
          port: null,
          host: 'pub-redis-12000.us-east-0-0.0.ec1.garantiadata.com',
          path: null
        }
      }, { // just domain with port
        input: 'redis://redsmin.ok.com:12000/aa/aaa',
        output: {
          protocol: 'redis:',
          auth: null,
          hostname: 'redsmin.ok.com',
          port: '12000',
          host: 'redsmin.ok.com:12000',
          path: '/aa/aaa'
        }
      }, { // full (easy)
        input: 'redis://user:password@plop.redsmin.com:12000',
        output: {
          protocol: 'redis:',
          auth: 'user:password',
          hostname: 'plop.redsmin.com',
          port: '12000',
          host: 'plop.redsmin.com:12000',
          path: null
        }
      }, { // weird auth + domain
        input: 'redis://z4fsoVXGIt:53c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=@redsmin.com/aaa',
        output: {
          protocol: 'redis:',
          auth: 'z4fsoVXGIt:53c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=',
          hostname: 'redsmin.com',
          port: null,
          host: 'redsmin.com',
          path: '/aaa'
        }
      }, { // weird auth + domain + port
        input: 'redis://z4fsoVXGIt53c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=@redsmin.com:6379',
        output: {
          protocol: 'redis:',
          auth: 'z4fsoVXGIt53c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=',
          hostname: 'redsmin.com',
          port: '6379',
          host: 'redsmin.com:6379',
          path: null
        }
      }, { // weird auth (multi @) + domain + port
        input: 'redis://user:z4fsoVXGIt5@3c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=@redsmin.com:6379',
        output: {
          protocol: 'redis:',
          auth: 'user:z4fsoVXGIt5@3c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=',
          hostname: 'redsmin.com',
          port: '6379',
          host: 'redsmin.com:6379',
          path: null
        }
      }, { // weird auth (multi ://) + domain + port
        input: 'redis://user:z4fsoVXGI://t5@3c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=@redsmin.com:6379',
        output: {
          protocol: 'redis:',
          auth: 'user:z4fsoVXGI://t5@3c1NDkoi41fFmzdHJ/2ojyZtcTCPZgRo=',
          hostname: 'redsmin.com',
          port: '6379',
          host: 'redsmin.com:6379',
          path: null
        }
      }, { // really really weird auth + domain + port
        input: 'redis://user:F,-9fsR;K{E4cM{o-&xS%ma6NbPoPTT*M<NCQn}+!sInRY]QIIYkb:jjJ*fiBgb+RUuW16sj1J8/<Ez[rw!yF3LbhvG@{Oi|X*1I0%_9Va]{?h?3&i.@-0QxPf>_YJ.Kdp,p8qT,NDg*Q9%wy6h-OGgEU]?sYg?Ef,|2shOkwgYkz.NPNDu]T4%:,>_76U}7U;\'TSv7K*+k!HZR?0TQ2+]X.9DMs,s[rSZi?c.\'&>M7h89SpElr[vtL.Gdfe;!L|>&!wZ\'CuPT\'6,F62_ox,?L+gae5aUO<<%A\'28\'4hS77TrGDPK#1lrBo}*F:*pcd0w_NY##>0K:2#soE[,nJn,9\'&>-({84AHRvApS49<xBgaF/NAfp!&I*(amb<h4Uss%whGffZr6u!;ZQsA||@0NNwz_]F|cPjw>iWTDmCJ?h(+-B6VYrZz:Ij\'9J_}w9uP:24YHV@QgKKt/7vm](3t#5:v:7dP]6MQrC@SHw|@r{{7(!*Y<X1y?}nhX&O#E|<@redsmin.com:6379',
        output: {
          protocol: 'redis:',
          auth: 'user:F,-9fsR;K{E4cM{o-&xS%ma6NbPoPTT*M<NCQn}+!sInRY]QIIYkb:jjJ*fiBgb+RUuW16sj1J8/<Ez[rw!yF3LbhvG@{Oi|X*1I0%_9Va]{?h?3&i.@-0QxPf>_YJ.Kdp,p8qT,NDg*Q9%wy6h-OGgEU]?sYg?Ef,|2shOkwgYkz.NPNDu]T4%:,>_76U}7U;\'TSv7K*+k!HZR?0TQ2+]X.9DMs,s[rSZi?c.\'&>M7h89SpElr[vtL.Gdfe;!L|>&!wZ\'CuPT\'6,F62_ox,?L+gae5aUO<<%A\'28\'4hS77TrGDPK#1lrBo}*F:*pcd0w_NY##>0K:2#soE[,nJn,9\'&>-({84AHRvApS49<xBgaF/NAfp!&I*(amb<h4Uss%whGffZr6u!;ZQsA||@0NNwz_]F|cPjw>iWTDmCJ?h(+-B6VYrZz:Ij\'9J_}w9uP:24YHV@QgKKt/7vm](3t#5:v:7dP]6MQrC@SHw|@r{{7(!*Y<X1y?}nhX&O#E|<',
          hostname: 'redsmin.com',
          port: '6379',
          host: 'redsmin.com:6379',
          path: null
        }
      }
    ].forEach(function (test) {
      var p = tolerantUrl.parse(test.input);
      t.deepEqual(p.protocol, test.output.protocol);
      t.strictEqual(p.auth, test.output.auth);
      t.strictEqual(p.host, test.output.host);
      t.strictEqual(p.port, test.output.port);
      t.strictEqual(p.hostname, test.output.hostname);
      t.strictEqual(p.path, test.output.path);
    });
    f();
  });
});
