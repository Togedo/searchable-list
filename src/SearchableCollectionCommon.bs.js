'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_HashMapString = require("bs-platform/lib/js/belt_HashMapString.js");
var Searchable$SearchableList = require("./Searchable.bs.js");

function initialState(cache) {
  return {
          query: "",
          cache: cache,
          found: [],
          loading: false
        };
}

var forEach = Belt_Array.forEach;

function length(prim) {
  return prim.length;
}

var itemId = Searchable$SearchableList.id;

function renderItem(item) {
  return React.createElement("div", undefined, Searchable$SearchableList.render(item));
}

function render(list) {
  return $$Array.mapi((function (i, item) {
                return React.createElement(React.Fragment, {
                            children: renderItem(item),
                            key: String(i)
                          });
              }), list);
}

function asMapOfSearchable(list) {
  var hMap = Belt_HashMapString.make(list.length);
  Belt_Array.forEach(list, (function (i) {
          return Belt_HashMapString.set(hMap, Searchable$SearchableList.id(i), i);
        }));
  return hMap;
}

exports.initialState = initialState;
exports.forEach = forEach;
exports.length = length;
exports.itemId = itemId;
exports.renderItem = renderItem;
exports.render = render;
exports.asMapOfSearchable = asMapOfSearchable;
/* react Not a pure module */
