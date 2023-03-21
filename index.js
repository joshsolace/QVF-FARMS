const app = require("./app");


port = process.env.port


app.listen(port, ()=>{
    console.log(`Server runing on localhost:${port}`);
})