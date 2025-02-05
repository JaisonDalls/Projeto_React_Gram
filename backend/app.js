const express = require("express");//backend comunnication
const path = require("path");//determinate images package local
const cors = require("cors");//Frontend access to project

const port = 5000;

const app = express();

//config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, () => {
   console.log(`App rodando na porta ${port}`);
});


