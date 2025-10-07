import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({
    cus_name:{type:String,required:true},
    cus_add:{type:String,required:true},
    cus_city:{type:String,required:true},
    cus_phone:{type:String,required:true},
    cus_state:{type:String},
    cus_postcode:{type:String},
    cus_country:{type:String},
    cus_fax:{type:String},
    ship_name:{type:String,required:true},
    ship_add:{type:String,required:true},
    ship_city:{type:String,required:true},
    ship_phone:{type:String,required:true},
    ship_state:{type:String},
    ship_postcode:{type:String},
    ship_country:{type:String},
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
},
{timestamps:true,versionKey:false}
);
const ProfileModel=mongoose.model('profiles',DataSchema)

export default ProfileModel;