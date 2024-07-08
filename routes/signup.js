const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup');
})

router.post('/', async (req, res) => {
    try{
        const data = {
            username: req.body.username,
            password: req.body.password,
            userType: req.body.user
        };

        //console.log(data.username);

        //check if user exists already
        const existingUser = await User.find({username: data.username});
        //console.log(existingUser);
        if(existingUser[0]){
            res.render('signup', {error: 'Username taken, try another'});
        }
        else{
            //hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword; //replaces original password with hashed password

            const newUser = new User(data);
            const savedUser = await newUser.save();
            if(data.userType == 'student'){
                res.render('studentHome');
            }
            else if(data.userType == 'teacher'){
                res.render('teacherHome');
            }
            //console.log(savedUser);
        }
    }
    catch(err){
        console.log("An error occurred: ", err);
        res.render('signup', {error: 'Error creating user'});
        //res.status(500).send({ success: false, message: "Error creating user!" });
    }
    
})

module.exports = router;