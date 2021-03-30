import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Todo from "./pages/Todo/Todo";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import { useGetUser } from "./hooks";

function App() {
  // eslint-disable-next-line
  const [{ user, isLoading, isError }, dispatch] = useGetUser();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/todos">
          {user ? <Todo user={user} dispatch={dispatch} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/todos" /> : <Login dispatch={dispatch}/>}
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
