const courseModel = require('../model/course.model')

//Creating a new course
async function handleNewCourse(req, res){
    try {
        const data = req.body
        let resData = new courseModel(data)
        resData = await resData.save()
        res.status(201).json({
            success: true,
            data,
            statusCode: 201,
            message:"Course created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message:"Something has gone wrong",
            statusCode: 400
        })
    }
}


module.exports = { handleNewCourse };