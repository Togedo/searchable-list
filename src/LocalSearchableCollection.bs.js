'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Searchable$SearchableList = require("./Searchable.bs.js");
var SearchableCollectionCommon$SearchableList = require("./SearchableCollectionCommon.bs.js");

function search(query, setState) {
  return Curry._1(setState, (function (state) {
                return {
                        query: state.query,
                        cache: state.cache,
                        found: Belt_Array.keep(state.cache, (function (param) {
                                return Searchable$SearchableList.query(query, param);
                              })),
                        loading: false
                      };
              }));
}

var LocalSearchableCollection = {
  initialState: SearchableCollectionCommon$SearchableList.initialState,
  render: SearchableCollectionCommon$SearchableList.render,
  search: search,
  asMapOfSearchable: SearchableCollectionCommon$SearchableList.asMapOfSearchable
};

var initialState = SearchableCollectionCommon$SearchableList.initialState;

var render = SearchableCollectionCommon$SearchableList.render;

var asMapOfSearchable = SearchableCollectionCommon$SearchableList.asMapOfSearchable;

exports.LocalSearchableCollection = LocalSearchableCollection;
exports.initialState = initialState;
exports.render = render;
exports.search = search;
exports.asMapOfSearchable = asMapOfSearchable;
/* Searchable-SearchableList Not a pure module */
