import nodemailer from 'nodemailer'
export async function sendEmail({to,subject,message,attachments=[]}={}){
    const transporter=nodemailer.createTransport({
        host:'localhost',
        port:587,
        secure:false,
        service:'gmail',
        auth:{
            user:'lamiaaemad1172@gmail.com',
            pass:'mqut anzd zuvn sboj'
        }
    })
    const emailInfo=await transporter.sendMail({
        from:'lamiaaemad1172@gmail.com',
        to:to?to:'',
        subject:subject?subject:'hello',
        html:message?message:'',
        attachments,
    })
    console.log(emailInfo)
    if (emailInfo.accepted.length){
        return true
    }
    return false
    }