import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      message: "Access denied. Admin only."
    });
  }

  next();
};

export const isEmployeeOrAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.user?.role === "ADMIN" ||
    req.user?.role === "EMPLOYEE"
  ) {
    return next();
  }

  return res.status(403).json({
    message: "Access denied."
  });
};
