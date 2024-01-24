
import { connectDB } from "../../DB/dbConnection.js"
import * as routers from '../modules/indexroutes.js'
export const iniateApp=(app,express)=>{
    const port =process.env.port
    app.use(express.json())
connectDB()
app.use('/user',routers.userRouter)
app.use('/dish',routers.dishRouters)
app.use('/order',routers.orderRouters)
app.all('*',(req,res,next)=>
res.status(404).json('URL NOT FOUND')
)


//changeCouponStatus()
app.listen(port,(req,res,next)=>{
console.log(`app lisening on ${port}`)
})
}