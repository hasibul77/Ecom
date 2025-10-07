import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({

    productID:{type:mongoose.Schema.Types.ObjectId,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
    des:{type:String,required:true},
    rating:{type:String,required:true},
},
{timestamps:true,versionKey:false}
);
const ReviewModel=mongoose.model('reviews',DataSchema)

export default ReviewModel;