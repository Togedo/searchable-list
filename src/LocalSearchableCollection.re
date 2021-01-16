open SearchableCollection;

module LocalSearchableCollection: SearchableCollection = {
  include SearchableCollectionCommon;
  let search = (query, setState) =>
    setState(state =>
      {
        ...state,
        found: Belt.Array.keep(state.cache, Searchable.query(query)),
        loading: false,
      }
    );
};

include LocalSearchableCollection;
