type t = Searchable.t;
type list = array(t);
type state = {
  query: string,
  cache: list,
  found: list,
  loading: bool,
};
let initialState = cache => {query: "", cache, found: [||], loading: false};
let forEach = (list, fn) => Belt.Array.forEach(list, fn);
let length = Belt.Array.length;
let itemId = item => {
  Searchable.id(item);
};
let renderItem = item => {
  <div> item->Searchable.render </div>;
};
let render = list =>
  list
  |> Array.mapi((i, item) =>
       <React.Fragment key={string_of_int(i)}>
         {renderItem(item)}
       </React.Fragment>
     )
  |> React.array;
let asMapOfSearchable = list => {
  let hMap = Belt.HashMap.String.make(~hintSize=Js.Array.length(list));
  forEach(list, i => Belt.HashMap.String.set(hMap, itemId(i), i));
  hMap;
};
