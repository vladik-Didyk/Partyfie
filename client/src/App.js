import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import AuthProvider, { useAuth } from "./Components/Auth";
import SessionPage from "./Components/SessionPage";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/NavBar/NavBar";
import Profile from './Components/ProfilePage/Profile';

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function AppRouter() {
  let auth = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/">
          {auth.token && <> <NavBar/> <HomePage /> </> }
          {!auth.token && <HomePage />}
        </Route>

  
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/session">
                    <SessionPage />
                </Route>
                <Route exact path="/Profile">
                    <Profile />
                </Route>
            </Switch>
        </Router>
    )
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
