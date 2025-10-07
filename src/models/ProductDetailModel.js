import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({
    img1:{type:String,required:true},
    img2:{type:String,required:true},
    img3:{type:String,required:true},
    img4:{type:String,required:true},
    img1:{type:String},
    img2:{type:String},
    img3:{type:String},
    img4:{type:String},
    des:{type:String,required:true},
    color:{type:String,required:true},
    size:{type:String,required:true},
    productID:{type:mongoose.Schema.Types.ObjectId,required:true},
},
{timestamps:true,versionKey:false}
);
const ProductDetailModel=mongoose.model('productdetails',DataSchema)

export default ProductDetailModel;