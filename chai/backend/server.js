import express from "express";
express.json();
const app = express();

// app.get("/", (req, res) => {
//   res.send("Server is ready!");
// });

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      setup: "Why do programmers prefer dark mode?",
      punchline: "Because light attracts bugs!",
      category: "programming",
    },
    {
      id: 2,
      setup: "Why did the JSON file feel so lonely?",
      punchline: "Because it was missing its pair.",
      category: "data",
    },
    {
      id: 3,
      setup: "How do you comfort a JavaScript bug?",
      punchline: "You console it.",
      category: "javascript",
    },
    {
      id: 4,
      setup: "Why did the array go out of bounds?",
      punchline: "It was trying to find its index in life.",
      category: "programming",
    },
    {
      id: 5,
      setup: "What did the JSON say to the JavaScript object?",
      punchline: '"Parse me if you can!"',
      category: "data",
    },
  ];

  res.send(jokes);
});

const port = 3000; // || process.env.PORT
app.listen(port, () => {
  console.log("Server at http://localhost: ", +port);
});
