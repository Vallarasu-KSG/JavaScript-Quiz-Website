import React, { useState, useEffect } from "react";
import "./Home.css";

const questions = [
  {
    question: "1. What is JavaScript?",
    answers: [
      { text: "A markup language", correct: false },
      { text: "A styling language", correct: false },
      { text: "A programming language", correct: true },
      { text: "A database", correct: false }
    ]
  },
  {
    question: "2. Which company developed JavaScript?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Netscape", correct: true },
      { text: "Google", correct: false },
      { text: "Apple", correct: false }
    ]
  },
  {
    question: "3. Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "<!--", correct: false },
      { text: "#", correct: false },
      { text: "**", correct: false }
    ]
  },
  {
    question: "4. How do you declare a variable in JavaScript?",
    answers: [
      { text: "int x = 5;", correct: false },
      { text: "let x = 5;", correct: true },
      { text: "var: x = 5;", correct: false },
      { text: "x := 5;", correct: false }
    ]
  },
  {
    question: "5. Which method is used to write content to the browser in JavaScript?",
    answers: [
      { text: "console.log()", correct: false },
      { text: "window.print()", correct: false },
      { text: "document.write()", correct: true },
      { text: "alert()", correct: false }
    ]
  },
  {
    question: "6. Which of the following is a JavaScript data type?",
    answers: [
      { text: "String", correct: true },
      { text: "Float", correct: false },
      { text: "Decimal", correct: false },
      { text: "Character", correct: false }
    ]
  },
  {
    question: "7. What is the result of 2 + '2' in JavaScript?",
    answers: [
      { text: "4", correct: false },
      { text: "'4'", correct: false },
      { text: "'22'", correct: true },
      { text: "NaN", correct: false }
    ]
  },
  {
    question: "8. Which keyword is used to define a function in JavaScript?",
    answers: [
      { text: "func", correct: false },
      { text: "function", correct: true },
      { text: "define", correct: false },
      { text: "def", correct: false }
    ]
  },
  {
    question: "9. Which object is used to perform mathematical operations in JavaScript?",
    answers: [
      { text: "Math", correct: true },
      { text: "Calc", correct: false },
      { text: "Number", correct: false },
      { text: "Compute", correct: false }
    ]
  },
  {
    question: "10. Which method converts JSON data to a JavaScript object?",
    answers: [
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.convert()", correct: false },
      { text: "JSON.toObject()", correct: false }
    ]
  }
];

function Home() {
  const [welcome, setWelcome] = useState(true); 
  const [countdown, setCountdown] = useState(null); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (isCorrect, index) => {
    setSelected(index);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setSelected(null);
    setWelcome(true); 
    setCountdown(null);
  };

  const handleStartQuiz = () => {
    setCountdown(3); // start countdown
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setWelcome(false); // start quiz
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <>
      {/* 🔹 Welcome Screen */}
      {welcome ? (
        <div className="welcome-screen">
          <div className="welcome-content">
            {countdown === null ? (
              <>
                <div className="welcome-icon">❓</div>
                <h1>Welcome to Quiz App</h1>
                <p>Test your JavaScript skills 🚀</p>
                <button className="start-btn" onClick={handleStartQuiz}>
                  Start Quiz
                </button>
              </>
            ) : (
              <h1 className="countdown">{countdown === 0 ? "Go!" : countdown}</h1>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <h1>JavaScript Quiz</h1>

          {showScore ? (
            <div className="score-section">
              <h2>🎉 Quiz Completed!</h2>
              <p>
                Your score: {score} / {questions.length}
              </p>
              <button className="btn" onClick={handleRestart}>
                Restart
              </button>
            </div>
          ) : (
            <div className="quiz">
              <h2>{currentQuestion.question}</h2>
              <div className="answers">
                {currentQuestion.answers.map((answer, index) => (
                  <button
                    key={index}
                    className={`btn 
                      ${selected !== null && answer.correct ? "correct" : ""}
                      ${selected === index && !answer.correct ? "wrong" : ""}`}
                    onClick={() => handleAnswerClick(answer.correct, index)}
                    disabled={selected !== null}
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
              {selected !== null && (
                <button className="next-btn" onClick={handleNext}>
                  {currentQuestionIndex + 1 === questions.length
                    ? "Finish"
                    : "Next"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
