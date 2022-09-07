// const courseModel = require('../model/course.model')

// async function handleGetVideos() {
//     const courses = await courseModel.find()
//     try {
//         res.status(201).json({
//             success: true,
//             data: [...courses],
//             statusCode: 201,
//             message:"Course created successfully",
//             watch: console.log(courses)
//         })
//     } catch (error) {
//         res.status(400).json({
//         success:false,
//         message: "<h2>Oops</><p>seems we can't find what you are looking for</p>",
//         statusCode: 400
//         })
//     }
// }

// module.exports = handleGetVideos