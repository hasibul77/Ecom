import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({
    title:{type:String,required:true},
    short_des:{type:String,required:true},
    price:{type:String,required:true},
    discount:{type:Boolean,required:true},
    discount_price:{type:String,required:true},
    image:{type:String,required:true},
    stock:{type:Boolean,required:true},
    star:{type:String},
    remark:{type:String,required:true},
    categoryID:{type:mongoose.Schema.Types.ObjectId,required:true},
    brandyID:{type:mongoose.Schema.Types.ObjectId,required:true},

},
{timestamps:true,versionKey:false}
);
const ProductModel=mongoose.model('products',DataSchema)

export default ProductModel;