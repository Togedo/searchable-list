open Searchable;
open SearchableList;

type state = {
  found: SearchableList.list,
  loading: bool,
  query: string,
};

[@react.component]
let make = (~users) => {
  let (state, setState) =
    React.useState(() => {found: users, query: "", loading: false});
  <div>
    <input
      onChange={e => {
        let query = e->ReactEvent.Form.target##value;
        setState(_ =>
          {
            found: SearchableList.searchLocal(users, query),
            loading: true,
            query,
          }
        );
        let _ =
          Js.Promise.then_(
            results => {
              Js.Promise.resolve(
                setState(state =>
                  if (state.query == query) {
                    let hMap =
                      Belt.HashMap.String.make(
                        ~hintSize=
                          Js.Array.length(results)
                          + Js.Array.length(state.found),
                      );
                    Belt.Array.forEach(state.found, i =>
                      Belt.HashMap.String.set(hMap, Searchable.id(i), i)
                    );
                    Belt.Array.forEach(results, i =>
                      Belt.HashMap.String.set(hMap, Searchable.id(i), i)
                    );
                    {
                      ...state,
                      found:
                        Belt.SortArray.stableSortBy(
                          Belt.HashMap.String.valuesToArray(hMap), (a, b) =>
                          int_of_float(
                            Js.String.localeCompare(
                              Searchable.id(b),
                              Searchable.id(a),
                            ),
                          )
                        ),
                      loading: false,
                    };
                  } else {
                    state;
                  }
                ),
              )
            },
            SearchableList.searchRemote(query),
          );
        ();
      }}
    />
    {state.found
     |> Array.mapi((i, item) =>
          <React.Fragment key={string_of_int(i)}>
            {Searchable.render(item)}
          </React.Fragment>
        )
     |> React.array}
    {if (state.loading) {
       <div> <i> {React.string("Loading...")} </i> </div>;
     } else {
       React.null;
     }}
  </div>;
};
