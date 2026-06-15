import mongoose from "mongoose";
const queryInput = new mongoose.Schema({
    city: String,
    placeType: String,
    cashKey: String,
    output: mongoose.Schema.Types.Mixed,
});
queryInput.index({ city: 1, placeType: 1, cashKey: 1, output: 1 }, { unique: true });
export default mongoose.models.Places || mongoose.model("Places", queryInput);