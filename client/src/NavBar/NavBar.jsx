import React from "react"
import css from './NavBar.module.css'
import {
    Link,
  } from "react-router-dom";



const NavBar = props => {

    return (

      <div className={css.Navbar} >
        <Link className={css.navitem} 
              to="/">
          Home
        </Link>
        <Link className={css.navitem} 
              to="/session/create">
            Create a Session
        </Link>
        <Link className={css.navitem} 
              to="/session/join">
          Join a session
        </Link>
         
      <div className={css.LogInAndSignIn}>
      <Link className={css.navitem} 
              to="/profile">
          My Profile
        </Link>
        &nbsp;&nbsp;
        <Link className={css.navitem} 
              to="/logout">
          Log Out
        </Link>
                    
                    
      </div>
      </div>
    );
  };
  export default NavBar 
