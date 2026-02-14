import rateLimit from 'express-rate-limit'

export default rateLimit({
      windowMs : 1000 * 60 * 1,
      max : 5 ,
      message : {
         status : 429,
         message : "Too Many Requests!"
      },
      standardHeaders: true
   });