import express from "express";
const app = express();
const port = process.env.port || 4000;

//midleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send({
        sucess: true,
        message: "Server is working!",
        endpoint: "/"
    })
})

app.get("/get", (req, res) => {
    res.send({
        sucess: true,
        message: "Hi!",
        endpoint: "/get"
    })
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});