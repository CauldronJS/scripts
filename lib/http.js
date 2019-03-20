// this uses Java based HTTP so we can incorporate it into the JS
var URL = require('@java/java.net.URL');
var BufferedReader = require('@java/java.io.BufferedReader');
var InputStreamReader = require('@java/java.io.InputStreamReader');

function get (endpoint, properties) {
  return new Promise(function (resolve, reject) {
    try {
      var urlToGet = new URL(endpoint);
      var connection = urlToGet.openConnection();
      connection.setRequestMethod('GET');
      if (!properties) properties = {};
      for (var prop in properties) {
        connection.setRequestProperty(prop, properties[prop]);
      }
      var result = '';
      var rd = new BufferedReader(
        new InputStreamReader(connection.getInputStream())
      );
      var line = null;
      while ((line = rd.readLine()) != null) {
        result += line + '\n';
      }

      rd.close();
      try {
        resolve(JSON.parse(result.toString()));
      } catch (ex) {
        resolve(result.toString());
      }
    } catch (exception) {
      reject(exception);
    }
  });
}

function post (endpoint, data, properties) {
  return new Promise(function (resolve, reject) {
    try {
      var urlToGet = new URL(endpoint);
      var connection = urlToGet.openConnection();
      connection.setRequestMethod('POST');
      if (!properties) properties = {};
      for (var prop in properties) {
        connection.setRequestProperty(prop, properties[prop]);
      }
      var result = '';
      var rd = new BufferedReader(
        new InputStreamReader(connection.getInputStream())
      );
      var line = null;
      while ((line = rd.readLine()) != null) {
        result += line + '\n';
      }

      rd.close();
      try {
        resolve(JSON.parse(result.toString()));
      } catch (ex) {
        resolve(result.toString());
      }
    } catch (exception) {
      reject(exception);
    }
  });
}

function put (endpoint, data, properties) {
  return new Promise(function (resolve, reject) {
    try {
      var urlToGet = new URL(endpoint);
      var connection = urlToGet.openConnection();
      connection.setRequestMethod('PUT');
      for (var prop in properties) {
        connection.setRequestProperty(prop, properties[prop]);
      }
      connection.setDoOutput(true);
      var input = JSON.stringify(data);
      connection.setFixedLengthStreamingMode(input.length);
      connection.setRequestProperty(
        'Content-Type',
        properties.contentType || 'application/json;chartset=utf-8'
      );
      var inputStream = connection.getOutputStream();
      inputStream.write(input);
      inputStream.close();
      var result = '';
      var rd = new BufferedReader(
        new InputStreamReader(connection.getInputStream())
      );
      var line = null;
      while ((line = rd.readLine()) != null) {
        result += line + '\n';
      }

      rd.close();
      try {
        resolve(JSON.parse(result.toString()));
      } catch (ex) {
        resolve(result.toString());
      }
    } catch (exception) {
      reject(exception);
    }
  });
}

function ddelete (endpoint, data, properties) {
  return new Promise(function (resolve, reject) {
    try {
      var urlToGet = new URL(endpoint);
      var connection = urlToGet.openConnection();
      connection.setRequestMethod('DELETE');
      for (var prop in properties) {
        connection.setRequestProperty(prop, properties[prop]);
      }
      var result = '';
      var rd = new BufferedReader(
        new InputStreamReader(connection.getInputStream())
      );
      var line = null;
      while ((line = rd.readLine()) != null) {
        result += line + '\n';
      }

      rd.close();
      try {
        resolve(JSON.parse(result.toString()));
      } catch (ex) {
        resolve(result.toString());
      }
    } catch (exception) {
      reject(exception);
    }
  });
}

exports.get = get;
exports.delete = ddelete;
exports.post = post;
exports.put = put;
