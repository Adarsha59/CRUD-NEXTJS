import mongoose from "mongoose";

// Define the schema with better variable names
const DataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: String, required: true },
});

// Check if the model already exists, otherwise create a new one
const DataModel =
  mongoose.models.DataModel || mongoose.model("DataModel", DataSchema);

export default DataModel;
