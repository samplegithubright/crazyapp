// models/Pricing.ts
import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema({
  name: String, // Basic / Pro / Premium
  price: Number,
  duration: String, // monthly / yearly / lifetime
  features: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);