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
                    <h4>Welcome to the future of learning. Take intelligent quizzes, improve with every question, and compete to become a top scorer.
Let AI guide your journey with personalized questions tailored to your performance.</h4>
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
                        <h2 className="about-card-heading text-2xl font-medium">Track Your Progress</h2>
                        <p className="about-card-p">Keep an eye on your standing and performance.
                            Join ongoing challenges, monitor your growth, and move up with every quiz you take.</p>
                    </div>

                    <div className="about-card">
                        <img src={leaderboard} alt="card1" className="about-card-image"  />
                        <h2 className="about-card-heading">Top Performers</h2>
                        <p className="about-card-p">Explore our leaderboard to find the highest scorers from all quizzes.
                            Compete, improve, and rise through the ranks to see your name at the top!</p>
                    </div>

                    <div className="about-card">
                        <img src={leaderboard} alt="card1" className="about-card-image"  />
                        <h2 className="about-card-heading">Challenge the Best</h2>
                        <p className="about-card-p">Think you can beat the best?
Take on top scorers in our quizzes, climb the leaderboard, and earn your spot among the elite.

</p>
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
