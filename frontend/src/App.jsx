
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import HomePage from './pages/Homepage';
import QuizPage from './pages/quizpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  

  return (
    


     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>

    // <div >
    //   <Navbar />
    //   <HomePage />
    //   <h1>AI Adaptive Quiz</h1>
    //   <button onClick={fetchQuiz}>Start Quiz</button>

    //   {level && <h2>Difficulty Level: {level}</h2>}
    //   <ul>
    //     {questions.map((q, index) => (
    //       <li key={index}>{q.question}</li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default App;
