const express = require('express');
const fs = require('fs');
//handle bars module
const hbs = require('hbs');
//to deploy to heroku port need to be changed to environment
const port = process.env.PORT || 3000;
//variable app and calling express
var app = express();
//to introduce partials by giving its directory
hbs.registerPartials(__dirname + '/views/partials')
//to initialize hbs passing key and value
app.set('view engine','hbs');
//middlewhere function :to make app work in way we want,here getting text inhelp.html
app.use(express.static(__dirname + '/public'));
//creating a miidlewhere : used by defining app.used,next is use to tell middlewhere when function is done
app.use((req,res,next) => {
var now = new Date().toString();
var log=`${now}:${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n',(err) => {
  if(err){
    console.log('unable to append');
  next();
}
});
});

//creating getCurrentYear a function which can be used any where to show Date
//it takes 2 parameters --function name and another as arrow function , the return statement
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamit', (text) => {
  return text.toUpperCase();
});;
//to get the data on app
app.get('/' , (req,res) => {
//toget on home page 'welcome'
res.render('home.hbs',{
  welcome: 'WELCOME TO PAGE'
});
});

//handler:
app.get('/about',(req,res) => {
  //to render the about.hbs file and passing data as second argument
  res.render('about.hbs',{
    pageTitle:'about page'

  });
});
app.get('/bad', (req,res) => {
  res.send({
   errorMessage :('unable to handle')
});
});
//to get result on port 3000 with a message while it loads
app.listen(port,() => {
  console.log(`server is up on port ${port}`);
});
