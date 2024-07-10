const express = require('express');
const Material = require('../models/Material');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('tvMaterial');
})

router.post('/', async (req, res) => {
    try{
        const data = {
            title: req.body.title,
            author: req.body.author,
            subject: req.body.subject,
            grade: req.body.grade,
            link: req.body.link
        }

        const newMaterial = new Material(data);
        await newMaterial.save();

        const message = "Successfully added material";
        res.render('tvMaterial', {message});

    }catch(err){
        console.log('An error occurred', err);
        res.status(500).send('Error adding data');
    }
})

module.exports = router;