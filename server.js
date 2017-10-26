const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/partials'); //enables partials
app.set('view engine', 'hbs'); //set viewengine
app.use(express.static(__dirname+'/public')); //__dirname = path to project folder, express middleware function

app.use((req, res, next)=>{ //middleware function, next(); will tell the app to runand continue, if next is not called the rest of the code will never run
  var now = new Date().toString();
  var log = (`${now}: ${req.method}, ${req.url}`);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next)=>{ //middleware
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/', (req, res)=>{
  // res.send('<h1>Hello Express!.</h1>');
  res.send({
    name : 'Ugur Tamer',
    age : 33,
    favFood : 'manti',
    numKids : 2,
    likes : [
      'Biking',
      'Fitness',
      'NodeJs'
    ]
  })
})

app.get('/about', (req, res)=>{
  //res.send('<h1>About Page</h1>'); //localhost:3000/about
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.get('/home', (reg, res)=>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcome: 'Welcome to some website, have funlooking around, this string is injected via express.hbs npm, these libraries can be found at epressjs.com and npm.js'
  })
})

//challenge route /bad with an errorMessage
app.get('/bad', (req, res)=>{
  res.send({
    errorMessage : 'bad request'
  })
})

app.listen(port, ()=>{
  console.log(`server is up at port ${port}`)
}); // port 3000. to access on web browser type localhost:3000.
