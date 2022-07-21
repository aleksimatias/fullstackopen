import { useState } from "react";

const Header = () => {
  return (
    <div>
      <h1>Give feedback</h1>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const Feedback = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <div>Good: {good}</div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
      <div>All: {all}</div>
      <div>Average: {average}</div>
      <div>Positive: {positive}</div>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const positive = (all ? (good * 100) / all : 0) + " %";
  const average = (good - bad) / all; // returns NaN if no values set

  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <Feedback
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
