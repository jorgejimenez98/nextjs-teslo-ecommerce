import mongoose, { Model, Schema, model } from 'mongoose'
import { IProduct } from '../interfaces'

const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: '{VALUE} no es un estado permitido'
        },
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
        type: String,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'shirts'
    },
    gender: {
        type: String,
        enum: {
            values: ['men', 'women', 'kid', 'unisex'],
            message: '{VALUE} no es un estado permitido'
        },
    },

    // TODO createdAt
}, { timestamps: true })

// TODO Crear Indice de Mongo

const ProductModel: Model<IProduct> = mongoose.models.Product || model('Product', productSchema)

export default ProductModel