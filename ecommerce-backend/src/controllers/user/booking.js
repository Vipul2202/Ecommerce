const { getBookingConfirmationEmail } = require('../../../public/Email Templates/forgotpassword');
const Booking= require('../../models/booking')
const User = require("../../models/user");
const { sendEmail } = require("../../utils/sendemail");
const utils = require("../../utils/utils");
exports.createBooking=async(req,res)=>{
    try {
        const data=req.body
        const booking_id= utils.generateBookingId()
        data.booking_id=booking_id
        const booking=await Booking.create(data)
       const confirmationLink=`${process.env.USER_FRONTEND_URL}reset-password/${token}`;
        const html=getBookingConfirmationEmail(data.first_name,)
        await sendEmail(
      {
        to:data.email,
        subject: "Confirm your booking",
        confirmationLink,
        html
      },
      
    );
        return res.status(201).json({message:"Booking created successfully",booking})

        
    } catch (error) {
        utils.handleError(res, error);
        
    }
}
exports.confirmBooking=async(req,res)=>{
    try {
        const booking_id=req.params.id
        const booking= await Booking.findOne({
            booking_id:booking_id
        })
        if(!booking){
            return res.status(404).json({message:"Booking not found"})
        }
        booking.is_verified=true
        await booking.save()

        
    } catch (error) {
        utils.handleError(res, error);
        
    }
}
