import { Request, Response } from "express";
import prisma from "../config/prisma";

// Add Customer
export const addCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await prisma.customers.create({
      data: req.body,
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding customer" });
  }
};

// Get All Customers
// Get All Customers with Pagination

export const getCustomers = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const customers = await prisma.customers.findMany({
      skip,
      take: limit,
    });

    const total = await prisma.customers.count();

    res.json({
      page,
      limit,
      total,
      data: customers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching customers",
    });
  }
};
// Search Customers
export const searchCustomers = async (
req: Request,
res: Response
) => {

try {

const name = req.query.name as string;


const customers = await prisma.customers.findMany({

where:{
customer_name:{
contains:name,
mode:"insensitive"
}
}

});


res.json(customers);


}
catch(error){

console.log(error);

res.status(500).json({

message:"Error searching customers"

});

}

};
export const getCustomersPagination = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const total = await prisma.customers.count();

    const customers = await prisma.customers.findMany({
      skip,
      take: limit,
    });

    res.json({
      page,
      limit,
      total,
      data: customers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching customers",
    });
  }
};
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const customers = await prisma.customers.findMany();
  res.json(customers);
});

export default router;