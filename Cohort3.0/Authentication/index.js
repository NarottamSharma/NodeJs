import express from "express";
const app = express();
app.use(express.json());

const users = [];

app.post("/", (req, res) => {
  res.json({
    message: "Good",
  });
  return;
});

function generateToken() {
  let options =
    "a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ");

  let token = "";
  for (let i = 0; i < 36; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((u) => u.username === username)) {
    res.json({
      message: "You already have account, Please Sign in",
    });
    return;
  }

  users.push({
    username: username,
    password: password,
  });
  res.status(201).json({
    message: "User created successfully",
  });
  // Avoid logging sensitive user information
  console.log(users);
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = generateToken();
    user.token = token;
    res.json({
      message: "Sign in successful",
      token: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or Password",
    });
  }
  console.log(users);
});

// GET /me
// Expects: 'token' in request headers
// Returns: { username, password } if token is valid, otherwise { message: "Invalid token" }
app.get("/me", (req, res) => {
  const token = req.headers.token;
  const foundUser = users.find((u) => u.token === token);

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "Invalid token",
    });
  }
});

app.listen(3000);
