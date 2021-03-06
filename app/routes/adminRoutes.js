const express = require("express");
const router = express.Router();
const uC = require("../controllers/userController");
const oC= require(`../controllers/organisationsController`);

router.route('/allUserInterests')
    .get(uC.protect(), uC.restrictTo('Admin'), uC.getAllUsersInterestedListings);
router.route('/organisation/:id')
    .patch(uC.protect(), uC.restrictTo('Admin'),oC.updateorganisations)
    .delete(uC.protect(), uC.restrictTo('Admin'),oC.deleteorganisations)

router.route('/add').post(uC.protect(), uC.restrictTo('Admin'),oC.createorganisations);

module.exports = router;
