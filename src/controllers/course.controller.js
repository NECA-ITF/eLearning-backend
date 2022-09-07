const CourseModel = require('../model/course.model')
const OutlineModel = require('../model/outline.model')
const VideoModel = require('../model/video.model')

async function handleNewCourse(req, res){
    try {
        const data = req.body
        let resData = new CourseModel(data)
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
        let resData = new VideoModel(data)
        resData = await resData.save()
        console.log(resData._id);
        res.status(201).json({
            success: true,
            resData,
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




async function handeleGetCourses(req, res) {
    const courses = await CourseModel.find()
    res.status(200).json({
      message: "Successful!",
      success: true,
      courses,
      statusCode: 200
    });
  }

  async function handeleGetOutlines(req, res) {
    const outlines = await OutlineModel.find()
    res.status(200).json({
      message: "Successful!",
      success: true,
      outlines,
      statusCode: 200
    });
  }

  



module.exports = { handleNewCourse, handleNewOutline, handleNewVideo, handeleGetCourses, handeleGetOutlines };