// import React from "react";
import robot from './../../assest/images/robot.png';
import investlogogo from './../../assest/images/investlogogo.png';
import { Link } from 'react-router-dom' ;

function NavBar(){
    return(
        <div className="hero_area" >
        <div className="header_section">
  <div className="header_left">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="logogo"><a href="index.html"><img src={investlogogo} /></a></div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="index.html">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="about.html">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="services.html">Services</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="team.html">Team</a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" href="contact.html">Contact</a>
          </li>

          {/* <li className="nav-item">
            <a className="nav-link" href="contact.html">Login/SignUp</a>
          </li> */}

            <li className="nav-item">
              <a className="nav-link"><Link to="/login" style={{color:"black", textDecoration:"none"}}>Login</Link></a>
            </li>

            <li className="nav-item">
              <a className="nav-link"><Link to="/register" style={{color:"black", textDecoration:"none"}}>Register</Link></a>
            </li>
        </ul>
      </div>
    </nav>
    <div className="banner_main">   
      <h1 className="banner_taital">financial <br/>Service</h1>
      <p className="banner_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever </p>
      <div className="btn_main">
        <div className="more_bt"><a href="#">Read More </a></div>
        <div className="contact_bt"><a href="#">Contact Us</a></div>
      </div>
    </div>
  </div>
  <div className="header_right">
    <img src={robot} className="banner_img" />
  </div>
</div>
       
    {/* <div classNameName="slider">
            <Slider/>
    </div> */}

    </div>
    )
}

export default NavBar;