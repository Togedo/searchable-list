'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_SortArray = require("bs-platform/lib/js/belt_SortArray.js");
var Belt_HashMapString = require("bs-platform/lib/js/belt_HashMapString.js");
var Searchable$SearchableList = require("./Searchable.bs.js");
var SearchableList$SearchableList = require("./SearchableList.bs.js");

function UserSearchDropdown(Props) {
  var users = Props.users;
  var match = React.useState(function () {
        return {
                found: users,
                loading: false,
                query: ""
              };
      });
  var setState = match[1];
  var state = match[0];
  return React.createElement("div", undefined, React.createElement("input", {
                  onChange: (function (e) {
                      var query = e.target.value;
                      Curry._1(setState, (function (param) {
                              return {
                                      found: SearchableList$SearchableList.SearchableList.searchLocal(users, query),
                                      loading: true,
                                      query: query
                                    };
                            }));
                      SearchableList$SearchableList.SearchableList.searchRemote(query).then(function (results) {
                            return Promise.resolve(Curry._1(setState, (function (state) {
                                              if (state.query !== query) {
                                                return state;
                                              }
                                              var hMap = Belt_HashMapString.make(results.length + state.found.length | 0);
                                              Belt_Array.forEach(state.found, (function (i) {
                                                      return Belt_HashMapString.set(hMap, Searchable$SearchableList.Searchable.id(i), i);
                                                    }));
                                              Belt_Array.forEach(results, (function (i) {
                                                      return Belt_HashMapString.set(hMap, Searchable$SearchableList.Searchable.id(i), i);
                                                    }));
                                              return {
                                                      found: Belt_SortArray.stableSortBy(Belt_HashMapString.valuesToArray(hMap), (function (a, b) {
                                                              return Searchable$SearchableList.Searchable.id(a).localeCompare(Searchable$SearchableList.Searchable.id(b)) | 0;
                                                            })),
                                                      loading: false,
                                                      query: state.query
                                                    };
                                            })));
                          });
                      
                    })
                }), $$Array.mapi((function (i, item) {
                    return React.createElement(React.Fragment, {
                                children: Searchable$SearchableList.Searchable.render(item),
                                key: String(i)
                              });
                  }), state.found), state.loading ? React.createElement("div", undefined, React.createElement("i", undefined, "Loading...")) : null);
}

var make = UserSearchDropdown;

exports.make = make;
/* react Not a pure module */
