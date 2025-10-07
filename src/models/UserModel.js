import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({
    email:{type:String,unique:true,required:true},
    //password:{type:String},
    otp:{type:String,required:true},
},
{timestamps:true,versionKey:false}
);
const UserModel=mongoose.model('users',DataSchema)

export default UserModel;