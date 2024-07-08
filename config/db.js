const mongoose = require('mongoose');

const uri = "mongodb+srv://ahanam05:dha2005nu@cluster0.hlxuyz8.mongodb.net/EduApp?retryWrites=true&w=majority";

module.exports = async function connectToDb(){
    try{
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas');
    } catch(error){
        console.log('An error occurred: ', error);
    }
}
