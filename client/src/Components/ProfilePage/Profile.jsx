import React from 'react';
import NavBar from '../NavBar/NavBar';




function Profile() {
    return (
        <>
            <NavBar/>
             <div className="showcase">

<table className="tg">
<thead>
  <tr>
    <th className="tg-biwy">Username</th>
    <th className="tg-p1dc"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td className="tg-p1dc">Spotify Link</td>
    <td className="tg-p1dc"></td>
  </tr>
  <tr>
    <td className="tg-p1dc">User Detail I:</td>
    <td className="tg-p1dc"></td>
  </tr>
  <tr>
    <td className="tg-p1dc">User Detail II:</td>
    <td className="tg-p1dc"></td>
  </tr>
</tbody>
</table>



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
