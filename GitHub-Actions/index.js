import express from "express";

const app = express();

app.get("/", (req, res) => {
    return res.json({ message: "Hello from the server :D" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});