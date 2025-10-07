import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({
    title:{type:String,required:true},
    short_des:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String,required:true},
    productID:{type:mongoose.Schema.Types.ObjectId,required:true},
},
{timestamps:true,versionKey:false}
);
const ProductSliderModel=mongoose.model('product_slider',DataSchema)

export default ProductSliderModel;