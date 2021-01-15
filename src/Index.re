open Searchable;
open Schema;

[@bs.val] external document: Js.t({..}) = "document";

let users = [|Searchable.User({name: "Bob"}), User({name: "Tom"})|];

ReactDOMRe.render(<UserSearchDropdown users />, document##body);
