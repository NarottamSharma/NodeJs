/*import express from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());

const users = [];
const JWT_SECRET = "2123";

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username: username,
        password: password,
    });
    res.json({
        message: "You are Signed up",
    });
    users.find((u) => {
        return u.username == username ? true : false;
    });
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
        res.json({
            message: "Incorrect Credentials",
        });
        return;
    } else {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({
            token: token,
        });
    }
});

app.get("/me", (req, res) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    let decodeInformation;
    try {
        decodeInformation = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const username = decodeInformation.username;
    const foundUser = users.find((u) => u.username === username);
    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password,
        });
    } else {
        res.status(401).json({
            message: "Invalid token",
        });
    }
});

app.listen(3000);*/

