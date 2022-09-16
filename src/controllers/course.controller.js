const CourseModel = require('../model/course.model')
const OutlineModel = require('../model/outline.model')
const VideoModel = require('../model/video.model')

async function handleNewCourse(req, res){
try {
    const courseData = JSON.parse(req.body.courseData)
    // const data = (req.body)
    // console.log(req.file)
    courseData['thumbnail'] = `api/static/images/${req.file.filename}`;
    courseData['requirements'] = courseData.requirements.split(",");
    // console.log(courseData)
    
    let resData = new CourseModel(courseData)
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


try {
    const { courseId, title: newOutlineTitle } = req.body;    
    const courseExists = await CourseModel.countDocuments({ _id: courseId });

    if(!courseExists){
        return res.status(404).json({
            message: "course not found",
            success: false,
            statusCode: 404
        });
}

    let resData;
    const outlinesExist = await OutlineModel.countDocuments({courseId:courseId});

    if(outlinesExist){
        const {outlines: oldOutlines} = await OutlineModel.findOne({courseId:courseId});
        
        //checking if the title exit 
        const titleExist = oldOutlines.find(outline => outline.title === newOutlineTitle)
        
        if(titleExist){
            return res.status(400).json({
                message: "Outline already exit",
                success: false,
                statusCode: 400
            });
        }

        oldOutlines.push({title: newOutlineTitle})
        
        resData = await OutlineModel.replaceOne({courseId:courseId},
            {
                courseId:courseId,
                outlines:oldOutlines
            })
    }else{
        const data = req.body
        data["outlines"] = [
            {
                title: newOutlineTitle
            }
        ];
        
        resData = new OutlineModel(data)
        resData = await resData.save()
    }


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

async function handleNewVideos(req, res){
try {
    const videoData = JSON.parse(req.body.videoData)
    // console.log(videoData)
    // console.log(req.file)
    // console.log(req.file)
    // console.log(videoData)


const { courseId, outlineId, title: newVideoTitle } = videoData;
const courseExists = await CourseModel.countDocuments({ _id: courseId });

if(!courseExists){
    return res.status(404).json({
        message: "course not found",
        success: false,
        statusCode: 404
    });
}

const { outlines } = await OutlineModel.findOne({ courseId: courseId });
const foundOutline = outlines.find(outline => outline._id.toString() === outlineId )
// return console.log(foundOutline)
const videosExist = await VideoModel.countDocuments({ outlineId: outlineId });
let resData;
if(videosExist){
    const videosObj = await VideoModel.findOne({ outlineId: outlineId });
        const { videos: oldVideos } = videosObj;
        const newVideos = oldVideos.push({
            title: newVideoTitle,
            url: `api/static/videos/${req.file.filename}`
        });
        videosObj["videos"] = newVideos;

        resData = await VideoModel.replaceOne({ outlineId: outlineId }, videosObj);
}else{
    videoData['videos'] = [
        {
            title: videoData.title,
            url: `api/static/videos/${req.file.filename}`
        }
    ];
    
    videoData["outlineTitle"] = foundOutline.title;
    resData = new VideoModel(videoData);
    resData = await resData.save();
    
}
    res.status(201).json({
        success: true,
        resData,
        statusCode: 200,
        message:"Videos added successfully"
    })
} catch (error) {
    console.log(error);
    
    res.status(400).json({
        success: false,
        message:"Something went wrong",
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
    const { outlineId } = req.params;
    try {
    
    const videosExist = await VideoModel.countDocuments({ outlineId: outlineId });

if(!videosExist){
    return res.status(404).json({
        message: "outline not found",
        success: false,
        statusCode: 404
    });
}

const resData = await VideoModel.findOne({ outlineId: outlineId })

    res.status(200).json({
        success: true,
        resData,
        statusCode: 200,
        message:"Videos gotten successfully",
    })
} catch (error) {
    // console.log(error)
    res.status(400).json({
        success:false,
    message: "seems we can't find what you are looking for",
    statusCode: 400
})
}
}

async function handleDeleteCourse(req, res) {
    try{
        const { courseId } = req.body;

        const videosExist = await VideoModel.countDocuments({ courseId: courseId});
        if(videosExist){
            await VideoModel.deleteMany({ courseId: courseId });
        }

        const outlinesExist = await OutlineModel.countDocuments({ courseId: courseId});
        if(outlinesExist){
            await OutlineModel.deleteOne({ courseId: courseId });
        }

        const courseExist = await CourseModel.countDocuments({ _id: courseId});
        if(!courseExist){
            return res.status(404).json({
                message: "Course not found",
                success: false,
                statusCode: 404
            });
        }
        
        const deletedCourse = await CourseModel.deleteOne({ _id: courseId });

        return res.status(200).json({
            message: "course deleted successfully",
            deletedCourse,
            success: true,
            statusCode: 200
        });

    }catch (error) {
        // console.log(error)
        res.status(400).json({
        success: false,
        message: "something went wrong",
        statusCode: 400
        })
    }

}

async function handleDeleteOutline(req,res){

const { courseId, outlineId } = req.body;

try { 
    const videosExist = await VideoModel.countDocuments({ outlineId: outlineId});
    if(videosExist){
        await VideoModel.deleteOne({ outlineId: outlineId });
    }

    const courseExist = await OutlineModel.countDocuments({ courseId: courseId});
    if(!courseExist){
        return res.status(404).json({
            message: "outline not found",
            success: false,
            statusCode: 404
        });
    }

    const {outlines} = await OutlineModel.findOne({courseId:courseId});

    const foundOutline = outlines.find((outline) =>
        outline._id.toString() === outlineId
    )
    if(!foundOutline){
        return res.status(404).json({
            message: "outline not found",
            success: false,
            statusCode: 404
        });
    }

    let deletedOutline;
    if(outlines.length === 1){
        deletedOutline = await OutlineModel.deleteOne({courseId:courseId})
    }else{
        const filterdOutlines = outlines.filter((outline) =>
        outline._id.toString() !== outlineId
        )

       deletedOutline = await OutlineModel.replaceOne({courseId:courseId},
            {
                courseId:courseId,
                outlines:filterdOutlines
            })
    }

    return res.status(200).json({
        success: true,
        deletedOutline,
        statusCode: 200,
        message:"Outline Deleted",
    })
} catch (error) {
    // console.log(error)
    res.status(400).json({
    success:false,
    message: "seems we can't find what you are looking for",
    statusCode: 400
    })
}
}

async function handleDeleteVideo(req, res) {
const { outlineId, videoId } = req.body;
    try{
        const  oldVideoObj  = await VideoModel.findOne({ outlineId:  outlineId })

        const foundVideo = oldVideoObj.videos.find(video => video._id.toString() === videoId);
        if(!foundVideo){
            return res.status(404).json({
                message: "video not found",
                success: false,
                statusCode: 404
            });
        }
        let resData;
        if(oldVideoObj.videos.length === 1){
            resData = await VideoModel.deleteOne({ outlineId: outlineId });
        }else{
            const filteredVideos = oldVideoObj.videos.filter(video => video._id.toString() !== videoId);
            oldVideoObj["videos"] = filteredVideos;
            resData = await VideoModel.replaceOne({ outlineId: outlineId }, oldVideoObj);
        }

        return res.status(200).json({
            message: "video deleted successfully",
            resData,
            success: true,
            statusCode: 200
        });
    }catch(error){
        console.log( error )
        return res.status(400).json({
            message: "something went wrong",
            success: false,
            statusCode: 400
        });
    }

}

async function handleUpdateOutline(req,res){
    try {
        const { courseId, title: newOutlineTitle } = req.body;
        const courseExists = await CourseModel.countDocuments({ _id: courseId });
        if(!courseExists){
            return res.status(404).json({
                message: "course not found",
                success: false,
                statusCode: 404
            });
        }

        const {outlines: oldOutlines} = await OutlineModel.findOne({courseId:courseId});
        oldOutlines.push({title: newOutlineTitle})
    
        const resData = await OutlineModel.replaceOne({courseId:courseId},
            {
                courseId:courseId,
                outlines:oldOutlines
            })
    
        res.status(200).json({
            success: true,
            resData,
            statusCode: 200,
            message:"Outline Updated",
        })


        
    } catch (error) {
        return res.status(404).json({
            message: "something went wrong",
            success: false,
            statusCode: 404
        });
    }
}

async function handleUpdateVideos(req,res){
    try{
        const { outlineId, title: newVideoTitle, url: newVideoUrl } = req.body;

        const videosExist = await VideoModel.countDocuments({ outlineId: outlineId });
        
        if(!videosExist){
            return res.status(404).json({
                message: "video collection not found",
                success: false,
                statusCode: 404
            });
        }

        const videosObj = await VideoModel.findOne({ outlineId: outlineId });
        const { videos: oldVideos } = videosObj;
        const newVideos = oldVideos.push({title: newVideoTitle, url: newVideoUrl});
        videosObj["videos"] = newVideos;

        const resData = await VideoModel.replaceOne({ outlineId: outlineId }, videosObj);

        return res.status(201).json({
            message: "video added successfully",
            resData,
            success: true,
            statusCode: 201
        });

    }catch(error){
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
    handleNewVideos, 
    handleGetCourses, 
    handleGetOutlines, 
    handleGetVideos,
    handleDeleteCourse,
    handleDeleteOutline, 
    handleDeleteVideo,
    handleUpdateOutline,
    handleUpdateVideos,
};