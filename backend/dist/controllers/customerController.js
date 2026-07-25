"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomersPagination = exports.searchCustomers = exports.getCustomers = exports.addCustomer = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Add Customer
const addCustomer = async (req, res) => {
    try {
        const customer = await prisma_1.default.customers.create({
            data: req.body,
        });
        res.status(201).json(customer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding customer" });
    }
};
exports.addCustomer = addCustomer;
// Get All Customers
// Get All Customers with Pagination
const getCustomers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const customers = await prisma_1.default.customers.findMany({
            skip,
            take: limit,
        });
        const total = await prisma_1.default.customers.count();
        res.json({
            page,
            limit,
            total,
            data: customers,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching customers",
        });
    }
};
exports.getCustomers = getCustomers;
// Search Customers
const searchCustomers = async (req, res) => {
    try {
        const name = req.query.name;
        const customers = await prisma_1.default.customers.findMany({
            where: {
                customer_name: {
                    contains: name,
                    mode: "insensitive"
                }
            }
        });
        res.json(customers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error searching customers"
        });
    }
};
exports.searchCustomers = searchCustomers;
const getCustomersPagination = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const total = await prisma_1.default.customers.count();
        const customers = await prisma_1.default.customers.findMany({
            skip,
            take: limit,
        });
        res.json({
            page,
            limit,
            total,
            data: customers,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching customers",
        });
    }
};
exports.getCustomersPagination = getCustomersPagination;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const customers = await prisma_1.default.customers.findMany();
    res.json(customers);
});
exports.default = router;
