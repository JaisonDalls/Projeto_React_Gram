require("dotenv").config();
const express = require("express");//backend comunnication
const path = require("path");//determinate images package local
const cors = require("cors");//Frontend access to project

const port = process.env.PORT;

const app = express();

//config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//solve cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//upload images 
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//DB connection
require('./config/db.js');

//routes
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
   console.log(`App rodando na porta ${port}`);
});


