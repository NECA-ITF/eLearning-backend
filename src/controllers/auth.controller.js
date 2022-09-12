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
    const { email, password } = req.body;
    const userExists = await UserModel.countDocuments({  email: email, password: password })
    if(!userExists){
        return res.status(401).json({
            message: "Login Unsuccessful",
            statusCode: 401,
            success: false
        });
    }
    try{
        const user = await UserModel.findOne({ email: email, password: password })
        return res.status(200).json({
            message: "Login Successful",
            user,
            statusCode: 200,
            success: true
        });
    }catch(error){
        return res.status(401).json({
            message: "Login Unsuccessful",
            error,
            statusCode: 401,
            success: false
        });

    }

}

async function handleGetUsers(req, res) {
    try{
        const users = await UserModel.find()
        return res.status(200).json({
            message: "Successful!",
            success: true,
            users,
            statusCode: 200
        });
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            success: false,
            // users,
            statusCode: 500
        });
    }
    }


module.exports = { 
    handleRegister, 
    handleLogin,
    handleGetUsers
};
