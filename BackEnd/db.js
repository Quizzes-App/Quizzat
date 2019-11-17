
const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/QuizeApp', { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", function () {
    console.log("mongoose connection error");
    console.log("________________________________________");
});
db.once("open", function () {
    console.log("mongoose connected successfully");
    console.log("________________________________________");
});
const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    score: Number,
    gold: Number,
    hint: Number,
    extraLife: Number
})

const Question = new mongoose.Schema({
    field: String,
    question: String,
    answers: {
        option1: String,
        option2: String,
        option3: String,
        option4: String,
    },
    correctIndex: String
})

const StoreItems = new mongoose.Schema({
    name: String,
    cost: Number
});
const CurrentUser = new mongoose.Schema({
    currentId: String,
    status: String
});

let Users = mongoose.model("Users", User)
let Questions = mongoose.model("Questions", Question)
let Store = mongoose.model("Store", StoreItems)
let CurrentUsers = mongoose.model("Current", CurrentUser)


// USERS

// REGISTER USER - ABEER & MOHAMMAD
let registerUser = (cb, obj) => {
    Users.create(obj, (err, doc) => {
        if (err) {
            console.log("ERR:", err);
        }
        else {
            cb(doc)
        }
    })
}

// LOGIN
const login = (sendUser, obj) => {
    let email = obj.email
    let password = obj.password
    Users.findOne(
        { email },
        (err, doc) => {
            if (err) {
                console.log("ERROR : ", err)
            }
            else if (doc == null) {
                sendUser(null)
            }
            else if (password == doc.password) {
                sendUser(doc)
            }
            else {
                sendUser(null)
            }

        }
    )
}

// SHOW USERS - MOHAMMAD 
const getUsers = sendUsers => {
    Users.find({}, { password: 0 }, (err, docs) => {
        if (err) {
            console.log("ERR:", err);
        }
        else {
            sendUsers(docs);
        }
    }).sort({ score: -1 })
};


// getCurrentInfo
// const getCurrentInfo = sendID => {
//     CurrentUsers.findOne(
//         { _id: "5dca8234c61fb08cf20021ad" },
//         (err, doc) => {
//             if (err) {
//                 console.log("ERR:", err);
//             }
//             else {
//                 sendID(doc);
//             }
//         }
//     )
// }


// GET LOGGED IN USER - MOHAMMAD
const getLoggedInUser = (sendUser, obj) => {
    let _id = obj
    console.log("ID IN DATABASE ", obj._id)
    Users.findOne({ _id }, { password: 0 }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log("User:", doc)
            sendUser(doc);
        }
    })
};

// UPDATE CURRENT USER
const updateCurrentInfo = (user, obj) => {
    let currentId = obj.currentID
    let status = obj.status
    console.log('Current User abeer : ', obj)
    CurrentUsers.updateOne(
        { _id: "5dca8234c61fb08cf20021ad" },
        { $set: { currentId, status } },
        (err, doc) => {
            if (err) {
                console.log("ERROR : ", err)
            }
            else {
                user(doc)
            }
        }
    )
}



// UPDATE CURRENT USER
const skip = (user, obj) => {
    let currentId = obj.currentID
    let status = obj.status
    console.log('Current User abeer : ', obj)
    CurrentUsers.updateOne(
        { _id: "5dca8234c61fb08cf20021ad" },
        { $set: { currentId, status } },
        (err, doc) => {
            if (err) {
                console.log("ERROR : ", err)
            }
            else {
                user(doc)
            }
        }
    )
}


// logout
const logout = sendLogout => {
    console.log("logout")
    CurrentUsers.updateOne(
        { _id: "5dca8234c61fb08cf20021ad" },
        { $set: { currentId: null, status: "no" } },
        (err, doc) => {
            if (err) {
                console.log("ERROR : ", err)
            }
            else {
                sendLogout(doc)
            }
        }
    )
}

