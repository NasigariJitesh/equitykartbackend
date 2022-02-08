const model = require(`../../models/organisations`);
const Filters = require(`../../Utils/Filters`);

exports.getAllorganisations = async (req, res) => {

    try {
        const filtersObj = new Filters(req.query, model.find());
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
        const data = await model.create(req.body);
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
        const data = await model.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateorganisations = async (req, res) => {
    try {
        const data = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const data = await model.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.creatshowInterest = async (req, res) => {
    try {
        const data = await model.findByIdAndUpdate(req.params.id).select('showInterest');
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteshowInterest = async (req, res) => {
    try {
        const data = await model.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}














