const userModel = require("../model/user.model");

async function handleRegister(req, res){
    const data = req.body;
    
    const userEmailExists = await userModel.countDocuments({ email: data.email });
    const userPhoneNumberExists = await userModel.countDocuments({ phoneNumber: data.phoneNumber });

    if( userEmailExists || userPhoneNumberExists ){
        return res.status(409).json({
            message: "User already exists",
            success: false,
            statusCode: 409
        });
    }

    try{
        let resData = await new userModel(data);
        resData = await resData.save();
        return res.status(201).json({
            message: "Successful!",
            success: true,
            resData,
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
        const user = await userModel.findOne({ email: data.email, password: data.password})
        // console.log(user)
        
        return res.status(200).json({
            message: "Login unsuccessful",
            success: true,
            user,
            statusCode: 200
        });
    }catch(error){
        // console.log(error)
        res.status(404).json({
            message: "user not found",
            success: false,
            error,
            statusCode: 404
        });

    }

}
module.exports = { handleRegister, handleLogin };