const {User}=require("../models")

const userControllers={
    getAllUsers(req, res){
        User.find().select("-__v")
        .then((userData)=>{
            res.json(userData)
        })
       .catch((error)=>{
           console.log (error)
           res.status(500).json(error)
        })
    },
    getOneUser (req, res){
    User.findOne({_id:req.params.userId}).select("-__v").populate("friends").populate("thoughts")
    .then((oneUser)=>{
        if (!oneUser){
            res.status(404).json({message:"no user found with this id"})
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
    //updateUser, deleteUser, addFriend, removeFriend

    
}

module.exports=userControllers