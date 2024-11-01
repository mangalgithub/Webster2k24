import mongoose from "mongoose";

const notificationSchema=new mongoose.Schema({
   productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
   },
   customerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Customer"
   },
   designerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Designer"
   },
   isRead:{
      type:Boolean,
   }
})

export const Notification=mongoose.model("Notification",notificationSchema);