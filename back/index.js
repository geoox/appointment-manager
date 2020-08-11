const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require('cors');
const mongoose = require('mongoose');

cors({credentials: true, origin: true})
app.use(cors());
app.options('*', cors());

const dbPassword = 'admin'
mongoose.connect('mongodb+srv://admin:' + dbPassword + '@cluster0.ubren.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

let port = process.env.PORT || 8070;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, ()=> console.log("Listening to 8070..."));