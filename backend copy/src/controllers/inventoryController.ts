import { Request, Response } from "express";
import prisma from "../config/prisma";


// Stock IN
export const stockIn = async (req: Request, res: Response) => {

  try {

    const {
      product_id,
      quantity_changed,
      reason,
      created_by
    } = req.body;


    // Update product stock
    const product = await prisma.products.update({

      where:{
        id: product_id
      },

      data:{
        current_stock:{
          increment: quantity_changed
        }
      }

    });


    // Create movement history
    const movement = await prisma.stock_movements.create({

      data:{
        product_id,
        quantity_changed,
        movement_type:"IN",
        reason,
        created_by
      }

    });


    res.status(201).json({
      message:"Stock added successfully",
      product,
      movement
    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      message:"Error adding stock"
    });

  }

};



// Stock OUT
export const stockOut = async (req: Request,res:Response)=>{


try{


const {
product_id,
quantity_changed,
reason,
created_by
}=req.body;



const product = await prisma.products.findUnique({

where:{
id:product_id
}

});



if(!product){

return res.status(404).json({
message:"Product not found"
});

}



if((product.current_stock || 0) < quantity_changed){

return res.status(400).json({

message:"Insufficient stock"

});

}




// Reduce stock

const updatedProduct = await prisma.products.update({

where:{
id:product_id
},

data:{

current_stock:{
decrement:quantity_changed
}

}

});



// Save movement

const movement = await prisma.stock_movements.create({

data:{

product_id,

quantity_changed,

movement_type:"OUT",

reason,

created_by

}

});


res.json({

message:"Stock removed successfully",

updatedProduct,

movement

});



}catch(error){

console.log(error);

res.status(500).json({

message:"Error removing stock"

});

}


};




// Stock History

export const getStockHistory = async(req:Request,res:Response)=>{


try{


const history = await prisma.stock_movements.findMany({

include:{
products:true,
users:true
}

});


res.json(history);



}catch(error){

console.log(error);

res.status(500).json({

message:"Error fetching stock history"

});

}


};