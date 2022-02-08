const model = require(`../../models/user`);

exports.getAllUsers = async (req, res) => {
    try {
        const data = await model.find();
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getAllUsersInterests = async (req, res) => {
    try {
        const data = await model.find().select('-token -verified -password');
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.createUser = async (req, res) => {
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

exports.getOneUser = async (req, res) => {
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

exports.getUserInterestedListings = async (req, res) => {
    try {
        const data = await model.findById(req.params.id).select(myInterestedListings);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.createUserInterestedListing = async (req, res) => {
    try {
        const data = await model.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const data = await model.findByIdAndUpdate(req.params.id);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteUser = async (req, res) => {
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

