import React from "react"
import { useEffect } from "react"
import localforage from "localforage";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar/NavBar"
import HomePage from "./Components/HomePage/HomePage";
import CreateS from "./Components/Sessions/CreateS"
import JoinS from "./Components/Sessions/JoinS"
import { BrowserRouter, Route, Switch } from "react-router-dom"


//https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123



const CLIENT_ID = "0a933f7d91e64b9096efbc218edaa4cc";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";

const SCOPES = ["user-read-currently-playing"]
const SPACE_DELIMITER = "%20"
const SCOPES_URL_PARAMS = SCOPES.join(SPACE_DELIMITER)

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHash = hash.substring(1)
  const paramsInUrl = stringAfterHash.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    console.log(currentValue)
    accumulater[key] = value;
    return accumulater
  }, {})

  return paramsSplitUp
}

function App() {
  useEffect(() => {
    if (window.location.hash) {
      const {
        access_token,
        expires_in,
        token_type

      } = getReturnedParamsFromSpotifyAuth(window.location.hash)
      console.log({ access_token })
      const saveToken = async (access_token) => {
        await localforage.setItem(access_token, expires_in, token_type);
      };
      return saveToken
    }

  });

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`
  }



  return (
    <>
      <BrowserRouter>
        <Route>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/session/create' component={CreateS} />
            <Route exact path='/session/join' component={JoinS} />
          </Switch>
        </Route>
      </BrowserRouter>
        <button className='loginToSpotifyAccount'
          onClick={handleLogin}
        > Login to Spotify
         </button>
    </>
  );
}

export default App;
