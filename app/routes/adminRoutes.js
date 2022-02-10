const express = require("express");
const router = express.Router();
const uC = require("../controllers/userController");
const oC= require(`../controllers/organisationsController`);

router.route('/allUserInterests')
    .get(uC.protect(), uC.restrictTo('Admin'), uC.getAllUsersInterestedListings);
router.route('/organisation/:id')
    .put(uC.protect(), uC.restrictTo('Admin'),oC.updateorganisations)
    .delete(uC.protect(), uC.restrictTo('Admin'),oC.deleteorganisations)

router.route('/add').post(oC.createorganisations);

module.exports = router;
