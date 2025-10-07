import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({

    total:{type:String,required:true},
    vat:{type:String,required:true},
    payable:{type:String,required:true},
    cus_details:{type:String,required:true},
    ship_details:{type:String,required:true},
    tran_id:{type:String,required:true},
    delivery_status:{type:String,required:true},
    payment_status:{type:String,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
    
},
{timestamps:true,versionKey:false}
);
const InvoiceModel=mongoose.model('invoices',DataSchema)

export default InvoiceModel;