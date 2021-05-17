import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import "./App.css";
import AuthProvider from "./Components/Auth";
import SessionPage from "./Components/SessionPage";
import './App.css';
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/NavBar/NavBar";

function AppRouter() {

    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/session">
                    <SessionPage />
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
