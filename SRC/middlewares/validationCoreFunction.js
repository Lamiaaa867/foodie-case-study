const reqmethods=['body','params','query','file','files']
export const validationCore=(schema)=>{
    return(req,res,next)=>{
        const validationError=[]
        for (const key of reqmethods){
            if(schema[key]){
            const validationResult=schema[key].validate(req[key],{abortEarly:false});
            if(validationResult.error){
                validationError.push(validationResult.error.details)
            }

            }
        }
        if(validationError.length){
           return res.status(400).json({message:'error',Error:validationError})
        }
        next()
    }
}