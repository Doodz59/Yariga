import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    propertyType: { type: String, required: true },
    location: { type: String, required: true },
    lat: { type: Number, required: true },
    lng : { type: Number, required: true},
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const propertyModel = mongoose.model("Property", PropertySchema);

export default propertyModel;