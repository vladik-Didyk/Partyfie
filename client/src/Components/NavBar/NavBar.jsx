
import React from "react"
import css from './NavBar.module.css'
import {
    Link,
  } from "react-router-dom";

  import localforage from "localforage"



const NavBar = props => {

  const signOut = async () => {
    await localforage.removeItem("userToken");
    window.location.assign("/")
  };

    return (

      <div className={css.Navbar}>
        <Link className={css.navitem} 
              to="/">
          Home
        </Link>
        <Link className={css.navitem} 
              to="/new_session">
            Create a Session
        </Link>
        <Link className={css.navitem} 
              to="/join_session">
          Join a session
        </Link>
         
      <div className={css.LogInAndSignIn}>
      <Link className={css.navitem} 
              to="/profile">
          My Profile
        </Link>
        &nbsp;&nbsp;
        <Link onClick={()=>signOut()} className={css.navitem} 
              to="/logout">
          Log Out
        </Link>
                    
                    
      </div>
      </div>
    );
  };
  export default NavBar 