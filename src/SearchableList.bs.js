'use strict';

var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Searchable$SearchableList = require("./Searchable.bs.js");

function renderItem(item) {
  return React.createElement("div", undefined, Searchable$SearchableList.Searchable.render(item));
}

function searchLocal(list, query) {
  return Belt_Array.keep(list, (function (param) {
                return Searchable$SearchableList.Searchable.query(query, param);
              }));
}

function searchRemote(query) {
  return new Promise((function (resolve, reject) {
                setTimeout((function (param) {
                        return resolve(Belt_Array.keep([
                                        {
                                          TAG: /* User */1,
                                          _0: {
                                            name: "Remote Bob"
                                          }
                                        },
                                        {
                                          TAG: /* User */1,
                                          _0: {
                                            name: "Remote Tom"
                                          }
                                        }
                                      ], (function (param) {
                                          return Searchable$SearchableList.Searchable.query(query, param);
                                        })));
                      }), 400);
                
              }));
}

var SearchableList = {
  renderItem: renderItem,
  searchLocal: searchLocal,
  searchRemote: searchRemote
};

exports.SearchableList = SearchableList;
/* react Not a pure module */
