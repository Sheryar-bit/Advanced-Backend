const express = require('express');
const passport = require('passport')
const { GoogleStrategy } = require('./Auth')
require('dotenv').config();
const session = require('express-session');

const app = express();

app.use(express.json())
app.use(session({
    secret:"myseckey",
    resave: false,
    saveUninitialized: true,
    })
)

app.use(passport.initialize());
app.use(passport.session())


app.get('/', function(req, res){
    res.send("<a href='/auth/google'>Login With Google</a>")
})

app.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email']})
);

//If authentication fails, we get bak to root if succesful we get to profile
app.get('/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/'}), 
    function(req, res) {
        res.redirect('/profile')
    }
)

//Needs a little bit of debugging(user session is saved and doesnt expires)
app.get('/logout', (req, res) => {
    req.logout(function(){;;
    res.session = null     
    res.redirect('/')
}); // Redirect to the home page or login page

});

app.get('/profile', function(req, res) {

    res.send(`Welcome ${req.user.displayName}`)
})

app.get('/logout', function(req, res){
    // req.logout(function(){
    //     res.redirect('/')
    // })
    req.logout(function(){
    req.session = null;
    res.redirect('/')
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
})
