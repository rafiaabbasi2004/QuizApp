import react from "react";
import { useState } from "react";
import './navbar.css';
import logo from '../assets/Qlogo.png'

export default function Navbar(){
    return(
        <div className="navbar-main flex flex-row">
            <div className="logo-section flex flex-row gap-1 m-0 p-2">
                <img src={logo} alt="logo" className="logo" />
                <h2 className="name-heading text-white text-left">My Quiz APP</h2>
            </div>

            <ul >
                <li className="listitem"><a className="anchortag">Home</a></li>
                <li className="listitem"><a className="anchortag">ABout</a></li>
                <li className="listitem"><a className="anchortag">Help</a></li>
                <li className="listitem"><a className="anchortag">StartQuiz</a></li>
                <li className="listitem"><a className="anchortag">Profile</a></li>
                
            </ul>
     
         </div>
    );
}