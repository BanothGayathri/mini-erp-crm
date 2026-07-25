"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmployeeOrAdmin = exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({
            message: "Access denied. Admin only."
        });
    }
    next();
};
exports.isAdmin = isAdmin;
const isEmployeeOrAdmin = (req, res, next) => {
    if (req.user?.role === "ADMIN" ||
        req.user?.role === "EMPLOYEE") {
        return next();
    }
    return res.status(403).json({
        message: "Access denied."
    });
};
exports.isEmployeeOrAdmin = isEmployeeOrAdmin;
