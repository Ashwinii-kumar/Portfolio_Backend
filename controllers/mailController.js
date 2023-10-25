const nodemailer=require('nodemailer');
const validator=require('validator');
require('dotenv').config();



const transporter=nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
      user: process.env.MAIL_USER,
      pass:process.env.MAIL_PASS,
    }
})

const mailController=async(req,res)=>{

    try {
        
    const {name,email,message}=req.body;
    if(!name || !email || !message){
        return res.status(400).json({
            message:"All field must be set",
        })
    };
    if (!validator.isEmail(email)) {
        return res.status(400).json({
          message: "Email is invalid",
        });
      }

    const mailToYourself={
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: `New contact form submission from ${name}`,
        text: `Email: ${email}\n\nMessage: ${message}`,
    }


    const mailToUser = {
        from: process.env.MAIL_USER,
        to: email, // Use the user's email provided in the form
        subject: 'Confirmation - Your message has been sent',
        text: 'Thank you for contacting me. Your message has been received and I will contact you soon.',
      };

      const [yourselfResponse, userResponse] = await Promise.all([
        transporter.sendMail(mailToYourself),
        transporter.sendMail(mailToUser),
      ]);
  
      if (yourselfResponse.accepted && userResponse.accepted) {
        res.status(200).json({ message: 'Emails sent successfully.' });
      } else {
        res.status(500).json({ message: 'Email sending failed.' });
      }
    







    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error.' });
    }


}


module.exports={mailController};