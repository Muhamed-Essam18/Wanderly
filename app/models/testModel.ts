import mongoose from "mongoose";
const queryInput = new mongoose.Schema({
    city: String,
    placeType: String,
    cashKey: String,
    output: mongoose.Schema.Types.Mixed,
});

export default mongoose.models.Places || mongoose.model("Places", queryInput);