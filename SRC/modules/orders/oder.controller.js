import { orderModel } from "../../../DB/models/order.model.js";
import { dishModel } from "../../../DB/models/dish.model.js";


export const createOrder = async (req, res, next) => {
   const userId = req.authUser._id
    const {
      
      dishId,
      quantity,
      address,
      phoneNumbers,
      paymentMethod,
    } = req.body
    // ====================== products check ================
    const dishes = []
    const isdishValid = await dishModel.findOne({
      _id: dishId,
      available:true
    })
    if (!isdishValid) {
     
      return res.status(400).json({message:"invalid dish please check your availability"})
    }
    const dishObject = {
      dishId,
      quantity,
      name: isdishValid.name,
      price: isdishValid.priceAfterDiscount,
      finalPrice: isdishValid.priceAfterDiscount * quantity,
    }
    dishes.push(dishObject)
  
    //===================== subTotal ======================
    const subTotal = dishObject.finalPrice
    //====================== paid Amount =================
    let paidAmount = 0
    paidAmount = subTotal
    //======================= paymentMethod  + orderStatus ==================
    let orderStatus
    paymentMethod == 'cash' ? (orderStatus = 'placed') : (orderStatus = 'pending')
  
    const orderObject = {
      userId,
       dishes,
      address,
      phoneNumbers,
      orderStatus,
      paymentMethod,
      subTotal,
      paidAmount,
     
    }
    const orderDB = await orderModel.create(orderObject)
    if (!orderDB) {
        return res.status(400).json({ message: 'fail to create order'})
     
    }
    return res.status(201).json({ message: 'Done', orderDB  })
  }
 