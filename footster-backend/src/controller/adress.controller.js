const User = require('../model/users.model.js');
module.exports = {
  addAddress : async (req,res)=>{
    try {
      const id = req.user.id ;
      const {name , number , pincode , city , adres , state , country} = req.body ;
      if(!name || !number || !pincode || !city || !adres || !state || !country){
        return res.status(400).json({message : "invalid form!",status :400});
      }

      const user = await User.updateOne({_id : id },{
        $set : {
          "address.name" : name,
          "address.number":number,
          "address.pincode":pincode,
          "address.city" :city,
          "address.adres" : adres,
          "address.state" : state,
          "address.country" : country
        }
      });

      res.status(200).json({
        message : "address added successfully!",
        address : user 
      })
    } catch (error) {
      res.status(500).json({message : error.message , status :500});
    }
  }
}