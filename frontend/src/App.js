import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink, useParams } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NotebookModal from "./components/NotebookModal";
import Notebook from "./components/Notebook";
import Notes from "./components/Notes";
import Notebooks from "./components/Notebooks";
import Note from "./components/Note";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="note-notebook-links">
        <ul>
          <li><NavLink to='/notes' >Show Notes</NavLink></li>
          <li><NavLink to='/notebook/new' >Create Notebook</NavLink></li>
          <li><NavLink to='/notebooks' >Show Notebooks</NavLink></li>
          <li><NavLink to='/note/new' >Create Note</NavLink></li>
        </ul>

      </div>
        <Switch>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/notebook/new">
            <Notebook  />
          </Route>
          <Route path="/notebooks">
            <Notebooks />
          </Route>
          <Route path="/note/new">
            <Note />
          </Route>
        </Switch>

    </>
  );
}

export default App;
