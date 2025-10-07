import mongoose from "mongoose";

const { Schema } = mongoose;

const DataSchema = new Schema({
    brandName: { type: String, unique: true, required: true },
    brandImg: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});

const BrandModel = mongoose.model('brands', DataSchema);

export default BrandModel;
