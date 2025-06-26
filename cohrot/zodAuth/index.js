const express = require("express");
const zod = require("zod");
const app = express();

const schema = zod.array(zod.number());

// middlewear
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hi Narottam</h1>");
});

 app.post("/health-checkup", (req, res) => {
  // Check if kidneys exists in the request body

  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);

  // Handle validation error
  if (!response.success) {
    return res.status(400).json({ 
      error: "Invalid kidneys data. Must be an array of numbers." 
    });
  }

  const kidneysLength = kidneys.length;
  res.send({
    response
  });
  //   res.send(`you have ${kidneysLength} Kidneys`)
});
app.listen(3000);
