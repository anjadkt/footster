module.exports = (req,res,next)=>{
  try {
    const {role} = req.user
    if(role !== "admin")return res.status(401).json({message : "Unauthorized Route!",status : 401});
    next();
  } catch (error) {
    res.status(500).json({message : error.message , status : 500});
  }
}