const mongoose =  require("mongoose")
 
const courseSchema = new mongoose.Schema({
title: String,
teacher: String,
data: {type: Date, default: Date.now}
})
 
const Course = mongoose.model("course", courseSchema)
 
module.exports = Course