const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const{v4:uuidv4} = require('uuid');

const router = require('./router');
const nocache = require('nocache');
const app = express();

const port = process.env.PORT || 3000;
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs')

  // LOAD STATIC ASSETS
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(nocache())

app.use(session({
  secret:uuidv4(),
  resave:false,
  saveUninitialized:true
}));

app.use('/route',router)


 // Home Rout
app.get('/',(req,res)=>{
  req.session.error=""
  if(!req.session.user)  {  
res.render('base',); 
}else{
  res.redirect('/route/dashboard')
}
}) ;

app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000 ")})