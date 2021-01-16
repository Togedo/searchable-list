'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var LocalSearchableCollection$SearchableList = require("./LocalSearchableCollection.bs.js");
var RemoteSearchableCollection$SearchableList = require("./RemoteSearchableCollection.bs.js");

function SearchDropdown(SC) {
  var SearchDropdown$SearchDropdown = function (Props) {
    var users = Props.users;
    var match = React.useState(function () {
          return Curry._1(SC.initialState, users);
        });
    var setState = match[1];
    var state = match[0];
    return React.createElement("div", undefined, React.createElement("input", {
                    onChange: (function (e) {
                        var query = e.target.value;
                        var query$1 = query.toLocaleLowerCase();
                        Curry._2(SC.search, query$1, setState);
                        
                      })
                  }), Curry._1(SC.render, state.found), state.loading ? React.createElement("div", undefined, React.createElement("i", undefined, "Loading...")) : null);
  };
  return {
          SC: SC,
          make: SearchDropdown$SearchDropdown
        };
}

var SC = {
  initialState: LocalSearchableCollection$SearchableList.initialState,
  render: LocalSearchableCollection$SearchableList.render,
  search: LocalSearchableCollection$SearchableList.search,
  asMapOfSearchable: LocalSearchableCollection$SearchableList.asMapOfSearchable
};

function SearchDropdown$SearchDropdown(Props) {
  var users = Props.users;
  var match = React.useState(function () {
        return LocalSearchableCollection$SearchableList.initialState(users);
      });
  var setState = match[1];
  var state = match[0];
  return React.createElement("div", undefined, React.createElement("input", {
                  onChange: (function (e) {
                      var query = e.target.value;
                      var query$1 = query.toLocaleLowerCase();
                      LocalSearchableCollection$SearchableList.search(query$1, setState);
                      
                    })
                }), LocalSearchableCollection$SearchableList.render(state.found), state.loading ? React.createElement("div", undefined, React.createElement("i", undefined, "Loading...")) : null);
}

var LocalSearchDropdown = {
  SC: SC,
  make: SearchDropdown$SearchDropdown
};

var SC$1 = {
  initialState: RemoteSearchableCollection$SearchableList.initialState,
  render: RemoteSearchableCollection$SearchableList.render,
  search: RemoteSearchableCollection$SearchableList.search,
  asMapOfSearchable: RemoteSearchableCollection$SearchableList.asMapOfSearchable
};

function SearchDropdown$SearchDropdown$1(Props) {
  var users = Props.users;
  var match = React.useState(function () {
        return RemoteSearchableCollection$SearchableList.initialState(users);
      });
  var setState = match[1];
  var state = match[0];
  return React.createElement("div", undefined, React.createElement("input", {
                  onChange: (function (e) {
                      var query = e.target.value;
                      var query$1 = query.toLocaleLowerCase();
                      RemoteSearchableCollection$SearchableList.search(query$1, setState);
                      
                    })
                }), RemoteSearchableCollection$SearchableList.render(state.found), state.loading ? React.createElement("div", undefined, React.createElement("i", undefined, "Loading...")) : null);
}

var RemoteSearchDropdown = {
  SC: SC$1,
  make: SearchDropdown$SearchDropdown$1
};

exports.SearchDropdown = SearchDropdown;
exports.LocalSearchDropdown = LocalSearchDropdown;
exports.RemoteSearchDropdown = RemoteSearchDropdown;
/* react Not a pure module */
