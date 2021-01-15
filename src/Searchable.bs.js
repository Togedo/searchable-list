'use strict';

var React = require("react");

function index(item) {
  return item._0.name.toLocaleLowerCase();
}

function query(query$1, item) {
  return index(item).includes(query$1);
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

var Searchable = {
  index: index,
  query: query,
  id: id,
  render: render
};

exports.Searchable = Searchable;
/* react Not a pure module */
