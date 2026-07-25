"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStock = exports.getInventory = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Get Inventory
const getInventory = async (req, res) => {
    try {
        const products = await prisma_1.default.products.findMany();
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching inventory",
        });
    }
};
exports.getInventory = getInventory;
// Update Stock
const updateStock = async (req, res) => {
    try {
        const { product_id, quantity, movement_type, reason } = req.body;
        const product = await prisma_1.default.products.findUnique({
            where: { id: Number(product_id) },
        });
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        let newStock = product.current_stock || 0;
        if (movement_type === "IN") {
            newStock += Number(quantity);
        }
        else {
            newStock -= Number(quantity);
        }
        await prisma_1.default.products.update({
            where: { id: Number(product_id) },
            data: {
                current_stock: newStock,
            },
        });
        await prisma_1.default.stock_movements.create({
            data: {
                product_id: Number(product_id),
                quantity_changed: Number(quantity),
                movement_type,
                reason,
            },
        });
        res.json({
            message: "Stock Updated Successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating stock",
        });
    }
};
exports.updateStock = updateStock;
