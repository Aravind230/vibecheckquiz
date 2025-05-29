import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import questions from "./Questions";

export default function VibeCheckQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const selectOption = (vibe) => {
    const newAnswers = [...answers, vibe];
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers) => {
    const count = {};
    answers.forEach((v) => (count[v] = (count[v] || 0) + 1));
    const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
    setResult(sorted[0][0]);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-body">
          {result ? (
            <div className="text-center">
              <h2 className="h4">You are a {result}!</h2>
              <p>
                {result === "Zen Founder" &&
                  "Calm, focused, and grounded in chaos."}
                {result === "Meme Magician" &&
                  "Viral, funny, and culturally fluent."}
                {result === "Chaos Coder" &&
                  "Fast, fearless, creatively chaotic."}
                {result === "Vibe Designer" &&
                  "You code with beauty and feeling."}
              </p>
              <button className="btn btn-primary" onClick={resetQuiz}>
                Retake Quiz
              </button>
            </div>
          ) : (
            <div>
              <h5 className="mb-3">
                Question {step + 1} of {questions.length}
              </h5>
              <p className="lead">{questions[step].text}</p>
              <div className="d-grid gap-2">
                {questions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    className="btn btn-outline-secondary text-start"
                    onClick={() => selectOption(opt.vibe)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
