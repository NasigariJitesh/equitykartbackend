const express = require("express");
const router = express.Router();
const {
    getAllorganisations,
    createorganisations,
    getOneorganisations,
    updateorganisations,
    deleteorganisations,
    showInterest,
    removeInterest
} = require(`../controllers/organisationsController`);
const { protect } = require("../controllers/userController");

router.route('/')
    .get(getAllorganisations)
    .post(createorganisations);

router.route('/:id')
    .get(protect(true), getOneorganisations)
router.route('/:id/interested')
    .post(protect(), showInterest)
    .delete(protect(), removeInterest);
    
module.exports = router;
