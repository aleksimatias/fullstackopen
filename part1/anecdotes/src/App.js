import { useState } from "react";

const OfTheDay = ({ anecdote, vote, votes, newRandom }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>

      <button onClick={vote}>vote</button>
      <button onClick={newRandom}>next anecdote</button>
    </div>
  );
};

const MostVotes = ({ topAnecdote, mostVotes }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {mostVotes ? (
        <div>
          <p>{topAnecdote}</p>
          <p>has {mostVotes} votes</p>
        </div>
      ) : (
        <p>No votes yet!</p>
      )}
    </div>
  );
};

const App = (props) => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState(Array(anecdotes.length).fill(0));

  const mostVotes = Math.max(...point);
  const topAnecdote = anecdotes[point.indexOf(mostVotes)];

  function createRandom(length) {
    return Math.floor(Math.random() * length);
  }

  const newRandom = () => {
    let randomOption = createRandom(anecdotes.length);
    while (randomOption === selected) {
      randomOption = createRandom(anecdotes.length);
    }
    setSelected(randomOption);
  };

  const vote = () => {
    const newPoint = [...point];
    newPoint[selected] += 1;
    setPoint(newPoint);
  };

  return (
    <div>
      <OfTheDay
        anecdote={anecdotes[selected]}
        votes={point[selected]}
        vote={vote}
        newRandom={newRandom}
      />
      <MostVotes topAnecdote={topAnecdote} mostVotes={mostVotes} />
    </div>
  );
};

export default App;
