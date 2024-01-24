import { Router } from 'express'
const router = Router()

import * as uc from './user.controller.js'
import { asyncHandler } from '../../utils/errorHandling.js'
import {validationCore} from '../../middlewares/validationCoreFunction.js'
import { logInValidationSchema, signUpSchema } from './user.validation.js'

router.post('/signup', validationCore(signUpSchema) , asyncHandler(uc.SignUp))
router.get('/confirmEmail/:token', asyncHandler(uc.confirmEmail))
router.post('/login',validationCore(logInValidationSchema), asyncHandler(uc.SignIn))

export default router;