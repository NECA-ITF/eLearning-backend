const UserModel = require("./user.model");
const PasswordModel = require("./user-password.model");

const handlePassword = async (req, res) => {
    // const emailmain = userSchema.email
    try {
        const { userId, email, password, newPassword:newPassword } = req.body;
        const userExists = await UserModel.countDocuments({_id: userId });
        const emailExists = await UserModel.countDocuments({emailmain: email });
        const userPassword = await UserModel.countDocuments({password: password})
        if(!userExists || !emailExists){
            return res.status(404).json({
                message: "User not found",
                success: false,
                statusCode: 404
            });
        }
        const {oldPassword: oldPassword} = await PasswordModel.findOne({userId: userId});
        oldPassword.push({newPassword: newPassword})

        const resData = await PasswordModel.replaceOne({userId: userId},
            {
                userId: userId,
                password: oldPassword
            })

            res.status(200).json({
                success: true,
                resData,
                statusCode: 200,
                message:"Password Changed",
            })


    } catch (error) {
        console.log(error.message)
        console.log(error)
        return res.status(404).json({
            message: "something went wrong",
            success: false,
            statusCode: 404,
            error: error.message,
        });
        
    }
}

module.exports = {handlePassword}