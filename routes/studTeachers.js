const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

const uri = "mongodb+srv://ahanam05:dha2005nu@cluster0.hlxuyz8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', (req, res) => {
    res.render('svfilterTeachers');
})

router.post('/', async (req, res) => {
    try{
        await client.connect();
        const database = client.db("EduApp");
        const collection = database.collection("teachers");

        const gradeFilter = req.body.grade;
        const subjectFilter = req.body.subject;

        const query = {};

        if(gradeFilter){
            query.grade = Number(gradeFilter);
        }
        if(subjectFilter){
            query.subject = subjectFilter;
        }

        console.log(query);

        const filteredResults = await collection.find(query).toArray();
        console.log(filteredResults);
        res.render('svteachersResult', {filteredResults});

    }catch(err){
        console.log('Error displaying the filtered teachers: ', err);
        res.status(500).send('Error displaying data');
    }finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
})

module.exports = router;