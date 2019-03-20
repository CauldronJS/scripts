function Resolver () {

}

Resolver.prototype.cancel = function () {

}

function getServers () {

}

function lookup (hostname, options, callback) {

}

function lookupService (address, port, callback) {

}

function resolve (hostname, rrtype, callback) {

}

function resolve4 (hostname, options, callback) {

}

function resolve6 (hostname, options, callback) {

}

function resolveCname (hostname, callback) {

}

function resolveMx (hostname, callback) {

}

function resolveNaptr (hostname, callback) {

}

function resolveNs (hostname, callback) {

}

function resolvePtr (hostname, callback) {

}

function resolveSoa (hostname, callback) {

}

function resolveSrv (hostname, callback) {

}

function resolveTxt (hostname, callback) {

}

function resolveAny (hostname, callback) {

}

function reverse (ip, callback) {

}

function setServers (servers) {

}

module.exports = {
  Resolver,
  getServers,
  lookup,
  lookupService,
  resolve,
  resolve4,
  resolve6,
  resolveCname,
  resolveMx,
  resolveNaptr,
  resolveNs,
  resolvePtr,
  resolveSoa,
  resolveSrv,
  resolveTxt,
  resolveAny,
  reverse,
  setServers
}
