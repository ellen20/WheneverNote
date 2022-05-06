import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink, useParams } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Notebook from "./components/Notebook";
import Notes from "./components/Notes";
import Notebooks from "./components/Notebooks";
import Note from "./components/Note";
import Edit from "./components/Edit";
import DeleteNote from "./components/DeleteNote";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (

        <Switch>
          <Route path="/notebooks">
            <Notebooks />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/notebook/new">
            <Notebook  />
          </Route>
          <Route path="/note/:notebookId">
            <Note />
          </Route>
          <Route path="/:id/:notebookId">
            <Edit />
          </Route>
          <Route path="/delete/:id">
            <DeleteNote />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
