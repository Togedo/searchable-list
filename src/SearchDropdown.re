open SearchableCollectionCommon;

module SearchDropdown = (SC: SearchableCollection.SearchableCollection) => {
  module SC = SC;

  [@react.component]
  let make = (~users) => {
    let (state, setState) = React.useState(() => SC.initialState(users));
    <div>
      <input
        onChange={e => {
          let query = e->ReactEvent.Form.target##value;
          let query = Js.String.toLocaleLowerCase(query);
          SC.search(query, setState);
          ();
        }}
      />
      {SC.render(state.found)}
      {if (state.loading) {
         <div> <i> {React.string("Loading...")} </i> </div>;
       } else {
         React.null;
       }}
    </div>;
  };
};

module LocalSearchDropdown = SearchDropdown(LocalSearchableCollection);
module RemoteSearchDropdown = SearchDropdown(RemoteSearchableCollection);
