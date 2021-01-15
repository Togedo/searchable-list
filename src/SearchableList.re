open Searchable;
open Schema;

// module type SearchableList = {
//   type t = Searchable.t;
//   type list = array(t);
//   let renderItem: t => React.element;
//   let searchLocal: (list, string) => list;
//   let searchRemote: string => Js.Promise.t(list);
// };

module SearchableList = {
  type t = Searchable.t;
  type list = array(t);
  let renderItem = item => {
    <div> item->Searchable.render </div>;
  };
  let searchLocal = (list, query): list => {
    Belt.Array.keep(list, Searchable.query(query));
  };
  let searchRemote = (query): Js.Promise.t(list) => {
    Js.Promise.make((~resolve, ~reject) => {
      let _ =
        Js.Global.setTimeout(
          () =>
            resolve(.
              Belt.Array.keep(
                [|
                  Searchable.User({name: "Remote Bob"}),
                  Searchable.User({name: "Remote Tom"}),
                |],
                Searchable.query(query),
              ),
            ),
          400,
        );
      ();
    });
  };
};
