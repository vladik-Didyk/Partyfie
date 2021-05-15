import React, {useState} from 'react'
import NavBar from './NavBar/NavBar'
import SignInPage from './Authorization/SignInPage/SignInPage'
import LogInPage from './Authorization/LogInPage/LogInPage'
import Modal from 'react-modal'
import HomePage from './Container_HomePage/HomePage'
import QueueMusic_Container from './Container_HomePage/QueueMusic/QueueMusic_Contanier'
import {
  Switch,
  Route,
} from "react-router-dom";



const modalIsOpen = {
  SignInPage: false,
  LogInPage: false
}

const style = {
  content: {
    backgroundColor: 'transparent',
    border: 'none',
  }
}


const Container = props => {

  const [modal, setModal] = useState(modalIsOpen)
  // const [user, setUser] = useState(null)
  // const [dataFromServer, setDataFromServer] = useState(null)


//! Logic for server - don't touch  
  //       <NavBar 
  //         modal={modalIsOpen}
  //         setModal={setModal} 
  //         user={user}
  //         dataFromServer={dataFromServer}
  //         setDataFromServer={setDataFromServer}
  //         setUser={setUser}
  //        />


  return <>
    <NavBar
     modal={modalIsOpen}
     setModal={setModal} 
    />

<Modal style={style}
            isOpen={modal.SignInPage}
            ariaHideApp={false}>
          <SignInPage modal={modalIsOpen}
            setModal={setModal}
            LogInPage={setModal} />

        </Modal>
        <Modal style={style}
            isOpen={modal.LogInPage}
            ariaHideApp={false}>
          <LogInPage 
            modal={modalIsOpen}
            setModal={setModal}
            // setDataFromServer={setDataFromServer}
          />

        </Modal>
    <Switch>
    <Route  exact 
            path="/" 
            component={HomePage} />
    <Route  path="/my_music" 
            component={'my_music'} />
    
    </Switch>

    </>

  }



export default Container