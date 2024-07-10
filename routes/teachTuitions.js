const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('tvTuitions');
})

router.post('/', async (req, res) => {
    try{
        const data = {
            name: req.body.name,
            grade: Number(req.body.grade),
            subject: req.body.subject,
            yoe: Number(req.body.yoe),
            fees: Number(req.body.fees),
            mode: req.body.mode
        }
        console.log(data);

        const newTeacher = new Teacher(data);
        await newTeacher.save();

        const message = "Successfully registered as a tutor";
        res.render('tvTuitions', {message});
    }catch(err){
        console.log('An error occurred', err);
    }
})

module.exports = router;