import Navbar from "../components/navbar";
import logo from '../assets/Qlogo.png';
import react from "react";
import './Homepage.css';
import leaderboard from '../assets/competition.png';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
export default function HomePage(){

    const navigate = useNavigate();


    return(
        <div className="homepage-main">
              <div id="home-content">
                <div className="left-text">
                    <h1 className="main-heading">Challenge your <br/> knowledge</h1>
                    <h4>Take the at quiz and prepare you exams , challenge you knoledge kkeeep the jooasbd hjhbsdna vuueafhm iuahdba  uiagfbs jakd</h4>
                    <button onClick={()=>navigate("/quiz")} className="start-button">Start quiz</button>
                </div>

                <div className="image-right">
                    <img src={logo} alt="logo" className="logo-home"/>
                </div>
            </div>





            <section id="about">
                
                <div className="about-section-main">
                    <h1>Why Choose Quizers</h1>
                   <div className="about-section">
                     <div className="about-card">
                        <img src={leaderboard} alt="card1" className="about-card-image"  />
                        <h2 className="about-card-heading">Leaderboards</h2>
                        <p className="about-card-p">checkout oue leaderboard to disocver the top scorrers in various quizzes. join the competitions and climb the ranks</p>
                    </div>

                    <div className="about-card">
                        <img src={leaderboard} alt="card1" className="about-card-image"  />
                        <h2 className="about-card-heading">Leaderboards</h2>
                        <p className="about-card-p">checkout oue leaderboard to disocver the top scorrers in various quizzes. join the competitions and climb the ranks</p>
                    </div>

                    <div className="about-card">
                        <img src={leaderboard} alt="card1" className="about-card-image"  />
                        <h2 className="about-card-heading">Leaderboards</h2>
                        <p className="about-card-p">checkout oue leaderboard to disocver the top scorrers in various quizzes. join the competitions and climb the ranks</p>
                    </div>
                   </div>
                </div>
            </section>

            <section id="footer">
                <Footer />
            </section>
         
        </div>
    );
}
