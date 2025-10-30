const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json())

///////////////// 
mongoose.connect("mongodb+srv://martynasbarauskas_db_user:watermelon@cluster0.mlfo08f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("connected to DB")).catch((error) => console.log(error));

const {createCourse, getAllRecords, findOneCourse, updateCourseById, deleteOneCourse} =require ("./courseController");

app.post("/courses", createCourse);
app.get("/allcourses", getAllRecords);
app.get("/courses/:id", findOneCourse);
app.put("/courses/:id", updateCourseById);
app.delete("/courses/:id", deleteOneCourse);

app.listen(5050, () => console.log("server is running on 5050 port"));


