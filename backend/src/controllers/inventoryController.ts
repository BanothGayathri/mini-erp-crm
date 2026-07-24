import { Request, Response } from "express";
import prisma from "../config/prisma";

// Get Inventory
export const getInventory = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching inventory",
    });
  }
};

// Update Stock
export const updateStock = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, movement_type, reason } = req.body;

    const product = await prisma.products.findUnique({
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
    } else {
      newStock -= Number(quantity);
    }

    await prisma.products.update({
      where: { id: Number(product_id) },
      data: {
        current_stock: newStock,
      },
    });

    await prisma.stock_movements.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating stock",
    });
  }
};