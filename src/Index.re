open SearchDropdown;

[@bs.val] external document: Js.t({..}) = "document";

let users =
  Searchable.fromUsers([|{name: "Anne"}, {name: "Bob"}, {name: "Tom"}|]);

ReactDOMRe.render(
  <div>
    <h1> {"Remote search" |> React.string} </h1>
    <RemoteSearchDropdown users />
    <h1> {"Local search" |> React.string} </h1>
    <LocalSearchDropdown users />
  </div>,
  document##body,
);
