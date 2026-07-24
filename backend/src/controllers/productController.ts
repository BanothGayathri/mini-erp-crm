import { Request, Response } from "express";
import prisma from "../config/prisma";

// Add Product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.products.create({
      data: req.body,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding product",
    });
  }
};

// Get Products with Pagination
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await prisma.products.findMany({
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    const total = await prisma.products.count();

    res.json({
      page,
      limit,
      total,
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching products",
    });
  }
};

// Search Product
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    const products = await prisma.products.findMany({
      where: {
        product_name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error searching products",
    });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.products.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.json({
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating product",
    });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.products.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting product",
    });
  }
};