const router = require("express").Router();
const {
    getAllUsers,
    getOneUser,
createUser,
}=require("../../controllers/userController")

router.route("/").get(getAllUsers).post(createUser)
router.route("/:userId").get(getOneUser)

module.exports=router


