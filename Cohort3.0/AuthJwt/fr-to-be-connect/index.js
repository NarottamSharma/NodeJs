import express from "express";
import jwt from "jsonwebtoken";
const app = express();
const JWT_SECRET = "naro";
app.use(express.json());

const users = [];

app.post("/", (req, res) => {
    res.json({
        message: "Good",
    });
    return;
});

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

    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign(
            {
                username: username,
            },
            JWT_SECRET
        );

        // user.token = token
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
    const token = req.headers.token; // jwt
    const decodeInformation = jwt.verify(token, JWT_SECRET);
    const username = decodeInformation.username;
    const foundUser = users.find((u) => u.username === username);

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
