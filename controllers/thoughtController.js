const {Thought, User}=require("../models")

const thoughtController = {
    getAllThoughts(req,res) {
        Thought.find()
        .then((thought)=>{
            res.json(thought)
        })
        .catch((error)=> {
            console.log (error)
            return res.status (500).json (error)
        })
    },

    getOneThought (req, res){
        Thought.findOne({_id:req.params.thoughtId})
        .then ((oneThought)=>{
            if (!oneThought){
                return res.status(404).json({message:"no thought found with this id"})
            }
            res.json(oneThought)
        })
        .catch((error)=>{
            console.log (error)
        })
    },

    createThought (req, res){
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {_id:req.body.userId},
                {$push:{thoughts:thought._id}},
                {new:true}
            )
        }).then ((user)=>{
            if(!user){
                return res.status(404).json({message:"thought created but no user with this Id was found"})
            }
            res.json("Thought successfully created")
        })
        .catch((err)=> res.status(500).json(err));
    },

    updateThought(req, res){
        Thought.findOneAndUpdate({_id:req.params.thoughtId},{$set:req.body},{new:true})
        .then((upThought)=> {
            if (!upThought){
                return res.status(404).json({message:"no thought found with this id"})

            }
            res.json(upThought)
        }) .catch((err)=> res.status(400).json(err));
    },

    deleteThought(req, res){
        Thought.findOneAndDelete({_id:req.params.thoughtId})
        .then((delThought)=>{
            if (!delThought){
       
       return res.status(404).json({message:"no thought found with this id"})       
            }
            res.json(delThought)
        }).catch((err) => res.status(400).json(err));
    },


}
module.exports=thoughtController