module type SearchableCollection = {
  type t = SearchableCollectionCommon.t;
  type list = SearchableCollectionCommon.list;
  type state = SearchableCollectionCommon.state;
  let initialState: list => state;
  let render: list => React.element;
  let search: (string, (state => state) => unit) => unit;
  let asMapOfSearchable: list => Belt.HashMap.String.t(Searchable.t);
};
