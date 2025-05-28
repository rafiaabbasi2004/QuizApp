import react from "react";
import { useState } from "react";
import './navbar.css';
import logo from '../assets/Qlogo.png'

export default function Navbar(){
    return(
        <div className="navbar-main flex flex-row">
            <div className="logo-section flex flex-row gap-1 m-0 p-2 justify-start items-center">
                <img src={logo} alt="logo" className="logo" />
                <h2 className="name-heading text-white text-left">Quizzers</h2>
            </div>

            <ul >
                <li className="listitem"><a className="anchortag" href="/">Home</a></li>
                <li className="listitem"><a className="anchortag" href="#about">About</a></li>
                <li className="listitem"><a className="anchortag" href="#footer">Help</a></li>
                <li className="listitem"><a className="anchortag" href="/quiz">Start Quiz</a></li>

            </ul>
     
         </div>
    );
}