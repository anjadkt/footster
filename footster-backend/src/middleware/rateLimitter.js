const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
      windowMs : 1000 * 60 * 1,
      max : 5 ,
      message : {
         status : 429,
         message : "Too Many Requests!"
      },
      standardHeaders: true
   });