import { useState } from "react";
import { questions } from "./questions.json";

const App = () => {
  const initial = Array(questions.length).fill({
    touched: false,
  });

  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers")) || initial
  );

  const [current, setCurrent] = useState(
    Number(localStorage.getItem("current")) || 0
  );

  const handleAnswer = (selected) => {
    const newAnswers = [
      ...answers.slice(0, current),
      { answer: selected, touched: true },
      ...answers.slice(current + 1),
    ];
    setAnswers(newAnswers);
    localStorage.setItem("answers", JSON.stringify(newAnswers));
  };

  const handleChange = (i) => {
    setCurrent(i);
    localStorage.setItem("current", i);
  };

  const handleSubmit = () => {
    const score = answers.filter(({ answer }) => answer).length;
    alert(`You scored ${score} out of ${questions.length}`);
    setCurrent(0);
    setAnswers(initial);
    localStorage.setItem("answers", JSON.stringify(initial));
    localStorage.setItem("current", 0);
  };

  return (
    <>
      <div className="question">
        <p
          dangerouslySetInnerHTML={{
            __html: `${current + 1}. ${questions[current].question}`,
          }}></p>
        {questions[current].options.map(({ option, correct }, i) => (
          <button
            key={i}
            dangerouslySetInnerHTML={{
              __html: `${option}`,
            }}
            className="bg-blue-500 py-2 rounded"
            onClick={() => handleAnswer(correct)}></button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {questions.map((_, i) => (
          <button
            className={`${
              answers[i].touched ? "bg-blue-500" : "bg-blue-700"
            } change-btn`}
            key={i}
            onClick={() => handleChange(i)}>
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className="bg-blue-700 m-auto px-3 py-1 rounded"
        onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default App;
