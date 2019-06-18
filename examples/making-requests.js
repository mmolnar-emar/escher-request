'use strict';

process.env.ESCHER_INTEGRATIONS = `[
  {
    "serviceUrl": "http://localhost:9193",
    "credentialScope": "eu/test-target/ems_request",
    "keyId": "test_test-target_v1",
    "secret": "secret",
    "acceptOnly": false
  }
]`;

const escherRequest = require('../src/main');

// request with absolute url
escherRequest.get('http://localhost:9193/hello?a=1&b=2')
  .then(console.log)
  .catch(logError);

// request with relative url and escherKeyId option
escherRequest.get('/hello', { escherKeyId: 'test_test-target' })
  .then(console.log)
  .catch(logError);

// post request
escherRequest.post('/puty', { valami: 4 }, { escherKeyId: 'test_test-target' })
  .then(console.log)
  .catch(logError);

// // presigning url
var preSigned = escherRequest.preSignUrl(
  'http://localhost:9193/hello?a=4',
  { expires: 300 }
);
console.log('preSigned', preSigned);

// presign relative url
var preSigned = escherRequest.preSignUrl(
  '/hello?a=4#yolo',
  { expires: 300, escherKeyId: 'test_test-target' }
);
console.log('preSigned', preSigned);

function logError(error) {
  if (error.response) {
    console.log(error.response.status, error.response.statusText, error.response.data);
  } else {
    console.log(error);
  }
}
