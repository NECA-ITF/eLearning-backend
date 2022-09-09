Connection--------------------------------------------------------------------------------

192.168.137.1:5000

to connect to the local server


CRUD----------------------------------------------------------------------------------------------

*get all courses*
sample request: GET
{{base-url}}/api/courses
i.e get all the courses
sample response:
{
    "message": "Successful!",
    "success": true,
    "courses": [
        {
            "_id": "6319e44f9bc284efde1c9b03",
            "title": "Git course",
            "instructor": "Harrison Akunne",
            "description": "Advanced git usage",
            "thumbnail": "none",
            "createdAt": "2022-09-08T12:47:11.148Z",
            "updatedAt": "2022-09-08T12:47:11.148Z",
            "__v": 0
        }
    ],
    "statusCode": 200
}


*get outlines for a particular course i.e get the "folders" for that course (requires courseId)*

sample request: GET
{{base-url}}/api/outlines/6319e44f9bc284efde1c9b03
i.e get all the outline for the Git course
sample response:
{
    "message": "Successful!",
    "success": true,
    "outline": {
        "_id": "6319e57ac7662c32e2b28722",
        "courseId": "6319e44f9bc284efde1c9b03",
        "outlines": [
            {
                "title": "Introduction",
                "_id": "6319e57ac7662c32e2b28723"
            },
            {
                "title": "Middle",
                "_id": "6319e57ac7662c32e2b28724"
            },
            {
                "title": "End",
                "_id": "6319e57ac7662c32e2b28725"
            }
        ],
        "__v": 0
    },
    "statusCode": 200
}

*get all videos in a particular outline  i.e course -> outline -> videos (requires outlineId)*

sample request: GET
{{base-url}}/api/videos/6319e44f9bc284efde1c9b03/6319e57ac7662c32e2b28723
i.e get all videos in Git course -> Introduction
sample response:
{
    "success": true,
    "resData": {
        "_id": "6319fdb2220080508e612e60",
        "courseId": "6319e44f9bc284efde1c9b03",
        "outlinesId": "6319e57ac7662c32e2b28722",
        "outlineId": "6319e57ac7662c32e2b28723",
        "videos": [
            {
                "title": "Getting you ready",
                "url": "www.video1.com",
                "_id": "6319fdb2220080508e612e61"
            },
            {
                "title": "Polymorphism",
                "url": "www.video2.com",
                "_id": "6319fdb2220080508e612e62"
            },
            {
                "title": "Inheritance",
                "url": "www.video3.com",
                "_id": "6319fdb2220080508e612e63"
            }
        ],
        "__v": 0
    },
    "statusCode": 200,
    "message": "Videos gotten successfully"
}

*create new course* 

sample request: POST
{{base-url}}/api/course
body -> 
i.e create Git course
{
    "title": "Git course",
    "instructor": "Harrison Akunne",
    "description": "Advanced git usage",
    "thumbnail": "none",
    "ratings": "4"
}

sample response:
{
    "success": true,
    "resData": {
        "title": "Git course",
        "instructor": "Harrison Akunne",
        "description": "Advanced git usage",
        "thumbnail": "none",
        "_id": "6319e44f9bc284efde1c9b03",
        "createdAt": "2022-09-08T12:47:11.148Z",
        "updatedAt": "2022-09-08T12:47:11.148Z",
        "__v": 0
    },
    "statusCode": 201,
    "message": "Course created successfully"
}

*create outline for a particular course i.e create the "folders" for that course (requires courseId)*

sample request: POST
{{base-url}}/api/outlines
body -> 
i.e create three outlines for Git course
{
    "courseId": "6319e44f9bc284efde1c9b03",
    "outlines": [
        {
            "title": "Introduction"
        },
        {
            "title": "Middle"
        },
        {
            "title": "End"
        }
    ]
}

