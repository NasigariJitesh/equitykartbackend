const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password must be there'],
        minlength: 8
    },
    firstName: {
        type: String,
        required: [true, 'Please enter First Name'],
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: Number,
        required: true,
        maxlength: 15
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    token: String,
    role: {
        type: String,
        enum: ["Investor", "Shareholder", "Admin"]
    },
    myInterestedListings: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Organisation'
        }
    ]
})


userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcryptjs.hash(this.password, 12);

    next();
});

userSchema.methods.addInterestedListing = async function(listingId) {
    if(this.myInterestedListings.indexOf(listingId) !== -1){
        return true;
    }   
    this.myInterestedListings = [listingId, ...this.myInterestedListings]
    return true;
}

userSchema.methods.removeInterestedListing = async function(listingId) {
    if(this.myInterestedListings.indexOf(listingId) === -1){
        return true;
    }   
    this.myInterestedListings = [...this.myInterestedListings.filter(id => !id.equals(listingId))]
    return true;
}

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcryptjs.compare(candidatePassword, userPassword);
};


const User = mongoose.model('User', userSchema);

module.exports = User;