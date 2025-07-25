import express from "express";
import jwt from "jsonwebtoken";
const app = express();
const JWT_SECRET = "naro";
app.use(express.json());

const users = [];

function auth(req, res, next) {
    const token = req.headers.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Token is required"
        });
    }
    
    try {
        const decodeData = jwt.verify(token, JWT_SECRET);
        if (decodeData.username) {
            req.username = decodeData.username;
            next();
        } else {
            res.status(401).json({
                message: "Invalid token"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

// Public routes (no auth required)
app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    if (users.find((u) => u.username === username)) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    users.push({
        username: username,
        password: password,
    });
    
    res.status(201).json({
        message: "User created successfully",
    });
});

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    const user = users.find(
        (u) => u.username === username && u.password === password
    );
    
    if (user) {
        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.json({
            message: "Sign in successful",
            token: token,
        });
    } else {
        res.status(401).json({
            message: "Invalid username or password",
        });
    }
});

// Protected routes (auth required)
app.post("/", auth, (req, res) => {
    res.json({
        message: "Good",
    });
});

app.get("/me", auth, (req, res) => {
    const foundUser = users.find((u) => u.username === req.username);

    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password,
        });
    } else {
        res.status(404).json({
            message: "User not found",
        });
    }
});

app.listen(3000);
