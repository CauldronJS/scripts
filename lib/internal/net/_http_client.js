var BufferedReader = require('@java/java.io.BufferedReader');
var DataOutputStream = require('@java/java.io.DataOutputStream');
var InputStreamReader = require('@java/java.io.InputStreamReader');
var URL = require('@java/java.net.URL');

var ClientRequest = require('internal/net/_http_request');
var ServerResponse = require('internal/net/_http_response');

var userAgent = 'Mozilla/5.0';

function HttpClient() {}

HttpClient.prototype._sendRequest = function(url, method, data) {
  var con = createConnection(url, method.toUpperCase());
  if (data) {
    var json = JSON.stringify(data);
    con.setDoOutput(true);
    var wr = new DataOutputStream(con.getOutputStream());
    wr.writeBytes(json);
    wr.flush();
    wr.close();
  }
  return readFromConnection(con);
};

function createConnection(url, method) {
  var obj = new URL(url);
  var con = obj.openConnection();
  con.setRequestMethod(method);
  con.setRequestProperty('User-Agent', userAgent);
  con.setRequestProperty('Accept-Language', 'en-US,en;q=0.5');
}

function readFromConnection(con) {
  var responseCode = con.getResponseCode();
  var input = new BufferedReader(new InputStreamReader(con.getInputStream()));
  var inputLine = '';
  var response = '';
  while ((inputLine = input.readLine()) != null) {
    response += inputLine + '\r\n';
  }
  input.close();

  return new ServerResponse({ statusCode: responseCode, data: response });
}
