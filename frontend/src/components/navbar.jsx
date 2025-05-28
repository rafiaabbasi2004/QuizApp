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
                <li className="listitem"><a className="anchortag" href="/">Home</a></li>
                <li className="listitem"><a className="anchortag" href="#about">ABout</a></li>
                <li className="listitem"><a className="anchortag" href="#footer">Help</a></li>
                <li className="listitem"><a className="anchortag" href="/quiz">StartQuiz</a></li>
                
            </ul>
     
         </div>
    );
}