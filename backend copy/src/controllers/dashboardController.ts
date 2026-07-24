import { Request, Response } from "express";
import prisma from "../config/prisma";


export const getDashboard = async (
req: Request,
res: Response
)=>{

try{

const totalCustomers =
await prisma.customers.count();


const totalProducts =
await prisma.products.count();


const totalChallans =
await prisma.challans.count();


const confirmedChallans =
await prisma.challans.count({
where:{
status:"Confirmed"
}
});


const cancelledChallans =
await prisma.challans.count({
where:{
status:"Cancelled"
}
});


const lowStockProducts =
await prisma.products.count({

where:{
current_stock:{
lte: prisma.products.fields.minimum_stock
}
}

});


res.json({

totalCustomers,
totalProducts,
totalChallans,
confirmedChallans,
cancelledChallans,
lowStockProducts

});


}
catch(error){

console.log(error);

res.status(500).json({

message:"Error loading dashboard"

});

}

};