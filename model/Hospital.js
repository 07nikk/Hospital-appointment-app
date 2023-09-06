import mongoose from "mongoose";

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    distance:{
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min : 0,
        max : 5
    },
    doctors:{
        type:[String]
    }
    
});

export default mongoose.model("Hospital", hospitalSchema);