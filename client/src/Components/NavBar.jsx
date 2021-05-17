import React from "react"
import {
  Link
} from "react-router-dom";

const NavBar = () => {
    return (
      <div className="Navbar">
        <Link className="me-3" to="/">
          Home
        </Link>
        <Link className="me-3" to="/mypets">
          my music 
        </Link>
        <Link className="me-3" to="/pets/:petId">
          Join a session
        </Link>
        <Link className="me-3" to="/pets/new">
          Chat
        </Link>
        <Link className="me-3" to="/Profile">
          Profile
        </Link>
        <Link className="me-3" to="/Search">
          Search
        </Link>
       <button className="signout">Sign out</button>
      </div>
    );
  };
  export default NavBar 