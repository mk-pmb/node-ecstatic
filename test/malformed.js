var test = require('tap').test,
    ecstatic = require('../lib/ecstatic'),
    http = require('http')
;

test('malformed uri', function (t) {
  t.plan(1);
  var server = http.createServer(ecstatic(__dirname));
  t.on('end', function () {
    console.error('closing');
    server.close();
  });

  server.listen(0, function () {
    console.error('listening on ', server.address());
    var r = http.get({
      host: 'localhost',
      port: server.address().port,
      path: '/%'
    });
    r.on('response', function (res) {
      console.error('status ', res.statusCode);
      t.equal(res.statusCode, 400);
    });
  });
});
