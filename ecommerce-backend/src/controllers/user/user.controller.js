const User = require("../../models/user");
const { sendEmail } = require("../../utils/sendemail");
const utils = require("../../utils/utils");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken")
const OTP=require('../../models/otp');
const Country=require('../../models/country')
const { getOtpEmail } = require("../../../public/Email Templates/forgotpassword");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("req.body", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" }); 
    }

    const userExists = await User.findOne({ email });

    console.log("🚀 ~ exports.register= ~ userExists:", userExists);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // console.log("🚀 ~ exports.register= ~ hashedPassword:", hashedPassword)
    const user = await User.create({ name, email, password,step_completd:1 });
    console.log("🚀 ~ exports.register= ~ user:", user);

    const token = utils.generateJwtToken(user._id, "user", "1h");

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ data: userObj, token });
  } catch (error) {
    console.error(error);
    utils.handleError(res, error);
  }
};
exports.updateinfo=async(req,res)=>{
    try {
        const userid=req.user._id
        const data=req.body
        const user=await User.findByIdAndUpdate(userid,data,{new:true})
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        
        
        res.status(200).json({data:user})
    } catch (error) {
        utils.handleError(res,error)
    }
}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);

    const user = await User.findOne({ email: email });
    if (!user) return utils.handleError(res, { message: "Invalid login credentials. Please try again", code: 400 })

    const isPasswordMatch = await utils.checkPassword(password, user)
    console.log("isPasswordMatch", isPasswordMatch);
    if (!isPasswordMatch) {
      return utils.handleError(res, { message: "Invalid login credentials. Please try again", code: 400 })
    }

    let userObj = user.toJSON();
    delete userObj.password;

    const token = utils.generateJwtToken(user._id, "user", "10000000");
    res.json({ code: 200, data: { user: userObj, token } })
  } catch (error) {
    utils.handleError(res, error)
  }
}


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = utils.generateOTP(4);
  const otpData = {
    email: email,
    
    otp: otp,
    is_used: false,
    is_verified: false,
    expiration_time: new Date(Date.now() + 15 * 60 * 1000),
  };
  await OTP.create(otpData);

  
  const html = getOtpEmail(user.name || user.email, otp);

  const emailSent = await sendEmail({
    to: email,
    subject: 'Reset your password',
    html,
  });

  if (emailSent) {
    res.json({ message: "Password reset email sent" });
  } else {
    res.status(500).json({ message: "Failed to send email" });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const data = req.body;
    if(data.email && data.otp){
      const otpData = await OTP.findOne({ otp: data.otp, email: data.email });
    if (!otpData) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpData.expiration_time < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    if (otpData.is_used) {
 return res.status(400).json({ message: "OTP has already been used" });
    }
    if (otpData.is_verified) {
      return res.status(400).json({ message: "OTP has already been verified" });
    }
    otpData.is_used = true;
    otpData.is_verified = true;
    await otpData.save();
    // const user = await User.findOne({ email: data.email });
    // if (!user) {
    //   throw new Error("User not found");
    // }
    // user.password = data.password;
    // await user.save();



    res.json({ message: "otp verified " });
    }

    

  } catch (error) {
    console.error("Error creating FAQ:", error);
    throw error;
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.password = password;
    await user.save();
    res.json({ message: "Password has been successfully reset" });
  } catch (error) {
    utils.handleError(res, error);
  }
}
exports.countryBasicList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const query={}
    if(search){
      query.$or=[
        {name:{$regex:search,$options:"i"}},
        {code:{$regex:search,$options:"i"}}
      ]
    }
    const countryList = await Country.find(query).limit(limit).skip(offset);
    res.json({ data: countryList, code: 200 });
  } catch (error) {
    utils.handleError(res, error);
  }
};


exports.uploadMedia = async (req, res) => {
  try {
    console.log("req.files", req.files);
    if (!req.files?.media || !req.body.path) {
      return utils.handleError(res, {
        message: "MEDIA OR PATH MISSING",
        code: 400,
      });
    }

    const isArray = req.body.isArray === "true";
    const storagePath = `${process.env.STORAGE_PATH}/${req.body.path}`;

    if (Array.isArray(req.files.media)) {
      const mediaArray = await Promise.all(
        req.files.media.map(async (file) => {
          const uploadFunction = file.mimetype.startsWith("image/")
            ? utils.uploadImage
            : utils.uploadFileOrVideo;

          const media = await uploadFunction({ file, path: storagePath });
          return `${req.body.path}/${media}`;
        })
      );

      return res.status(200).json({ code: 200, data: mediaArray });
    } else {
      const file = req.files.media;
      const uploadFunction = file.mimetype.startsWith("image/")
        ? utils.uploadImage
        : utils.uploadFileOrVideo;

      const media = await uploadFunction({ file, path: storagePath });
      const url = `${req.body.path}/${media}`;

      return res.status(200).json({ code: 200, data: isArray ? [url] : url });
    }
  } catch (error) {
   utils.handleError(res, error);
  }
}
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }

    res.json({ data: user, code: 200 });
  } catch (error) {
    utils.handleError(res, error);
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedData = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    
    
    res.json({ data: updatedUser, code: 200, message: "Profile updated successfully" });
  } catch (error) {
    utils.handleError(res, error);
  }
};
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }
    const isPasswordMatch = await utils.checkPassword(oldPassword, user);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Old password is incorrect", code: 400 });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed successfully", code: 200 });
  } catch (error) {
    utils.handleError(res, error);
  }
};





