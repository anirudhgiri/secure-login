let hashPwd = require('./src/hashPwd');
let authenticateUser = require('./src/authenticateUser')

let express = require('express');
let port = 3000;
let app = express();

app.set('view engine', 'pug');

let bodyParser = require('body-parser');

let mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://secure-login-server:password37312@cluster0.3lwit.mongodb.net/Authentication?retryWrites=true&w=majority',{useNewUrlParser : true, useCreateIndex: true})

let User = require('./models/User.js');

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error : '));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    res.redirect('/login');
});

app.get('/login',(req,res) => {
    res.sendFile(__dirname+'/public/login.html');
});

app.get('/signup',(req,res) => {
    res.sendFile(__dirname+'/public/signup.html');
});

app.get('/home',(req,res) => {
    res.render('home',{firstname:"Anirudh", lastname:"Giri"});
})

app.post('/userlogin',async (req,res) => {
    let reqBody = req.body;
    
    let username = reqBody.username;
    let pwd = reqBody.password;

    let user = await User.findOne({username:username}).exec();

    let pwdSalt = user.pwdSalt;

    let isAuthenticated = await authenticateUser(pwd,pwdSalt,user.pwdHash);

   res.json({success : isAuthenticated});
    
});

app.post('/usersignup', async(req,res) => {
    let reqBody = req.body;

    let user_firstname = reqBody.firstname;
    let user_lastname = reqBody.lastname;
    let user_username = reqBody.username;

    let {user_pwdHash, user_pwdSalt} = await hashPwd(reqBody.password);
    
    let user = new User({
        firstname: user_firstname, 
        lastname: user_lastname, 
        username: user_username, 
        pwdHash: user_pwdHash, 
        pwdSalt: user_pwdSalt
    });

    user.save();

    res.redirect('/');
})

app.listen(port,() =>{
    console.log(`Server listening at port ${port}`);
});