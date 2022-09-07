const CourseModel = require('../model/course.model')
const OutlineModel = require('../model/outline.model')
const VideoModel = require('../model/video.model')

//Creating a new course
async function handleNewCourse(req, res){
    try {
        const data = req.body
        let resData = new CourseModel(data)
        resData = await resData.save()
        res.status(201).json({
            succss: true,
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
        let resData = new OutlineModel(data)
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

//----------------------------------------------------------------
//................................................................
async function handleNewVideo(req, res){
    try {
        const data = req.body
        let resData = new VideoModel(data)
        resData = await resData.save()
        console.log(resData._id);
        res.status(201).json({
            success: true,
            resData,
            statusCode: 201,
            message:"Video created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message:"Something has gone wrong",
            error: error.message,
            statusCode: 400
        })
    }
}

async function handleGetVideos(req, res) {
    const outlineId = req.params.id
    const videos = await VideoModel.findOne({outlineId:outlineId})
    try {
        console.log(videos)
        res.status(201).json({
            success: true,
            videos,
            statusCode: 200,
            message:"Videos created successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
        success:false,
        message: "seems we can't find what you are looking for",
        statusCode: 400
        })
    }
}



module.exports = { handleNewCourse, handleNewOutline, handleNewVideo, handleGetVideos };