import { Router } from 'express'
import { asyncHandler } from '../../utils/errorHandling.js'
import * as dishController from './dish.controller.js'
import { isAuth } from '../../middlewares/isAuthentecated.js'
 import { systemRoles } from '../../utils/system.role.js'
 import { dishApisRoles } from './disiEndpoints.js'
 const router = Router()
 router.post(
    '/add_dish',
    isAuth(dishApisRoles.CREATE_DISH),
    asyncHandler(dishController.createdish),
  )
  //get dishes with chef
  router.get(
    '/getall',
    isAuth(dishApisRoles.GETALL_DISH),
    asyncHandler(dishController.getalldishes),
  )
  //==============get specified dish
  router.get(
    '/get',
    isAuth(dishApisRoles.GETALL_DISH),
    asyncHandler(dishController.getSpecifieddishes),
  )
  //============avilable dishes==================
  router.get(
    '/getAV',
    isAuth(dishApisRoles.GET_AVILABLE),
    asyncHandler(dishController.getAvilabledishes),
  )
  //===============get chef dishes 
  router.get(
    '/getown',
    isAuth(dishApisRoles.GETALL_OWNDISH),
    asyncHandler(dishController.getOwnChefdishes),
  )
  //==================get chef disihes
  router.get(
    '/getChef',
    isAuth(dishApisRoles.GET_SPECIFICDISHES),
    asyncHandler(dishController.getdishesForSelectedCHEEF),
  )
  ///delete dish ========
  router.delete(
    '/del',
    isAuth(dishApisRoles.DELETE_DISH),
    asyncHandler(dishController.deleteDish),
  )
  export default router