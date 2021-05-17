import React from 'react'
import './HomeCss.css'

const HomePage = props => {

      return (
            <>
                  <div className='showcase'>
                        <div className='showcase-container'>
                              <h2>Partyfie</h2>
                              <p>
                              Create playlists and share your best musics 
                              </p>
                        </div>
                  </div>
                  <footer className='footer'>
                        <div className='footer-content'>
                              <img src='logo '/> 
                              <ul className='footer-menu'>
                                    <li className='footer-menu-item'>About</li>
                                    <li className='footer-menu-item'>Artists</li>
                                    <li className='footer-menu-item'>App</li>
                                    <li className='footer-menu-item'>WebPayer</li>


                              </ul>
                              {/* <ul className='footer-menu'>
                                    


                              </ul> */}
                             
                        <div className="socials">
                              <i className="fab fa-instagram"></i>
                              <i className="fab fa-facebook"></i>
                              <i className="fab fa-twitter"></i>
                        </div>
                        </div>
                        <div className="footer-bar">2021 Partyfie &copy;  </div>
                  </footer>
            </>
      )

}

export default HomePage