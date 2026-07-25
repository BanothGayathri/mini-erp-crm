"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../config/prisma"));
const jwt_1 = require("../utils/jwt");
// Register User
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await prisma_1.default.users.findUnique({
            where: { email },
        });
        if (existing) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        res.status(201).json({
            message: "User Registered Successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.register = register;
// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.users.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: "Invalid Password",
            });
        }
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        res.json({
            token,
            user,
        });
    }
    catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({
            message: "Server Error",
            error: String(error),
        });
    }
};
exports.login = login;
