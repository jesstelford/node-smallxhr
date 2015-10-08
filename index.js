'use strict';

function SmallXhrError(message, type) {
  this.name = 'SmallXhrError';
  this.message = message;
  this.type = type || 'http';
  this.stack = (new Error()).stack;
}
SmallXhrError.prototype = new Error;

module.exports = function smallxhr(url, data, callback, method, contenttype, timeout) {

  var requestTimeout,
      xhr;

  try {
    xhr = new XMLHttpRequest();
  } catch(e) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      return null;
    }
  }

  requestTimeout = setTimeout(function() {
    xhr.abort();
    callback(new SmallXhrError("smallxhr: aborted by a timeout", 'timeout'), null, xhr);
  }, timeout || 5000);

  xhr.onreadystatechange = function() {

    var error = null;

    if (xhr.readyState != 4) {
      return;
    }

    clearTimeout(requestTimeout);

    var response = xhr.responseText

    try {
      response = JSON.parse(response);
    } catch(e) {}

    if (xhr.status != 200) {
      error = new SmallXhrError("smallxhr: server response status is " + xhr.status);
    }

    callback(error, response, xhr);
  }

  method = (method ? method.toUpperCase() : "GET");

  xhr.open(method, url, true);

 	if (!data) {
    xhr.send();
  } else {
    contenttype = contenttype || 'application/x-www-form-urlencoded';
    xhr.setRequestHeader('Content-type', contenttype);
    xhr.send(data)
  }

}

module.exports.post = function(url, data, callback) {
  smallxhr(url, data, callback, 'POST');
}

module.exports.get = function(url, callback) {
  smallxhr(url, null, callback);
}
