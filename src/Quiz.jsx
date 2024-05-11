import React, { useEffect, useRef, useState } from "react";
import data from "./assets/data";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];

  function answerHandle(e, ans) {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((score) => score + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  }
  const nextHandle = () => {
    if (lock === true) {
      if (index < data.length - 1) {
        console.log();
        setIndex((prev) => prev + 1);
        console.log(index);
        setQuestion(data[index]);
        setLock(false);
        option_array.map((option) => {
          option.current.classList.remove("correct");
          option.current.classList.remove("wrong");
        });
      } else {
        setResult(true);
      }
    }
  };
  return (
    <>
      <div className="quiz-board">
        {result === false ? (
          <>
            <div className="container">
              <ul>
                <h1>{question.question}</h1>
                <li ref={option1} onClick={(e) => answerHandle(e, 1)}>
                  {question.option1}
                </li>
                <li ref={option2} onClick={(e) => answerHandle(e, 2)}>
                  {question.option2}
                </li>
                <li ref={option3} onClick={(e) => answerHandle(e, 3)}>
                  {question.option3}
                </li>
                <li ref={option4} onClick={(e) => answerHandle(e, 4)}>
                  {question.option4}
                </li>
              </ul>
              <button onClick={nextHandle}>Next</button>
            </div>
            <h4>
              No. {index + 1} question out of {data.length} questions.
            </h4>
          </>
        ) : (
          <div class="dial">
            <h3 class="dial-value">Score is</h3>
            <h2 class="dial-title">{score}</h2>
          </div>
        )}
      </div>
    </>
  );
}
