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
        Thought.findOneAndUpdate({_id:req.params.thoughtId},{$set:req.body},{runValidators:true, new:true})
        .then((upThought)=> {
            if (!upThought){
                return res.status(404).json({message:"no thought found with this id"})

            }
            res.json(upThought)
        }) .catch((err)=> res.status(400).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((delthought) =>
            !delthought
              ? res
                  .status(404)
                  .json({ message: "No thought found with this id." })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message:
                    "Thought deleted, but found no user with this ID . Try again!",
                })
              : res.json({ message: "Thought successfully created!" })
          )
          .catch((err) => res.status(500).json(err));
      },
    
      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: "No thought found with this id!  Try again." })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      removeReaction(req, res) {
        Thought.findByIdAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({
                  message:
                    "Reaction deleted, but found no user with this ID.",
                })
              : res.json({ message: "Reaction successfully removed." })
          )
          .catch((err) => res.status(500).json(err));
      },
    
    
    
    
    
    
    
    



}
module.exports=thoughtController