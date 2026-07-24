import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboardCounts = async (
  req: Request,
  res: Response
) => {
  try {
    const customers = await prisma.customers.count();

    const products = await prisma.products.count();

    const inventory = await prisma.products.count();

    const challans = await prisma.challans.count();

    res.json({
      customers,
      products,
      inventory,
      challans,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching dashboard"
    });

  }
};