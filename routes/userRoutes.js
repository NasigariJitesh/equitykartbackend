const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// router.route('/')
//     .get(userController.getAllUsers)
//     .post(userController.createUser);

// router.route('/:id')
//     .get(userController.getOneUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);


router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);

router.route('/intrestedlistings')
    .get(userController.protect(), userController.getUserInterestedListings);

module.exports = router;
