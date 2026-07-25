"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelChallan = exports.confirmChallan = exports.getChallans = exports.createChallan = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Create Challan (Draft)
const createChallan = async (req, res) => {
    try {
        const { customer_id, products, created_by } = req.body;
        // Generate challan number
        const challanNumber = "CH-" + Date.now();
        let totalQuantity = 0;
        // create challan
        const challan = await prisma_1.default.challans.create({
            data: {
                challan_number: challanNumber,
                customer_id,
                total_quantity: 0,
                status: "Draft",
                created_by,
                challan_items: {
                    create: products.map((item) => {
                        totalQuantity += item.quantity;
                        return {
                            product_id: item.product_id,
                            product_name: item.product_name,
                            unit_price: item.unit_price,
                            quantity: item.quantity
                        };
                    })
                }
            }
        });
        // update total quantity
        const updatedChallan = await prisma_1.default.challans.update({
            where: {
                id: challan.id
            },
            data: {
                total_quantity: totalQuantity
            }
        });
        res.status(201).json({
            message: "Challan created successfully",
            challan: updatedChallan
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating challan"
        });
    }
};
exports.createChallan = createChallan;
// Get All Challans with Pagination
const getChallans = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const challans = await prisma_1.default.challans.findMany({
            skip: skip,
            take: limit,
            include: {
                customers: true,
                challan_items: true
            }
        });
        const total = await prisma_1.default.challans.count();
        res.json({
            page: page,
            limit: limit,
            total: total,
            data: challans
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching challans"
        });
    }
};
exports.getChallans = getChallans;
const confirmChallan = async (req, res) => {
    try {
        const id = Number(req.params.id);
        // Get challan with items
        const challan = await prisma_1.default.challans.findUnique({
            where: {
                id
            },
            include: {
                challan_items: true
            }
        });
        if (!challan) {
            return res.status(404).json({
                message: "Challan not found"
            });
        }
        // Check stock availability
        for (const item of challan.challan_items) {
            const product = await prisma_1.default.products.findUnique({
                where: {
                    id: item.product_id
                }
            });
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            if ((product.current_stock || 0) < (item.quantity || 0)) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.product_name}`
                });
            }
        }
        // Reduce stock + create movement
        for (const item of challan.challan_items) {
            await prisma_1.default.products.update({
                where: {
                    id: item.product_id
                },
                data: {
                    current_stock: {
                        decrement: item.quantity
                    }
                }
            });
            await prisma_1.default.stock_movements.create({
                data: {
                    product_id: item.product_id,
                    quantity_changed: item.quantity,
                    movement_type: "OUT",
                    reason: "Challan Confirmed",
                    created_by: challan.created_by
                }
            });
        }
        // Update challan status
        const updatedChallan = await prisma_1.default.challans.update({
            where: {
                id
            },
            data: {
                status: "Confirmed"
            }
        });
        res.json({
            message: "Challan confirmed successfully",
            challan: updatedChallan
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error confirming challan"
        });
    }
};
exports.confirmChallan = confirmChallan;
// Cancel Challan
const cancelChallan = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const challan = await prisma_1.default.challans.findUnique({
            where: {
                id
            },
            include: {
                challan_items: true
            }
        });
        if (!challan) {
            return res.status(404).json({
                message: "Challan not found"
            });
        }
        // prevent double cancel
        if (challan.status === "Cancelled") {
            return res.status(400).json({
                message: "Challan already cancelled"
            });
        }
        // Restore stock
        for (const item of challan.challan_items) {
            await prisma_1.default.products.update({
                where: {
                    id: item.product_id
                },
                data: {
                    current_stock: {
                        increment: item.quantity
                    }
                }
            });
            // create stock movement
            await prisma_1.default.stock_movements.create({
                data: {
                    product_id: item.product_id,
                    quantity_changed: item.quantity,
                    movement_type: "IN",
                    reason: "Challan Cancelled",
                    created_by: challan.created_by
                }
            });
        }
        // Update challan status
        const updatedChallan = await prisma_1.default.challans.update({
            where: {
                id
            },
            data: {
                status: "Cancelled"
            }
        });
        res.json({
            message: "Challan cancelled successfully",
            challan: updatedChallan
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error cancelling challan"
        });
    }
};
exports.cancelChallan = cancelChallan;
