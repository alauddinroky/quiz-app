import React, { useRef, useState } from "react";
import data from "./assets/data";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);

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
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  }
  function nextHandle() {
    setIndex((index) => ++index);
    setQuestion(data[index]);
  }
  return (
    <>
      <div className="quiz-board">
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
          <button onClick={() => nextHandle()}>Next</button>
        </div>
        <h4>
          No. {index + 1} question out of {data.length} questions.
        </h4>
      </div>
    </>
  );
}
