"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.searchProducts = exports.getProducts = exports.addProduct = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Add Product
const addProduct = async (req, res) => {
    try {
        const product = await prisma_1.default.products.create({
            data: req.body,
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error adding product",
        });
    }
};
exports.addProduct = addProduct;
// Get Products with Pagination
const getProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const products = await prisma_1.default.products.findMany({
            skip,
            take: limit,
            orderBy: {
                id: "desc",
            },
        });
        const total = await prisma_1.default.products.count();
        res.json({
            page,
            limit,
            total,
            data: products,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching products",
        });
    }
};
exports.getProducts = getProducts;
// Search Product
const searchProducts = async (req, res) => {
    try {
        const name = req.query.name;
        const products = await prisma_1.default.products.findMany({
            where: {
                product_name: {
                    contains: name,
                    mode: "insensitive",
                },
            },
        });
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error searching products",
        });
    }
};
exports.searchProducts = searchProducts;
// Update Product
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await prisma_1.default.products.update({
            where: {
                id,
            },
            data: req.body,
        });
        res.json({
            message: "Product Updated Successfully",
            product,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating product",
        });
    }
};
exports.updateProduct = updateProduct;
// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.products.delete({
            where: {
                id,
            },
        });
        res.json({
            message: "Product Deleted Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting product",
        });
    }
};
exports.deleteProduct = deleteProduct;
