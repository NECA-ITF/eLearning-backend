const UserModel = require("../model/user.model");

async function handleRegister(req, res){
    const data = req.body;
    
    const userEmailExists = await UserModel.countDocuments({ email: data.email });
    const userPhoneNumberExists = await UserModel.countDocuments({ phoneNumber: data.phoneNumber });

    if( userEmailExists || userPhoneNumberExists ){
        return res.status(409).json({
            message: "User already exists",
            success: false,
            statusCode: 409
        });
    }

    try{
        let newUser = new UserModel(data);
        newUser = await newUser.save();
        return res.status(201).json({
            message: "Successful!",
            success: true,
            newUser,
            statusCode: 201
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Registration unsuccessful!",
            success: false,
            error,
            statusCode: 500
        });
        
    }
}

async function handleLogin(req, res){
    const data = req.body;
    try{
        const userData = await UserModel.findOne({ email: data.email, password: data.password})
        // console.log(userData)
        
        return res.status(200).json({
            message: "Login Successful",
            success: true,
            userData,
            statusCode: 200
        });
    }catch(error){
        // console.log(error)
        res.status(404).json({
            message: "Login Unsuccessful",
            success: false,
            error,
            statusCode: 404
        });

    }

}

async function handleGetUser(req, res){
    const { userId } = req.params;
    const userExists = await UserModel.countDocuments({ _id: userId })
    if(!userExists){
        return res.status(404).json({
            message: "user not found",
            statusCode: 404,
            success: false
        });
    }
    try{
        const user = await UserModel.findOne({ _id: userId })
        return res.status(200).json({
            message: "request successful",
            user,
            statusCode: 200,
            success: true
        });
    }catch(error){
        return res.status(200).json({
            message: "user request successful",
            user,
            statusCode: 200,
            success: true
        });

    }

}

module.exports = { 
    handleRegister, 
    handleLogin,
    handleGetUser 
};