import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:3000/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <h1>Full stack</h1>
      <p>JOKES: {jokes.length} </p>
      {jokes.map((joke) => (
        <div>
          key={joke.id}
          <h3>{joke.setup} </h3>
          <p>{joke.punchline} </p>
        </div>
      ))}
    </>
  );
}

export default App;
