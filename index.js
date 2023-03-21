const app = require("./app");



app.get("/", (req, res) => {
    res.send("WELCOME TO QVF FARMS");
});

port = process.env.port

app.listen(port, ()=>{
    console.log(`Server runing on localhost:${port}`);
})