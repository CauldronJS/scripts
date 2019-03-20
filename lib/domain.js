function Domain () {
  this.members = [];
}

Domain.prototype.add = function (emitter) {

}

Domain.prototype.bind = function (callback) {

}

Domain.prototype.enter = function () {

}

Domain.prototype.exit = function () {

}

Domain.prototype.intercept = function (callback) {

}

Domain.prototype.remove = function (emitter) {

}

Domain.prototype.run = function () {
  var fn = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
}

function create () {

}

module.exports = {
  create,
  Domain
}
