const express = require("express");

const app = express();
app.use(express.json())

app.post("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/sum", (req, res) => {
	const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        sum:a+b,
    })
});

app.listen(3001);