// UPDATE USER - MOHAMMAD
const updateUser = (sendUser, user) => {
    let _id = user.body._id
    let name = user.body.name
    let email = user.body.email
    Users.updateOne(
        { _id },
        { $set: { name, email } },
        (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                sendUser(doc);
            }
        }
    );
};





// getCurrentInfo
const getCurrentInfo = info => {
    CurrentUsers.findOne(
        { _id: "5dca8234c61fb08cf20021ad" },
        (err, doc) => {
            if (err) {
                console.log("ERRO : ", err)
            }
            else {
                info(doc)
            }
        }
    )
}










//QUESTIONS



// GET QUESTIONS
const getQuestions = (sendQuestions, obj) => {
    let field = obj.field
    Questions.find({ field }
        , (err, docs) => {
            if (err) {
                console.log("ERROR: ", err)
            }
            else {
                sendQuestions(docs)
            }
        }
    )
}

// VALIDATEANSWER
const validateAnswer = (sendResult, obj) => {
    let _id = obj._id
    Users.updateOne(
        { _id }, { gold: obj.gold + 1, }, (err, doc) => {
            if (err) {
                console.log("ERROR: ", err)
            }
            else {
                sendResult(doc)
            }
        }
    )
}


// LEVEL COMPLETE

const levelComplete = (level, obj) => {
    let _id = obj._id
    let score = obj.score
    console.log('LEVEL COMPLETE')
    console.log("ID : ", _id, "SCORE : ", score)
    Users.updateOne(
        { _id },
        { score: score + 200 }, (err, doc) => {
            if (err) {
                console.log('ERROR :', err)
            }
            else {
                level(doc)
            }
        }
    )
}




// STORE

// GET SOTRE ITEMS
const getStoreItems = sendStoreItems => {
    Store.find({}, (err, docs) => {
        // console.log("IN DATA  BASE", docs)
        if (err) {
            console.log("ERR:", err);
        }
        else {
            sendStoreItems(docs);
        }
    });
};



// BUY ITEM 
const updateOwenedItes = (sendItem, obj) => {
    // console.log("BUY ITEM IN DB", obj)
    let _id = obj._id
    let goldAfterBuy = obj.goldAfterBuy
    let itemName = obj.itemName
    let hintHave = obj.hintHave
    let extraLifeHave = obj.extraLifeHave
    console.log(_id, goldAfterBuy, itemName)
    console.log(" ITEMS HAVE", hintHave, extraLifeHave)
    Users.updateMany(
        { _id },
        {
            $set: {
                gold: goldAfterBuy,
                hint: hintHave,
                extraLife: extraLifeHave
            }
        },
        (err, doc) => {
            if (err) {
                console.log("ERR", err)
            }
            else {
                sendItem(doc)
            }
        }
    )
}




module.exports = {
    registerUser,
    login,
    logout,
    getUsers,



    getCurrentInfo,
    updateCurrentInfo,
    skip,

    getLoggedInUser,
    updateUser,

    // insertQuestion,
    getQuestions,
    validateAnswer,
    levelComplete,


    getStoreItems,
    updateOwenedItes,
}


// {
//     name: "Abeer",
//     email: "abeer@gmail.com",
//     password:12345,
//     score: 2000,
//     gold: 200,
//     hint: 0,
//     extraLife: 0
// },
// {
//     name: "Mohammad Alaa Aldein",
//     email: "mohammad@gmail.com",
//     password:12345,
//     score: 2500,
//     gold: 500,
//     hint: 0,
//     extraLife: 0
// },
// {
//     name: "Ayham",
//     email: "ayham@gmail.com",
//     password:12345,
//     score: 2000,
//     gold: 500,
//     hint: 0,
//     extraLife: 0
// },
// {
//     name: "Ahmad",
//     email: "ahmad@gmail.com",
//     password:12345,
//     score: 1500,
//     gold: 500,
//     hint: 0,
//     extraLife: 0
// },

