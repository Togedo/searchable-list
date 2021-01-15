open Schema;

module Searchable = {
  type t =
    | Book(book)
    | User(user);
  let index = (item): string => {
    switch (item) {
    | Book(b) => Js.String.toLocaleLowerCase(b.name)
    | User(u) => Js.String.toLocaleLowerCase(u.name)
    };
  };
  let query = (query, item): bool => {
    Js.String.includes(query, index(item));
  };
  let id = item => {
    switch (item) {
    | Book(b) => b.name ++ "_" ++ Js.Float.toString(b.price)
    | User(u) => u.name
    };
  };
  let render = (item): React.element => {
    <div> {id(item) |> React.string} </div>;
  };
};
