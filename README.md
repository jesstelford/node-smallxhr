# smallxhr

Very Small XHR library for easy, minimal cross-browser requests.

## Usage

### Basic GET

```javascript
var xhr = require('smallxhr');

// GET example.com
xhr('http://example.com', null, function(error, data, xhrResponse) {
  if (error) {
    throw error;
  }
  console.log('status: ' + xhrResponse.status);
  console.log(data);
});
```

### Complete POST

```javascript
var xhr = require('smallxhr');

var postData = JSON.stringify({foo: 'bar'});

// POST example.com with data
xhr('http://example.com', postData, function(error, data, xhrResponse) {
  if (error) {
    throw error;
  }
  console.log('status: ' + xhrResponse.status);
  console.log(data);
}, 'POST', 'application/json', 30000);
```

### API

```javascript
smallxhr(url, data, callback, method, contenttype, timeout)
```

 * `url` - The url to send the request to
 * `data` - Data to send with the request. Should be a string or `null`.
 * `callback` - Executed on success or failure with params (error, data, xhrResponse)
 * `method` - Any HTTP verb
 * `contenttype` - Any HTTP content type (default: `application/x-www-form-urlencoded`)
 * `timeout` - time in milliseconds before the request should be cancelled (default: `5000`)

#### Callback

```javascript
function(error, data, xhrResponse)
```

 * `error` - An `Error` object with a custom attribute `type`
   * `error.type` - one of `'timeout'` for a timeout error, or `'http'` to
     indicate you should check the value of `xhrResponse.statusCode`.
 * `data` - Any data returned from the request
 * `xhrResponse` - The XMLHttpRequest object

## Installation

```
npm install --save smallxhr
```

## Thanks

* [Simon Doodkin]()'s original [tinyxhr gist](https://gist.github.com/shimondoodkin/4706967)
* [Scott Duncombe](https://github.com/mojowen)'s [updates](https://gist.github.com/mojowen/6910426)
