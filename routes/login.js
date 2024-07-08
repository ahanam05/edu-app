const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {
    try{
        const userExists = await User.find({username: req.body.username});
        //console.log("exists or not: ", userExists);
        
        if(!userExists[0]){ 
            return res.render('login', {error: `User doesn't exist`});
        }

        const userType = userExists[0].userType;
        //console.log("user type: ", userType);

        //compare the hash password with plain text password
        const passwordMatch = await bcrypt.compare(req.body.password, userExists[0].password);
        //console.log(passwordMatch);
        //must render student and teacher home page as required
        if(passwordMatch){
            if(userType == 'student'){
                res.render('studentHome');
            }
            else if(userType == 'teacher'){
                res.render('teacherHome');
            }
        }
        else{ 
            return res.render('login', { error: 'Wrong password, try again' });
        }

    }catch(err){
        res.send('Wrong Details');
        res.render('login', { error: 'An error occurred during login' });
    }
})

module.exports = router;