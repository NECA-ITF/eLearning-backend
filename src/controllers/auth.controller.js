const userModel = require("../model/user.model");
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
async function handleUpdateProfile(req,res){
   
    try {
        const id = req.params.id;
        const data = req.body
        const user = await userModel.findOne({_id:id});
        
        if(!user){
            return res.status(400).json({
                message: "User does not exists",
                success: false,
                statusCode: 409
            });
        }
        const {fullName,email,phoneNumber} = data
        const resData = await userModel.replaceOne({_id:id},
            {
                fullName:fullName,
                email:email,
                phoneNumber:phoneNumber,
                password:user.password,
                isAdmin:user.isAdmin
            }
        )

        return res.status(200).json({
            message:"Profile Updated",
            success:true,
            data:resData,
            statusCode:200

        });

    } catch (error) {
        return res.status(404).json({
            message: "something went wrong",
            success: false,
            statusCode: 404,
            error:error
        });
    }
    
}


async function handleForgottenPassword(req,res){
    try {    
        const {email, password: newPassword} = req.body
        const userExists = await UserModel.countDocuments({email: email});

        if(!userExists){
            return res.status(400).json({
                message: "User does not exists",
                success: false,
                statusCode: 409
            });
        }

        const user = await UserModel.findOne({_id: userId});
        const newUserObject = user;
         newUserObject["password"] = newPassword;

         const forgottenPassword = await UserModel.replaceOne({_id: userId }, newUserObject);
         console.log(forgottenPassword)
         const updatedUser = await UserModel.findOne({_id: userId});

        //  console.log(updatedUser)
         return res.status(200).json({
             message:"password changed successfully ",
             success:true,
             updatedUser,
             statusCode:200 
         }); 
    }
    catch (error) {
        // console.log(error)
        return res.status(404).json({
            message: "something went wrong",
            success: false,
            statusCode: 404,
            error:error
        });
    }
}

async function handleChangedPassword(req,res){
        try{
            const {userId, oldPassword,newPassword} = req.body
            const passwordMatched = await UserModel.countDocuments({password: oldPassword});

            if(!passwordMatched){
                return res.status(400).json({
                    message: "wrong old password",
                    success: false,
                    statusCode: 400
                });
        }
           const user = await UserModel.findOne({_id: userId});
           const newUserObject = user;
           newUserObject["password"] = newPassword;

           const forgottenPassword = await UserModel.replaceOne({_id: userId }, newUserObject);

           const updatedUser = await UserModel.findOne({_id: userId});
            
           return res.status(200).json({
            message:"password changed successfully ",
            success:true,
            updatedUser,
            statusCode:200
        }); 

        }

        catch (error) {
            return res.status(404).json({
                message: "something went wrong",
                success: false,
                statusCode: 404,
                error:error
            });
        }

}


async function handleChangePassword(req, res) {
    try {
        const {userId, newPassword, oldPassword} = req.body
        const userExists = await UserModel.countDocuments({ _id: userId})
        
        if(!userExists){
            return res.status(400).json({
                message: "User does not exists",
                success: false,
                statusCode: 400
            });
        }
        const oldPass = await UserModel.countDocuments({ password: oldPassword})

        if(!oldPass){
            return res.status(400).json({
                message: "Password incorrect, try again",
                success: false,
                statusCode: 400
            });
        }

        const user = await UserModel.findOne({_id: userId})
        const newUserObject = user
        newUserObject["password"] = newPassword
        const forgottenPassword = await UserModel.replaceOne({_id: userId }, newUserObject);
        console.log(forgottenPassword)

        const updatedUser = await UserModel.findOne({_id: userId});

        console.log(updatedUser)

        return res.status(200).json({
            message:"password changed successfully ",
            success:true,
            updatedUser,
            statusCode:200 
        }); 
        

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message: "something went wrong",
            success: false,
            statusCode: 404,
            error:error
        });
    }
}


module.exports = { 
    handleRegister, 
    handleLogin,
    handleGetUsers,
    handleUpdateProfile,
    handleForgottenPassword,
    handleChangedPassword
};
