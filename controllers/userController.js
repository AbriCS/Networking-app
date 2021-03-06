const {User}=require("../models")

const userControllers={
    getAllUsers(req, res){
        User.find().select("-__v")
        .then((userData)=>{
            res.json(userData)
        })
       .catch((error)=>{
           console.log (error)
           return res.status(500).json(error)
        })
    },
    getOneUser (req, res){
    User.findOne({_id:req.params.userId}).select("-__v").populate("friends").populate("thoughts")
    .then((oneUser)=>{
        if (!oneUser){
            return res.status(404).json({message:"no user found with this id"})
        }
        res.json(oneUser)
    })
    .catch((error)=>{
        console.log (error)
        res.status(500).json(error)
     })
    },
    createUser(req, res){
        User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res){
        User.findOneAndUpdate({_id:req.params.userId},{$set:req.body},{new:true})
        .then((upUser)=>{
            if (!upUser){
                return res.status(404).json({message:"no user found with this id"})   
            }
            res.json(upUser)
        }) .catch((err) => res.status(400).json(err));
    },

    deleteUser(req, res){
        User.findOneAndDelete({_id:req.params.userId})
        .then((delUser)=>{
            if (!delUser){
       
       return res.status(404).json({message:"no user found with this id"})       
            }
            res.json(delUser)
        }).catch((err) => res.status(400).json(err));
    },

    addFriends(req, res){
    User.findOneAndUpdate({_id:req.params.userId},{$addToSet:{friends:req.params.friendId}},{new:true})
    .then((newFriend)=>{
    console.log (newFriend)
        if(!newFriend){
            return res.status(404).json({message:"no user found with this id"})  
        }
        res.json(newFriend)
    }).catch((err) => res.status(400).json(err));

   },

    removeFriends(req, res){
        User.findOneAndUpdate({_id:req.params.userId}, {$pull:{friends:req.params.friendId}},{new:true})
        .then((removeFriend)=>{
            if(!removeFriend){
                return res.status(404).json({message:"no user found with this id"})     
            }
            res.json(removeFriend)
        }).catch((err)=> res.status(400).json(err));
    }
    
}


module.exports=userControllers