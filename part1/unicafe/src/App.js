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

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h1>Statistics</h1>

      {!all ? (
        <div>No feedback given</div>
      ) : (
        <div>
          <StatisticLine text="Good" statistic={good} />
          <StatisticLine text="Neutral" statistic={neutral} />
          <StatisticLine text="Bad" statistic={bad} />
          <StatisticLine text="All" statistic={all} />
          <StatisticLine text="Average" statistic={average} />
          <StatisticLine text="Positive" statistic={positive} />
        </div>
      )}
    </div>
  );
};

const StatisticLine = ({ text, statistic }) => {
  return (
    <div>
      <p>
        {text} : {statistic}
      </p>
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
  const average = (good - bad) / all;

  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <Statistics
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
