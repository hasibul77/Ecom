import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({
    name:{type:String,required:true},
    img:{type:String,required:true},
    description:{type:String,required:true},
},
{timestamps:true,versionKey:false}
);
const FeatureModel=mongoose.model('feature',DataSchema)

export default FeatureModel;