'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var Searchable$SearchableList = require("./Searchable.bs.js");
var SearchDropdown$SearchableList = require("./SearchDropdown.bs.js");

var users = Searchable$SearchableList.fromUsers([
      {
        name: "Anne"
      },
      {
        name: "Bob"
      },
      {
        name: "Tom"
      }
    ]);

ReactDom.render(React.createElement("div", undefined, React.createElement("h1", undefined, "Remote search"), React.createElement(SearchDropdown$SearchableList.RemoteSearchDropdown.make, {
              users: users
            }), React.createElement("h1", undefined, "Local search"), React.createElement(SearchDropdown$SearchableList.LocalSearchDropdown.make, {
              users: users
            })), document.body);

exports.users = users;
/* users Not a pure module */
