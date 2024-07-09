const express = require('express');
const { MongoClient } = require('mongodb');
//const User = require('../models/User');
const router = express.Router();

const uri = "mongodb+srv://ahanam05:dha2005nu@cluster0.hlxuyz8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.get('/', (req, res) => {
    res.render('filterSchools');
})

router.post('/', async (req, res) => {
    try{
        await client.connect();
        const database = client.db("EduApp");
        const collection = database.collection("schools");

        const cityFilter = req.body.city;
        const typeFilter = req.body.type;
        const boardFilter = req.body.board;

        const query = {};

        if (cityFilter) {
            query.city = cityFilter;
        }
        if (typeFilter) {
            query.type = typeFilter;
        }
        if (boardFilter) {
            query.board = boardFilter;
        }
        console.log(query);
        
        const filteredResults = await collection.find(query).toArray();
        console.log(filteredResults);
        res.render('schoolsResult', {filteredResults});

    }catch(err){
        console.log('Error displaying the filtered schools: ', err);
        res.status(500).send('Error displaying data');
    }
    
})

module.exports = router;