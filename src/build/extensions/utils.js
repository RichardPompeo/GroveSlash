const byteSize = require("byte-size");
const Utils = {};

Utils.time = function (s) {
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hours = (s - mins) / 60;

  var days = parseInt(Math.floor(hours / 24));
  hours = parseInt(hours % 24);

  var weeks = parseInt(Math.floor(days / 7));
  days = parseInt(days % 7);

  var months = parseInt(Math.floor(weeks / 7));
  weeks = parseInt(weeks % 7);

  return (
    (months > 0 ? pad(months) + "m, " : "") +
    (weeks > 0 ? pad(weeks) + "s, " : "") +
    (days > 0 ? pad(days) + "d, " : "") +
    (hours > 0 ? pad(hours) + "h, " : "") +
    (mins > 0 ? pad(mins) + "m e " : "") +
    (pad(secs) + "s")
  );
};

Utils.time2 = function (s) {
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hours = (s - mins) / 60;

  var days = parseInt(Math.floor(hours / 24));
  hours = parseInt(hours % 24);

  var weeks = parseInt(Math.floor(days / 7));
  days = parseInt(days % 7);

  var months = parseInt(Math.floor(weeks / 7));
  weeks = parseInt(weeks % 7);

  return (
    (months > 0 ? pad(months) + ":" : "") +
    (weeks > 0 ? pad(weeks) + ":" : "") +
    (days > 0 ? pad(days) + ":" : "") +
    (hours > 0 ? pad(hours) + ":" : "") +
    (mins > 0 ? pad(mins) + ":" : "") +
    pad(secs)
  );
};

Utils.bytes = function (size) {
  return byteSize(size);
};

module.exports = Utils;
