const Course = require("./courses.js");
console.log(Course)

// CREATE
// @ POST
const createCourse=async(req, res)=>{
    try{
        const {title, teacher} = req.body;

        if(!title || !teacher){
            return res.status(400).json({error: "All fields are required" })
        }

        const result = await Course.create({title, teacher});

        res.status(200).json({message: "record created", data: result});

    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "internal server error. Something wrong"});
    }
};

// READ
// @GET

const getAllRecords=async(req, res)=>{
    try {
const myCoursesFromDB= await Course.find();

if(myCoursesFromDB.length === 0){
    return res.status(404).json({ message: "No courses found in DB"});
}

res.status(200).json(myCoursesFromDB)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "internal server error. Something wrong"});
    }
};

// READ by ID
// @ GET
const findOneCourse=async(req,res)=> {
    try{
        const {id} = req.params;
        const oneCourse = await Course.findById(id);

        if(!oneCourse) {
            return res.status(404).json({ message: "course no exist"})

        }

        res.status(200).json(oneCourse);
    } catch(err) {
        console.log(err)
        res.status(500).json({error: "internal server error, something wrong"})
    }
};

// UPDATE
// @POST

const updateCourseById=async(req,res) => {
    try{
        const {id} = req.params;
        const {title, teacher} = req.body;

        if(!title || !teacher){
            return res.status(400).json({error: "Data aint found" })
        }

        const courseFromDB = await Course.findById(id);

        if (!courseFromDB) {
            return res.status(404).json({message: "Course not found"})
        }
            courseFromDB.title = title;
            courseFromDB.teacher = teacher;

        const result = await courseFromDB.save();

        res.status(200).json({ message: "record updated succesfully", result});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error. Something wrong"});
    }
};

// DELETE
// @DELETE

const deleteOneCourse = async (req, res)=>{
    try{
        const {id} = req.params;

        const result = await Course.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "Course not found"});
        }
        res.status(200).json({message: "course deleted yippee", result});

    }     catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error. Something wrong"});
    }
}

module.exports = { createCourse, getAllRecords, findOneCourse, updateCourseById, deleteOneCourse};
