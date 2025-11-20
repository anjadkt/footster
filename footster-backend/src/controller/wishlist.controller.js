const User = require('../model/users.model.js');

module.exports = {
  showList : async (req,res)=>{

    try{
      const {favorite} = await User.findById(req.user.id).populate("favorite");
      res.status(200).json({
        favorite,
        message : "favorite list send!",
        status : 200
      });

    }catch(error){
      res.status(500).json({message : error.message , status : 500});
    }

  },
  addFav : async (req,res)=>{
    try {
      const {id} = req.body ;

      const exist = await User.findOne({_id : req.user.id , "favorite" : id});
      if(exist)return res.status(409).json({message : "Product already in wishlist!",status : 409});

      const {favorite} = await User.findByIdAndUpdate(req.user.id,{$push : {
        favorite : id
      }});

      res.status(200).json({
        message : "product added to wishlist!",
        status : 200
      });

    } catch (error) {
      res.status(500).json({message : error.message , status : 500})
    }
  },
  removeFav : async (req,res)=>{
    try {
      const {id} = req.body ;
      const user = await User.findById(req.user.id) ;
      const newFav = user.favorite.filter(p => p.toString() !== id );
      if(newFav.length === user.favorite.length)return res.status(404).json({message : "no Product found",status : 404});
      user.favorite = newFav ;
      await user.save();
      res.status(200).json({
        message : "Product removed from wishList",
        status : 200
      })
    } catch (error) {
      res.status(500).json({message : error.message , status : 500});
    }

  }
}