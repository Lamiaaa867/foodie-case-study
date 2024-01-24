
import { Schema ,model} from "mongoose";


const dishSchema=new Schema(
{
        name:{
            type:String,
            lowercase:true,
            required:true,
            unique:true
        },
        desc:{
            type:String,
            required:true,
        }, 
      
price:{
    type:Number,
    required:true,
    default:1,
}
,
appliedDiscount:{
    type:Number,
    default:0
},
priceAfterDiscount:{
    type:Number,  
    default:1
},
available:{
    type:Boolean,
   
    default:'false',
    required:true 
},
updated_by:{
    type:Schema.Types.ObjectId,
    ref:'user',
    required:false,
},
created_by:{
    type:Schema.Types.ObjectId,
    ref:'user',
    required:false, 
},
deleted_by:{
    type:Schema.Types.ObjectId,
    ref:'user',
    required:false,
},
 },
 {
      
        timestamps:true
 }
)
export const dishModel=model('dish',dishSchema);
