'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_SortArray = require("bs-platform/lib/js/belt_SortArray.js");
var Belt_HashMapString = require("bs-platform/lib/js/belt_HashMapString.js");
var Searchable$SearchableList = require("./Searchable.bs.js");
var LocalSearchableCollection$SearchableList = require("./LocalSearchableCollection.bs.js");
var SearchableCollectionCommon$SearchableList = require("./SearchableCollectionCommon.bs.js");

function searchRemote(query) {
  return new Promise((function (resolve, reject) {
                setTimeout((function (param) {
                        return resolve(Belt_Array.keep(Searchable$SearchableList.fromUsers([
                                            {
                                              name: "Remote Anne"
                                            },
                                            {
                                              name: "Remote Bob"
                                            },
                                            {
                                              name: "Remote Tom"
                                            }
                                          ]), (function (param) {
                                          return Searchable$SearchableList.query(query, param);
                                        })));
                      }), 400);
                
              }));
}

function search(query, setState) {
  LocalSearchableCollection$SearchableList.search(query, (function (localSetState) {
          Curry._1(setState, (function (state) {
                  var init = Curry._1(localSetState, state);
                  return {
                          query: query,
                          cache: init.cache,
                          found: init.found,
                          loading: true
                        };
                }));
          
        }));
  searchRemote(query).then(function (remoteResults) {
        return Promise.resolve(Curry._1(setState, (function (state) {
                          if (state.query !== query) {
                            return state;
                          }
                          var map = LocalSearchableCollection$SearchableList.asMapOfSearchable(state.found);
                          var remoteMap = SearchableCollectionCommon$SearchableList.asMapOfSearchable(remoteResults);
                          Belt_HashMapString.mergeMany(map, Belt_HashMapString.toArray(remoteMap));
                          return {
                                  query: state.query,
                                  cache: state.cache,
                                  found: Belt_SortArray.stableSortBy(Belt_HashMapString.valuesToArray(map), (function (a, b) {
                                          return SearchableCollectionCommon$SearchableList.itemId(a).localeCompare(SearchableCollectionCommon$SearchableList.itemId(b)) | 0;
                                        })),
                                  loading: false
                                };
                        })));
      });
  
}

var RemoteSearchableCollection = {
  initialState: SearchableCollectionCommon$SearchableList.initialState,
  render: SearchableCollectionCommon$SearchableList.render,
  search: search,
  asMapOfSearchable: SearchableCollectionCommon$SearchableList.asMapOfSearchable
};

var initialState = SearchableCollectionCommon$SearchableList.initialState;

var render = SearchableCollectionCommon$SearchableList.render;

var asMapOfSearchable = SearchableCollectionCommon$SearchableList.asMapOfSearchable;

exports.RemoteSearchableCollection = RemoteSearchableCollection;
exports.initialState = initialState;
exports.render = render;
exports.search = search;
exports.asMapOfSearchable = asMapOfSearchable;
/* Searchable-SearchableList Not a pure module */
