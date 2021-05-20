import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useAuth } from "../Auth";
import { Card } from "react-bootstrap";
import axios from "axios";

function Profile() {
    const { token } = useAuth();
    const [currentUser, setCurrentUser] = useState();

    const getCurrentUser = async (token) => {
        const bearer = `Bearer ${token}`;
        const config = {
            headers: { Authorization: bearer },
        };
        const profile_api_url = "https://api.spotify.com/v1/me";
        const user = await axios.get(profile_api_url, config);
        console.log(user);
        setCurrentUser(user);
    };

    function handleOnClick() {
        window.location.href = 'https://www.spotify.com/us/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account';
    }

    useEffect(() => {
        console.log("in use effect");
        getCurrentUser(token);
    }, [token]);

    return (
        <>
            <NavBar />
            {currentUser && <div className="showcase">
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>
                            Username: {currentUser.data.display_name}
                        </Card.Title>
                        <Card.Title>
                            Spotify Profile Link: {currentUser.data.external_urls.spotify}
                        </Card.Title>
                        <Card.Text></Card.Text>
                        <button 
                        onClick={handleOnClick}>
                            Change User Details
                        </button>
                    </Card.Body>
                </Card>
            </div>}
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
}

export default Profile;
