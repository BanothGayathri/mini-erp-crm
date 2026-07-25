"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardCounts = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getDashboardCounts = async (req, res) => {
    try {
        const customers = await prisma_1.default.customers.count();
        const products = await prisma_1.default.products.count();
        const inventory = await prisma_1.default.products.count();
        const challans = await prisma_1.default.challans.count();
        res.json({
            customers,
            products,
            inventory,
            challans,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching dashboard"
        });
    }
};
exports.getDashboardCounts = getDashboardCounts;
