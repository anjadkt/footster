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
  },
  getAddress : async (req,res)=>{
    try {
      const id = req.user.id ;
      const user = await User.findOne({_id : id});

      if (!user) {
        return res.status(404).json({ message: "User not found", status: 404 });
      }
      
      if(user.address){
        return res.status(200).json({
          address : user.address,
          message : "address available!",
          status : 200
        })
      }else{
        return res.status(404).json({
          message : "address not found!",
          status : 200
        });
      }
    } catch (error) {
      res.status(500).json({message : error.message , status : 500});
    }
  }
}