import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import CreateS from "./Components/Sessions/CreateS";
import JoinS from "./Components/Sessions/JoinS";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import AuthProvider, { useAuth } from "./Components/Auth";
import SessionPage from "./Components/SessionPage";

function AppRouter() {
    const auth = useAuth();
    return (
        <Router>
            <Route>
                {auth.token && <NavBar />}
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/session/create" component={CreateS} />
                    <Route exact path="/session/join" component={JoinS} />
                    <Route exact path="/session/:id" component={SessionPage} />
                </Switch>
            </Route>
        </Router>
    );
}

function App() {

    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}

export default App;