sample response:
{
    "success": true,
    "resData": {
        "courseId": "6319e44f9bc284efde1c9b03",
        "outlines": [
            {
                "title": "Introduction",
                "_id": "6319e57ac7662c32e2b28723"
            },
            {
                "title": "Middle",
                "_id": "6319e57ac7662c32e2b28724"
            },
            {
                "title": "End",
                "_id": "6319e57ac7662c32e2b28725"
            }
        ],
        "_id": "6319e57ac7662c32e2b28722",
        "__v": 0
    },
    "statusCode": 201,
    "message": "Outline created successfully"
}

*create all videos in a particular outline i.e course -> outline -> videos (requires courseId and outlineId)*

sample request: POST
{{base-url}}/api/videos
body -> 
i.e create three videos for introduction outline
{
    "courseId": "6319e44f9bc284efde1c9b03",
    "outlineId": "631a1e041866d181cbfe67dc",
    "videos": [
        {
            "title": "Getting you ready",
            "url": "www.video1.com"
        },
        {
            "title": "Polymorphism",
            "url": "www.video2.com"
        },
        {
            "title": "Inheritance",
            "url": "www.video3.com"
        }
    ]
}

sample response:
{
    "success": true,
    "resData": {
        "courseId": "6319e44f9bc284efde1c9b03",
        "outlineTitle": "Introduction",
        "outlineId": "631a1e041866d181cbfe67dc",
        "videos": [
            {
                "title": "Getting you ready",
                "url": "www.video1.com",
                "_id": "631b0af811eede07f7db716d"
            },
            {
                "title": "Polymorphism",
                "url": "www.video2.com",
                "_id": "631b0af811eede07f7db716e"
            },
            {
                "title": "Inheritance",
                "url": "www.video3.com",
                "_id": "631b0af811eede07f7db716f"
            }
        ],
        "_id": "631b0af811eede07f7db716c",
        "__v": 0
    },
    "statusCode": 200,
    "message": "Videos added successfully"
}

*delete a single outline from the course(require courseId and outlineId)*

sample request: DELETE
{{base-url}}/api/outline
i.e delete Introduction outline
body -> 
{
    "courseId": "6319e44f9bc284efde1c9b03",
    "outlineId": "6319e57ac7662c32e2b28723"
}

sample response:
{
    "success": true,
    "resData": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "statusCode": 200,
    "message": "Outline Deleted"
}

*delete a single video in an outline (requires outlineId and videoId)*

sample request: DELETE
{{base-url}}/api/video
i.e delete Inheritance video
body -> 
{
    "outlineId": "6319e57ac7662c32e2b28723",
    "videoId": "6319fdb2220080508e612e63"
}

sample response:
{
    "message": "video deleted successfully",
    "resData": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "success": true,
    "statusCode": 200
}


AUTHENTICATION---------------------------------------------------------------------------------------

*Register a user*
sample request: POST
{{base-url}}/auth/user/register
body -> 
{
    "fullName": "Harrison Akunne",
    "email": "harrisonderick.65@gmail.com", 
    "phoneNumber": "09037442408",
    "password": "my-secret",
    "isAdmin": false
}
sample response:
{
    "message": "Successful!",
    "success": true,
    "newUser": {
        "fullName": "Harrison Akunne",
        "email": "harrisonderick.65@gmail.com",
        "phoneNumber": "09037442408",
        "password": "my-secret",
        "isAdmin": false,
        "_id": "6319ff27220080508e612e6c",
        "__v": 0
    },
    "statusCode": 201
}

*Login a user* 
sample request: POST
{{base-url}}/auth/user/login
body -> 
{
    "email": "harrisonderick.65@gmail.com",
    "password": "my-secret"
}

sample response:
{
    "message": "Login Successful",
    "success": true,
    "userData": {
        "_id": "6319ff27220080508e612e6c",
        "fullName": "Harrison Akunne",
        "email": "harrisonderick.65@gmail.com",
        "phoneNumber": "09037442408",
        "password": "my-secret",
        "isAdmin": false,
        "__v": 0
    },
    "statusCode": 200
}


