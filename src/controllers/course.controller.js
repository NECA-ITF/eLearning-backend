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
            resData,
            statusCode: 201,
            message:"Course created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Something has gone wrong",
            error,
            success: false,
            statusCode: 400
        })
    }
}

async function handleNewOutline(req, res){


    const { courseId } = req.body;    
    const courseExists = await CourseModel.countDocuments({ _id: courseId });

    if(!courseExists){
        return res.status(404).json({
            message: "course not found",
            success: false,
            statusCode: 404
        });
    }
    
    try {
        const data = req.body
        
        let resData =  new OutlineModel(data)
        resData = await resData.save()
        res.status(201).json({
            success: true,
            resData,
            statusCode: 201,
            message:"Outline created successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message:"Something went wrong",
            error: error,
            statusCode: 400
        })
    }
}

async function handleNewVideo(req, res){
    const { courseId, outlinesId, outlineId } = req.body;    
    const courseExists = await CourseModel.countDocuments({ _id: courseId });

    if(!courseExists){
        return res.status(404).json({
            message: "course not found",
            success: false,
            statusCode: 404
        });
    }
    const outlinesExist = await OutlineModel.countDocuments({ _id: outlinesId });
    
    if(!outlinesExist){
        return res.status(404).json({
            message: "outlines not found",
            success: false,
            statusCode: 404
        });
    }
    
    const outlines = await OutlineModel.findOne({ _id: outlinesId });

    if(!outlines.outlines.find(outline => outline._id.toString() === outlineId )){
        
        return res.status(404).json({
            message: "outline not found",
            success: false,
            statusCode: 404
        });
    }

    try {
        const data = req.body
        let resData = new VideoModel(data)
        resData = await resData.save()
        res.status(201).json({
            success: true,
            resData,
            statusCode: 200,
            message:"Video added successfully"
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


async function handleGetCourses(req, res) {
    try{
        const courses = await CourseModel.find()
        return res.status(200).json({
            message: "Successful!",
            success: true,
            courses,
            statusCode: 200
        });
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            success: false,
            courses,
            statusCode: 500
        });
    }
  }

  async function handleGetOutlines(req, res) {
    const { courseId } = req.params;    
    const outlineExists = await OutlineModel.countDocuments({ courseId: courseId });

    if(!outlineExists){
        return res.status(404).json({
            message: "outline not found",
            success: false,
            statusCode: 404
        });
    }

    try{
        const outline = await OutlineModel.findOne({ courseId: courseId})

        return res.status(200).json({
            message: "Successful!",
            success: true,
            outline,
            statusCode: 200
        });
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error,
            statusCode: 500
        });
    }
  }


  async function handleGetVideos(req, res) {
      const { courseId, outlineId } = req.params;
      
    const videosExist = await VideoModel.countDocuments({ courseId: courseId, outlineId: outlineId });
    
    if(!videosExist){
        return res.status(404).json({
            message: "outline not found",
            success: false,
            statusCode: 404
        });
    }

    const resData = await VideoModel.findOne({ courseId: courseId, outlineId: outlineId })

    try {
        console.log(resData)
        res.status(200).json({
            success: true,
            resData,
            statusCode: 200,
            message:"Videos gotten successfully",
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
  
  async function handleDeleteSingleVideo(req, res) {
      const { courseId, outlinesId, outlineId, videoId } = req.body;
      try{
          const { videos } = await VideoModel.findOne({ courseId: courseId, outlineId:  outlineId})
  
          const filteredVideos = videos.filter(video => video._id.toString() !== videoId);
  
          await VideoModel.replaceOne({ courseId: courseId }, { 
              courseId: courseId,
              outlinesId: outlinesId, 
              outlineId: outlineId, 
              videos: filteredVideos
          });
      }catch(error){
          console.log(error);
          return res.status(404).json({
              message: "something went wrong",
              success: false,
              statusCode: 404
          });
      }
  
  }

  async function handleDeleteSingleOutline(req,res){

    const { courseId, outlineId } = req.body;
    const courseExist = await OutlineModel.countDocuments({ courseId: courseId});
    if(!courseExist){
        return res.status(404).json({
            message: "Course not found",
            success: false,
            statusCode: 404
        });
    }

    try { 
        const course = await OutlineModel.findOne({courseId:courseId});

        const filterdOutlines = course.outlines.filter((outline) =>
            outline._id.toString() !== outlineId
        )

        const resData = await OutlineModel.replaceOne({courseId:courseId},
            {
                courseId:courseId,
                outlines:filterdOutlines
            })

        res.status(200).json({
            success: true,
            resData,
            statusCode: 200,
            message:"Outline Deleted",
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

  async function handleDeleteSingleOutlineVideos(req, res) {
    const { outlineId } = req.params;
    try{
        const { outlineId } = req.params;    
        const videosExist = await VideoModel.countDocuments({ outlineId: outlineId });
        if(!videosExist){
            return res.status(404).json({
                message: "outline not found",
                success: false,
                statusCode: 404
            });
        }
        
        const deletedVideos = await VideoModel.deleteOne({ outlineId: outlineId });
        return res.status(200).json({
            message: "course deleted successfully",
            success: deletedVideos.acknowledged,
            number: deletedVideos.deletedCount,
            statusCode: 200
        });
        // console.log(deletedVideos);
    }catch(error){
        console.log(error);
        return res.status(404).json({
            message: "something went wrong",
            success: false,
            statusCode: 404
        });
        
    }
}

async function handleDeleteCourseVideos(req, res) {
    try{
        const { courseId } = req.params;    
        const courseExists = await CourseModel.countDocuments({ _id: courseId });
        if(!courseExists){
            return res.status(404).json({
                message: "course not found",
                success: false,
                statusCode: 404
            });
        }
        
        const deletedCourse = await VideoModel.deleteMany({ courseId: courseId });
        return res.status(200).json({
            message: "course deleted successfully",
            success: deletedCourse.acknowledged,
            number: deletedCourse.deletedCount,
            statusCode: 200
        });
        // console.log(deletedCourse);
    }catch(error){
        console.log(error);
        return res.status(404).json({
            message: "something went wrong",
            success: false,
            statusCode: 404
        });
        
    }
}


  
module.exports = { 
    handleNewCourse, 
    handleNewOutline, 
    handleNewVideo, 
    handleGetCourses, 
    handleGetOutlines, 
    handleGetVideos, 
    handleDeleteSingleOutline, 
    handleDeleteSingleVideo, 
    handleDeleteSingleOutlineVideos, 
    handleDeleteCourseVideos 
};
