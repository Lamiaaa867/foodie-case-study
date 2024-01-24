import { Router } from 'express'
import { asyncHandler } from '../../utils/errorHandling.js'
import * as orderController from './oder.controller.js'
import { isAuth } from '../../middlewares/isAuthentecated.js'

 import { dishApisRoles } from './orderEndpoints.js'
 const router = Router()
 router.post(
    '/order_dish',
   isAuth(dishApisRoles.CREATE_ORDER),
    asyncHandler(orderController.createOrder),
  )
  export default router