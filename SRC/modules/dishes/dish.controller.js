import { dishModel } from "../../../DB/models/dish.model.js";
import { userModel } from "../../../DB/models/user.model.js";
//=================================create dish================
export const createdish = async (req, res, next) => {
const { _id } = req.authUser
const { name
   ,desc
   ,price
   ,available
   ,appliedDiscount
   } = req.body
if (await dishModel.findOne({ name })) {
 return res.status(400).json({message:"the dish is already exist"})
}

const priceAfterDiscount = price * (1 - (appliedDiscount || 0) / 100)
const dishObject = {
  name,
  desc,
  price,
  available,
  appliedDiscount,
  priceAfterDiscount,
  created_by:_id
}

const dish_content = await dishModel.create(dishObject)
if (!dish_content) { 
   return res.status(400).json({message:'try again later , fail to add your dish'})
}

res.status(200).json({ message: 'Added Done', dish_content })
}
//=========get all dishes with chef===========
export const getalldishes=async(req,res,next)=>{
   const alldishes=await dishModel.find()
   return res.status(200).json({message:"dnoe",alldishes})
}
//get specified dish with chef

export const getSpecifieddishes=async(req,res,next)=>{
   const { name} = req.query
   const dish=await dishModel.find({name})
   if(!dish){
      return res.status(400).json({message:"invalid dish name"})
   }
   return res.status(200).json({message:"dnoe",dish})
}
//===============get available dishes by foodie or chef======

export const getAvilabledishes=async(req,res,next)=>{

   const dish=await dishModel.find({available:true})
   if(!dish){
      return res.status(400).json({message:"no avilable dishes"})
   }
   return res.status(200).json({message:"dnoe",dish})
}
//===============chef see his dishes =======================
export const getOwnChefdishes=async(req,res,next)=>{

   const dish=await dishModel.find({created_by:req.authUser._id})
   if(!dish.length){
      return res.status(400).json({message:"invalid dishes for this chef"})
   }
   return res.status(200).json({message:"dnoe",dish})
}
//===================foodies can show disihes for selected user===========
export const getdishesForSelectedCHEEF=async(req,res,next)=>{
   const {created_by} = req.query
   const dish=await dishModel.find({created_by})
   if(!dish.length){
      return res.status(400).json({message:"invalid dishs for this chef"})
   }
   return res.status(200).json({message:"dnoe",dish})
}
//////////////////////////////////////////////////////
//=============delete product===========
export const deleteDish=async(req,res,next)=>{
   //const {created_by}=req.query
 
   const dishExist=await dishModel.findOne({created_by:req.authUser._id})
   if(!dishExist){
      return res.status(400).json({message:"not found"})
   }
     const deletedDish=await dishModel.findByIdAndDelete(dishExist._id)
     if(!deleteDish.length){
      return res.status(400).json({message:"can,t delete" , deleteDish})
     }
    return res.status(200).json({message:'done'})
       }
///===============update their dishes==================
export const updateDish=async(req,res,next)=>{
   //const {created_by}=req.query
 const {name, desc}=req.query
   const dishExist=await dishModel.findOne({created_by:req.authUser._id})
   if(!dishExist){
      return res.status(400).json({message:"not found"})
   }
   
     if(!deleteDish.length){
      return res.status(400).json({message:"can,t delete" , deleteDish})
     }
    return res.status(200).json({message:'done'})
       }

