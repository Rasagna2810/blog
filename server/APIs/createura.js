const UserAuthor=require('../models/userautherModel')
async function createura(req,res) {
    // get user or author obj from res
    const usea=req.body;
    // find user by email id
    const iu=await UserAuthor.findOne({email:usea.email})//returns null
    if(iu!=null){
        if(iu.role==usea.role)
            return res.status(200).send({message:iu.role,payload:iu})
        else
          return res.status(200).send({message:"Invalid role"})
    }
    else{
        let r=new UserAuthor(usea);
        let newuse=await r.save();
        return res.status(201).send({message:newuse.role,payload:newuse})
    }

    
}
module.exports=createura;