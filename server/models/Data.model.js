import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    entity: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
}, { timestamps: true })

const Data = mongoose.model("Data", dataSchema)
export default Data