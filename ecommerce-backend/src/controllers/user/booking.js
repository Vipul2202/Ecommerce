const { getBookingConfirmationEmail, getAdminNewBookingEmail } = require('../../../public/Email Templates/forgotpassword');
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
       const confirmationLink=`${process.env.USER_FRONTEND_URL}reset-password/${booking_id}`;
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
exports.confirmBooking = async (req, res) => {
  try {
    const booking_id = req.params.id;

    const booking = await Booking.findOne({ booking_id });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.is_verified = true;
    await booking.save();

    const datatosend = {
      booking_id: booking.booking_id,
      car_type: booking.car_type,
      vehicle_registration: booking.vehicle_registration,
      services: booking.services,
      booking_date: booking.booking_date,
      booking_time: booking.booking_time,
      first_name: booking.first_name,
      last_name: booking.last_name,
      email: booking.email,
      phone: booking.phone,
      booking_status: booking.booking_status,
    };

    const html = getAdminNewBookingEmail(datatosend);

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "You have a new booking",
      html,
    });

    return res.status(200).json({ message: "Booking confirmed successfully" });

  } catch (error) {
    utils.handleError(res, error);
  }
};

