/**
  Overly tolerant url parser
 */

var Url = module.exports = {
  PROTOCOL: '://',
  COLON: ':',
  AT: '@',
  parse: function(url){
    var parsed = {
      protocol: null, // string
      auth: null, // string
      hostname: null, // string
      host: null, // string
      port: null, // string
      href: url // string
    };

    // check protocol
    var protocolIdx = url.indexOf(this.PROTOCOL);
    if(protocolIdx === -1){
      // protocol is not present add one
    } else {
      parsed.protocol = url.substring(0, protocolIdx+1);
      protocolIdx += this.PROTOCOL.length;
      // remove the protocol part from the url
      url = url.substring(protocolIdx);
    }

    var atCount        = strCount(url, this.AT);
    var colonCount     = strCount(url, this.COLON);
    var atIsPresent    = atCount > 0;
    var colonIsPresent = colonCount > 0;

    if(!atIsPresent && !colonIsPresent){
      parsed.host     = url;
      parsed.hostname = url;
      // parse is done, there are no port and auth
      return parsed;
    }

    if(colonCount === 1 && !atIsPresent){ // it can only be the port number
      extractPortAndHostnameFromHost(parsed, url);
      return parsed;
    }

    var parts   = url.split(this.AT);
    var host    = parts.pop();
    extractPortAndHostnameFromHost(parsed, host);
    parsed.auth = parts.join(this.AT);
    return parsed;
  }
};

function strCount(str, substr){
  if (str === null || substr === null) return 0;
  str    = String(str);
  substr = String(substr);

  var count  = 0,
      pos    = 0,
      length = substr.length;

  while (true) {
    pos = str.indexOf(substr, pos);
    if (pos === -1) break;
    count++;
    pos += length;
  }

  return count;
}

function extractPortAndHostnameFromHost(parsed, host){
  var portIdx = host.indexOf(Url.COLON);
  parsed.host = host;

  if(portIdx === -1){
    parsed.hostname = host;
    // no colon is present inside host
    return;
  }
  parsed.port = host.substring(portIdx + Url.COLON.length);
  parsed.hostname = host.substring(0, portIdx);
}
