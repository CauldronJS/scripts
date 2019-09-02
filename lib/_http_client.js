const BufferedReader = require('@java/java.io.BufferedReader');
const DataOutputStream = require('@java/java.io.DataOutputStream');
const InputStreamReader = require('@java/java.io.InputStreamReader');
const URL = require('@java/java.net.URL');

const ClientRequest = require('_http_request');
const ServerResponse = require('_http_response');

const userAgent = 'Mozilla/5.0';

class HttpClient {
  _sendRequest(url, method, data) {
    const con = createConnection(url, method.toUpperCase());
    if (data) {
      const json = JSON.stringify(data);
      con.setDoOutput(true);
      const wr = new DataOutputStream(con.getOutputStream());
      wr.writeBytes(json);
      wr.flush();
      wr.close();
    }
    return readFromConnection(con);
  }
}

function createConnection(url, method) {
  const obj = new URL(url);
  const con = obj.openConnection();
  con.setRequestMethod(method);
  con.setRequestProperty('User-Agent', userAgent);
  con.setRequestProperty('Accept-Language', 'en-US,en;q=0.5');
}

function readFromConnection(con) {
  const responseCode = con.getResponseCode();
  const input = new BufferedReader(new InputStreamReader(con.getInputStream()));
  let inputLine = '';
  let response = '';
  while ((inputLine = input.readLine()) != null) {
    response += inputLine + '\r\n';
  }
  input.close();

  return new ServerResponse({ statusCode: responseCode, data: response });
}

module.exports = HttpClient;
