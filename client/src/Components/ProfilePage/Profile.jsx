import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useAuth } from "../Auth";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Profile() {
    const { currentUser } = useAuth();
    
    return (
        <>
            <NavBar/>
             <div className="showcase">

             <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Username: {currentUser.data.display_name}</Card.Title>
    <Card.Title>Spotify Profile Link: {currentUser.data.external_urls.spotify}</Card.Title>
    <Card.Text>
    </Card.Text>
   <Link to="/changeUserDetails">Change User Details </Link>
  </Card.Body>
</Card>

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
    )
}



export default Profile;
