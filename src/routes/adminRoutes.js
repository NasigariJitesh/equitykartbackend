const express = require("express");
const router = express.Router();
const uC = require("../controllers/userController");

router.route('/allUserInterests')
    .get(uC.protect(), uC.restrictTo('Admin'), uC.getAllUsersInterestedListings);

module.exports = router;
