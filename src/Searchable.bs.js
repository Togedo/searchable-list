'use strict';

var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

function index(item) {
  return item._0.name.toLocaleLowerCase();
}

function query(query$1, item) {
  if (query$1 !== "") {
    return index(item).includes(query$1);
  } else {
    return false;
  }
}

function id(item) {
  if (item.TAG !== /* Book */0) {
    return item._0.name;
  }
  var b = item._0;
  return b.name + ("_" + b.price.toString());
}

function render(item) {
  return React.createElement("div", undefined, id(item));
}

function fromUsers(users) {
  return Belt_Array.map(users, (function (u) {
                return {
                        TAG: /* User */1,
                        _0: u
                      };
              }));
}

exports.index = index;
exports.query = query;
exports.id = id;
exports.render = render;
exports.fromUsers = fromUsers;
/* react Not a pure module */
