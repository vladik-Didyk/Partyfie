import React from "react";
import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import "./App.css";
import AuthProvider, { useAuth } from "./Components/Auth";
import SessionPage from "./Components/SessionPage";
import './App.css';

const CLIENT_ID = "0a933f7d91e64b9096efbc218edaa4cc";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";

const SCOPES = ["user-read-currently-playing"];
const SPACE_DELIMITER = "%20";
const SCOPES_URL_PARAMS = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHash = hash.substring(1);
    const paramsInUrl = stringAfterHash.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});

    return paramsSplitUp;
};

function Homepage() {
    const { token, saveToken } = useAuth();
    console.log(token);
    console.log(saveToken);

    useEffect(() => {
        async function getToken() {
            if (window.location.hash) {
                const { access_token } = getReturnedParamsFromSpotifyAuth(window.location.hash);
                await saveToken(access_token);
            }
        }
        getToken();
    });

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`;
    };

    return (
        <div className="login_form">
            <h1>hi</h1>
            <button className="loginToSpotifyAccount" onClick={handleLogin}>
                Login to Spotify
            </button>
        </div>
    );
}

function AppRouter() {
    const { token } = useAuth();
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {token && <Redirect exact to="/session"/>}
                    {!token && <Homepage />}
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
