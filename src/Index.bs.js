'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var UserSearchDropdown$SearchableList = require("./UserSearchDropdown.bs.js");

var users = [
  {
    TAG: /* User */1,
    _0: {
      name: "Bob"
    }
  },
  {
    TAG: /* User */1,
    _0: {
      name: "Tom"
    }
  }
];

ReactDom.render(React.createElement(UserSearchDropdown$SearchableList.make, {
          users: users
        }), document.body);

exports.users = users;
/*  Not a pure module */
