const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ss1=false"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Backend connection successfull");
    })
}
module.exports = connectToMongo;