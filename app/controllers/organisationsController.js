const Organisation = require(`../models/organisations`);
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/catchAsync");
const Filters = require(`../utils/Filters`);

exports.getAllorganisations = async (req, res) => {

    try {
        const filtersObj = new Filters(req.query, Organisation.find());
        const query = filtersObj.filter().sort().selectFields().mongoQuery;
        const data = await query;

        res.status(200).json({
            status: "success",
            results: data.length,
            data
        });
    } catch (error) {
        console.log(error);
    }
}

exports.createorganisations = async (req, res) => {
    try {
        const data = await Organisation.create(req.body);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getOneorganisations = async (req, res) => {
    try {
        const data = await Organisation.findById(req.params.id);
        const alreadyInterested = req.user && req.user.myInterestedListings.indexOf(data._id) !== -1
        res.status(200).json({
            status: "success",
            data,
            alreadyInterested
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateorganisations = async (req, res) => {
    try {
        const data = await Organisation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteorganisations = async (req, res) => {
    try {
        const data = await Organisation.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.showInterest = CatchAsync(async (req, res) => {

    const oragnization = await Organisation.findById(req.params.id)
    if (!oragnization) {
        return next(new AppError('Organization does not exist', 404))
    }
    req.user.addInterestedListing(req.params.id)
    await req.user.save()
    res.status(200).json({
        status: "success"
    })

})

exports.removeInterest = CatchAsync(async (req, res) => {

    const organisation = await Organisation.findById(req.params.id)
    if (!organisation) {
        return next(new AppError('Organization does not exist', 404))
    }
    req.user.removeInterestedListing(req.params.id)
    await req.user.save()
    res.status(200).json({
        status: "success"
    })

})














