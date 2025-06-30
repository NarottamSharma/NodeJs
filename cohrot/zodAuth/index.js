const express = require("express");
const zod = require("zod");
const app = express();

// const schema = zod.array(zod.number());

const schema = zod.object({
  email: zod.string(),
  password: zod.string(),
  country: zod.literal("IN").or(z.literal("US")),
  kidneys: zod.arrays(z.numbers()),
});

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
    return res.status(411).json({
      error: "Invalid kidneys data. Must be an array of numbers.",
    });
  } else {
    res.send({
      response
    });
  }
  //   res.send(`you have ${kidneysLength} Kidneys`)
});
app.listen(3000);


//ZOd 

function validateInput(arr){
  const schema = zod.array(zod.number);
  const response = schema.safeParse(arr)
  console.log(response);
}

validateInput([1,2,3])
