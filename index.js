const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

const routes = require('./routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});