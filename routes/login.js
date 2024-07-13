const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

//index page
router.get('/', (req, res) => {
    res.render('login');
})

//link from sign up page
router.get('/login', (req, res) => {
    res.render('login');
})

//adds user data to database + validates 
router.post('/login', async (req, res) => {
    try{
        const userExists = await User.find({username: req.body.username});
        
        if(!userExists[0]){ 
            return res.render('login', {error: `user doesn't exist`});
        }

        const userType = userExists[0].userType;

        //compare the hash password with plain text password
        const passwordMatch = await bcrypt.compare(req.body.password, userExists[0].password);

        //renders student/teacher home page accordingly
        if(passwordMatch){
            if(userType == 'student'){
                res.render('studentHome');
            }
            else if(userType == 'teacher'){
                res.render('teacherHome');
            }
        }
        else{ 
            return res.render('login', { error: 'wrong password, try again' });
        }

    }catch(err){
        res.send('Wrong Details');
        res.render('login', { error: 'an error occurred during login' });
    }
})

module.exports = router;