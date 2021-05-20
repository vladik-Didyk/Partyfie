import React, { useEffect } from "react";
import { useAuth } from "../Auth";
import "./HomeCss.css";

const HomePage = (props) => {

    const { token, saveToken } = useAuth();

    const CLIENT_ID = "0a933f7d91e64b9096efbc218edaa4cc";
    const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000";
    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";

    const SCOPES = ["streaming", "user-read-playback-state", "user-modify-playback-state", "user-read-email", "user-read-private", "user-library-read", "user-library-modify"];
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

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`
    }

    useEffect(() => {
        async function getToken() {
            if (window.location.hash) {
                const { access_token } = getReturnedParamsFromSpotifyAuth(window.location.hash);
                await saveToken(access_token);
            }
        }
        getToken();
        console.log(token);
    });
    let auth = useAuth();

    return (
        <>
            <div className="showcase">
                <div className="showcase-container">
                    <h2>Partyfie</h2>
                    {!token && <button  className='loginToSpotifyAccount' 
                        onClick={handleLogin}
                        > Login to Spotify 
                    </button>}
                    <p>Create playlists and share your best musics</p>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-content">
                    {/* <img src='logo '/>  */}
                    <ul className="footer-menu">
                        <li className="footer-menu-item">About</li>
                        <li className="footer-menu-item">Artists</li>
                        <li className="footer-menu-item">App</li>
                        <li className="footer-menu-item">WebPayer</li>
                    </ul>
                    <div className="socials">
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
                <div className="footer-bar">2021 Partyfie &copy; </div>
            </footer>
        </>
    );
};

export default HomePage;
