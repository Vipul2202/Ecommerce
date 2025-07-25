const mongoose= require('mongoose')
const bookingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    booking_id:{
        type:String
    },
    car_type:{
        type:String
    },
    vehicle_registration:{
        type:String
    },
    services:[
        {
            type:String
        }
    ],
    booking_date:{
        type:Date
    },
    booking_time:{
        type:Date
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    is_verified:{
        type:Boolean,
        default:false

    },
    booking_status:{
        type:String,
        enum:["pending","cancelled","approved","completed"],
        default:"pending"
    },
    booking_cancel_reason:{
        type:String
    },
    message:{
        type:String
    }
},{
    timestamps:true

})
module.exports=mongoose.model('Booking',bookingSchema)