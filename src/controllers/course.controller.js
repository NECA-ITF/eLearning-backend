const courseModel = require('../model/course.model')
const outlineModel = require('../model/outline.model')
const videoModel = require('../model/video.model')

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
        res.status(400).json({
            success: false,
            message:"Something has gone wrong",
            statusCode: 400
        })
    }
}


async function handleNewOutline(req, res){
    try {
        const data = req.body
        let resData = new outlineModel(data)
        resData = await resData.save()
        res.status(201).json({
            success: true,
            data,
            statusCode: 201,
            message:"Course created successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message:"Something has gone wrong",
            statusCode: 400
        })
    }
}


async function handleNewVideo(req, res){
    try {
        const data = req.body
        let resData = new videoModel(data)
        resData = await resData.save()
        res.status(201).json({
            success: true,
            data,
            statusCode: 201,
            message:"Course created successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message:"Something has gone wrong",
            statusCode: 400
        })
    }
}

module.exports = { handleNewCourse, handleNewOutline, handleNewVideo };