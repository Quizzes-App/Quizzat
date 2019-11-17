var express = require("express");
var cors = require("cors");
var app = express();
const DB = require('./db');
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json(`server working`);
})








// USERS

// REGISTER USERS - ABEER & MOHAMMAD
app.post("/registerUser", (req, res) => {
  DB.registerUser(user => {
    res.json(user);
  }, req.body);

});


// LOGIN
app.post("/login", (req, res) => {
  DB.login(user => {
    res.json(user)
  }, req.body)
})

// GET ALL USERS - MOHAMMAD
app.get(`/getUsers`, (req, res) => {
  DB.getUsers(users => res.json(users));
});


// GET LOGGED IN USER - MOHAMMAD
app.post(`/getLoggedInUser`, (req, res) => {
  // console.log( "ID IN SERVER", req)
  DB.getLoggedInUser(user => {
    res.json(user)
  }, req.body);
});


// UPDATA USER - MOHAMMAD 
app.post(`/updateUser`, (req, res) => {
  DB.updateUser(user => {
    res.json(user)
  }, req)
});




// getCurrentInfo
app.get('/getCurrentInfo', (req, res) => {
  DB.getCurrentInfo(info => res.json(info))
})



// updateCurrentInfo
app.put('/updateCurrentInfo', (req, res) => {
  DB.updateCurrentInfo(info => {
    res.json(info)
  }, req.body)
})


// updateCurrentInfo
app.put('/skip', (req, res) => {
  DB.skip(info => {
    res.json(info)
  }, req.body)
})


// logout
app.put("/logout", (req, res) => {
  DB.logout(logout=>res.json(logout))
})









// QUSERIONS

// INSERT QUESTIONS - ABEER & MOHAMMAD
app.post("/insertQuestion", (req, res) => {
  DB.insertQuestion(question => {
    res.json(question);
  }, req.body);

});


// GETQUESTIONS
app.post('/getQuestions', (req, res) => {
  DB.getQuestions(questions => {
    res.json(questions);
  }, req.body);
})


// VALIDATEANSWER

app.post('/validateAnswer', (req, res) => {
  DB.validateAnswer(result => {
    res.json(result)
  }, req.body)
})


//  LEVEL COMPLETE
app.post('/levelComplete', (req, res) => {
  DB.levelComplete(level => {
    res.json(level)
  }, req.body)
})




//SOTRE

// GET STORE ITEMS
app.get("/getStoreItems", (req, res) => {

  DB.getStoreItems(items => res.json(items)
  )
})


// BUY ITEM
app.post('/updateOwenedItes', (req, res) => {
  // console.log("BUY IN SERVER", req.body)
  DB.updateOwenedItes(item => res.json(item)
    , req.body)
})




var port = process.env.PORT || 9000;
app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
