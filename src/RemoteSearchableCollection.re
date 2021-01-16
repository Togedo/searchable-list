open SearchableCollection;

module RemoteSearchableCollection: SearchableCollection = {
  include SearchableCollectionCommon;
  let searchRemote = (query): Js.Promise.t(list) => {
    Js.Promise.make((~resolve, ~reject) => {
      let _ = reject;
      let _ =
        Js.Global.setTimeout(
          () =>
            resolve(.
              Belt.Array.keep(
                Searchable.fromUsers([|
                  {name: "Remote Anne"},
                  {name: "Remote Bob"},
                  {name: "Remote Tom"},
                |]),
                Searchable.query(query),
              ),
            ),
          400,
        );
      ();
    });
  };
  let search = (query, setState) => {
    LocalSearchableCollection.search(
      query,
      localSetState => {
        setState(state => {...localSetState(state), query, loading: true});
        ();
      },
    );
    let _ =
      searchRemote(query)
      |> Js.Promise.then_(remoteResults => {
           Js.Promise.resolve(
             setState(state =>
               if (state.query == query) {
                 let map: Belt.HashMap.String.t(Searchable.t) =
                   LocalSearchableCollection.asMapOfSearchable(state.found);
                 let remoteMap: Belt.HashMap.String.t(Searchable.t) =
                   asMapOfSearchable(remoteResults);
                 Belt.HashMap.String.mergeMany(
                   map,
                   Belt.HashMap.String.toArray(remoteMap),
                 );
                 {
                   ...state,
                   found:
                     Belt.SortArray.stableSortBy(
                       Belt.HashMap.String.valuesToArray(map), (a, b) =>
                       int_of_float(
                         Js.String.localeCompare(itemId(b), itemId(a)),
                       )
                     ),
                   loading: false,
                 };
               } else {
                 state;
               }
             ),
           )
         });
    ();
  };
};

include RemoteSearchableCollection;
