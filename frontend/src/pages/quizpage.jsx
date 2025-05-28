import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

function QuizPage() {
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');

  const fetchQuestions = async () => {
    const res = await axios.post('http://localhost:5000/api/quiz', {
      score: 0,
      responseTime: 0,  // we’ll use real time tracking later
      initialDifficulty: difficulty
    });
    setQuestions(res.data.questions);
  };

  const handleAnswer = () => {
    const correct = questions[current].answer;
    if (selected === correct) {
      setScore(score + 1);
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected('');
    } else {
      alert(`Quiz Finished! Your score: ${score + (selected === correct ? 1 : 0)}/${questions.length}`);
    }
  };

  return (
    <div className="p-6">
      <div className="quiz-container flex flex-col items-center justify-center max-w-2xl mx-auto p-12 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Start Your Quiz</h2>

      {!questions.length && (
        <>
          <label className="block mb-2 font-semibold">Select Difficulty:</label>
          <select
            className="border px-4 py-2 mb-4"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">-- Choose --</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <br />
          <button
            className=" start-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={fetchQuestions}
            disabled={!difficulty}
          >
            Start Quiz
          </button>
        </>
      )}

      {questions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">
            Q{current + 1}: {questions[current].question}
          </h3>
          <div className="flex flex-col space-y-2">
            {questions[current].options.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={selected === opt}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleAnswer}
            className="submit-button"
            disabled={!selected}
          >
            Next
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default QuizPage;
