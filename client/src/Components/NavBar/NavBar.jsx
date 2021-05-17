import React from "react"
import css from './NavBar.module.css'
import {
    Link,
  } from "react-router-dom";



const NavBar = props => {

  const signInOrLogInClicked = element => {
    props.setModal({...props.modal, [element.target.lang] : true})
}

    return (

      <div className={css.Navbar}>
        <Link className={css.me_3} 
              to="/">
          Home
        </Link>
        <Link className={css.me_3} 
              to="/my_music ">
          my music  
        </Link>
        <Link className={css.me_3} 
              to="/session/:id?">
          Join a session
        </Link>
        <Link className={css.me_3} 
              to="/Chat/new">
          Chat
        </Link>
        <Link className={css.me_3} 
              to="/Profile/:id?">
          Profile
        </Link>
        <Link className={css.me_3} 
              to="/Search">
          Search
        </Link>
       {/* <button className="signout">Sign out</button> */}
         
      <div className={css.LogInAndSignIn}>
       <div className="nav-item nav-link LogIn" 
                        style={{cursor:"pointer",color: "blue"}}
                        onClick={signInOrLogInClicked}
                        lang={'LogInPage'}
                        aria-current="page" 
                        >Log In
                    </div>
                    &nbsp;&nbsp;
                    <div  className="nav-item nav-link SignIn" 
                        style={{cursor:"pointer",color: "blue"}}
                        onClick={signInOrLogInClicked}
                        lang={'SignInPage'}
                        aria-current="page"
                        > Sign In
                    </div>
      </div>
      </div>
    );
  };
  export default NavBar 