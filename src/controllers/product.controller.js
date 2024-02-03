import { productMondel } from "../models/product.model.js"

export const getProductsController = async (req, res) => {
    try {
        const products = await productMondel.find().exec()
        res.json({ status: 'success', payload: products })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const getProductsIdController = async (req, res) => {
    try {
        const id = req.params.pid
        const result = await productMondel.findById(id).exec()
        if (result == null) {
            res.status(404).json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const createProductController = async (req, res) => {
    try {
        const product = req.body;
        if (!product.name || !product.description || !product.price || !product.category) {
            res.status(205).json({ status: 'error', error: 'all data is necessary' })
        }
        const result = await productMondel.create(product)
        res.json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const editProductIdController = async (req, res) => {
    try {
        const id = req.params.pid
        const data = req.body
        const result = await productMondel.findByIdAndUpdate(id, data)
        if (result == null) {
            return res.status(404), json({ status: 'error', error: 'Not found' })
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const id = req.params.pid
        const result = await productMondel.findByIdAndDelete(id)

        if (result === null) {
            return res.status(404).json({ status: 'error', error: 'not found' })
        }
        res.json({ status: 'success', payload: result })
    } catch (err) {
        return res.status(500).json({ status: 'error', error: err.message })
    }
}