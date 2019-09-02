/**
 * Entry point for the HTTP library (WIP)
 *
 * @file    \lib\internal\http\index.js
 * @author  Justin Cox <https://conji.me>
 */

// this uses Java based HTTP so we can incorporate it into the JS
const URL = require('@java/java.net.URL');
const util = require('internal/util/java');
const Agent = require('internal/http/agent');

exports.Agent = Agent;
exports.globalAgent = new Agent();

function get(endpoint, properties = {}) {
  return new Promise((resolve, reject) => {
    try {
      const urlToGet = new URL(endpoint);
      const connection = urlToGet.openConnection();
      connection.setRequestMethod('GET');
      for (const prop in properties) {
        connection.setRequestProperty(prop, properties[prop]);
      }
      const result = util.getStringFromBuffer(connection.getInputStream());
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

function post(endpoint, data, properties = {}) {
  return new Promise((resolve, reject) => {
    try {
      const urlToGet = new URL(endpoint);
      const connection = urlToGet.openConnection();
      connection.setRequestMethod('POST');
      for (const prop in properties) {
        connection.setRequestProperty(prop, properties[prop]);
      }
      connection.setDoOutput(true);
      const input = JSON.stringify(data);
      connection.setFixedLengthStreamingMode(input.length);
      connection.setRequestProperty(
        'Content-Type',
        properties.contentType || 'application/json;charset=utf-8'
      );
      const inputStream = connection.getOutputStream();
      inputStream.write(input);
      inputStream.close();
      const result = util.getStringFromBuffer(inputStream);
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

function put(endpoint, data, properties = {}) {
  return new Promise((resolve, reject) => {
    try {
      const urlToGet = new URL(endpoint);
      const connection = urlToGet.openConnection();
      connection.setRequestMethod('PUT');
      for (const prop in properties) {
        connection.setRequestProperty(prop, properties[prop]);
      }
      connection.setDoOutput(true);
      const input = JSON.stringify(data);
      connection.setFixedLengthStreamingMode(input.length);
      connection.setRequestProperty(
        'Content-Type',
        properties.contentType || 'application/json;charset=utf-8'
      );
      const inputStream = connection.getOutputStream();
      inputStream.write(input);
      inputStream.close();
      const result = util.getStringFromBuffer(inputStream);
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

function ddelete(endpoint, data, properties = {}) {
  return new Promise((resolve, reject) => {
    try {
      const urlToGet = new URL(endpoint);
      const connection = urlToGet.openConnection();
      connection.setRequestMethod('DELETE');
      for (const prop in properties) {
        connection.setRequestProperty(prop, properties[prop]);
      }
      const result = util.getStringFromBuffer(connection.getInputStream());
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
