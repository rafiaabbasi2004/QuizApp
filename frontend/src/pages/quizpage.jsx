import React, { useState } from 'react';
import axios from 'axios';

function QuizPage() {
  const [quizType, setQuizType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState(Array(10).fill(null));
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);



  const handleStartQuiz = async () => {
    console.log("Start Quiz button clicked. Quiz Type:", quizType);

    setQuestions(Array(10).fill(null));
    setUserAnswers(Array(10).fill(null));
    setCurrentIndex(0);
    setScore(null);
    if (quizType === 'evolved') {
      console.log("Fetching evolved quiz questions from backend...");
      const res = await axios.post('http://localhost:5000/api/quiz/bulk');
      console.log("Evolved quiz questions fetched.");
      setQuestions(res.data.questions);
    } else if (quizType === 'adaptive') {
      console.log("Fetching adaptive quiz question from backend...");
      const res = await axios.post('http://localhost:5000/api/quiz', {
        score: 0,
        responseTime: 10,
        initialDifficulty: difficulty
      });
      console.log("Adaptive quiz question fetched.");
      const firstQ = res.data.questions[0];
        setQuestions(prev => {
        const copy = [...prev];
        copy[0] = firstQ;
        return copy; // This ensures React knows it changed
        });
            }
  };

 const fetchNextAdaptiveQuestion = async () => {
  const currentScore = calculateScore(userAnswers);
  const usedQuestions = questions
    .filter(q => q !== null)
    .map(q => q.question); // Assuming question text is unique

  const res = await axios.post('http://localhost:5000/api/quiz', {
    score: currentScore,
    responseTime: 10,
    initialDifficulty: difficulty,
    usedQuestions: usedQuestions,
  });

  setQuestions(prev => {
    const copy = [...prev];
    copy[currentIndex + 1] = res.data.questions[0];
    return copy;
  });
};


  const handleOptionChange = (val) => {
    const copy = [...userAnswers];
    copy[currentIndex] = val;
    setUserAnswers(copy);
  };

  const handleNext = async () => {
    if (currentIndex < 9) {
      if (quizType === 'adaptive' && !questions[currentIndex + 1]) {
        await fetchNextAdaptiveQuestion();
      }
      setCurrentIndex(currentIndex + 1);
    } else {
      const finalScore = calculateScore(userAnswers);
      setScore(finalScore);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const calculateScore = (answers) => {
    return answers.reduce((acc, ans, i) => {
      if (questions[i]?.answer === ans) acc++;
      return acc;
    }, 0);
  };

  const handleRestart = () => {
    setQuizType('');
    setQuestions(Array(10).fill(null));
    setUserAnswers(Array(10).fill(null));
    setCurrentIndex(0);
    setScore(null);
    setDifficulty('');
  };

  return (
    <div className="p-6 max-w-2xl rounded-2xl mx-auto my-8" style={{ backgroundColor: 'rgba(79, 24, 79, 0.703)' }}>
      <h2 className="text-2xl font-bold mb-4">AI Adaptive Quiz</h2>
      {console.log("questions[0] is:", questions[0])}

      {(!questions[0] && score === null && questions.every(q => q === null)) && (

        <div className="space-y-4">
          <div>
            <label className="font-semibold">Select Quiz Type:</label>
            <select
              className="ml-2 border px-3 py-2"
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option value="">-- Choose --</option>
              <option value="adaptive">Adaptive (Fuzzy Logic)</option>
              <option value="evolved">Evolved (Genetic Algorithm)</option>
            </select>
          </div>

          {quizType === 'adaptive' && (
            <div>
              <label className="font-semibold">Initial Difficulty:</label>
              <select
                className="ml-2 border px-3 py-2"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">-- Choose --</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          )}

          <button
            onClick={handleStartQuiz}
            disabled={!quizType || (quizType === 'adaptive' && !difficulty)}
            className="start-button bg-green-500 text-white px-4 py-2 rounded"
          >
            Start Quiz
          </button>
        </div>
      )}
      

      {questions[currentIndex] && score === null && (
        <div className="mt-6 space-y-4">
          <p className="font-semibold">
            Q{currentIndex + 1}: {questions[currentIndex].question}
          </p>
          <div className="flex flex-col space-y-2">
            {questions[currentIndex].options.map((opt, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={userAnswers[currentIndex] === opt}
                  onChange={() => handleOptionChange(opt)}
                />{' '}
                {opt}
              </label>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="submit-button"
            >
              Previous
            </button>
            {currentIndex < 9 ? (
              <button
                onClick={handleNext}
                disabled={!userAnswers[currentIndex]}
                className="submit-button bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="submit-button bg-purple-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}

      {score !== null && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-green-600">
            🎉 Your Score: {score}/10
          </h3>
          <button
            onClick={handleRestart}
            className="start-button mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Start Again
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
