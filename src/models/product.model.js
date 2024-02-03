import mongoose from "mongoose";

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: [Number], required: true },
    status: { type: Boolean, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] }
})

mongoose.set("strictQuery", false);
export const productMondel = mongoose.model(productCollection, productSchema)
