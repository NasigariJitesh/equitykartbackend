const mongoose = require('mongoose')

const organisationSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
    },
    company_domain: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
        default: '/placeholder.png'
    },
    registeredName: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: [true, 'PLease provide some description']

    },
    businessModel: {
        type: String,
    },
    investor: [
        {
            name: {
                type: String,
                required: true
            }
        }
    ],
    founding_team: [
        {
            highestQualification: String,
            name: { type: String, required: true, minlemgth: 3 },
            designation: String,
            dateJoined: String
        }
    ],
    foundedOn: {
        type: String
    },
    headQuaters: String,
    branchLocations: [{
        // type: {
        //     type: String,
        //     default: 'Point',
        //     enum: ['Point']
        // },
        // coordinates: [Number],
        address: String,
        description: String
    }],
    fundingHistory: [{
        fundingDate: {
            type: String,
            default: '1987-09-28'
        },
        fundingAmount: {
            type: Number,
        },
        fundedBy: {
            type: String,
        },
        fundingRound: {
            type: String
        }
    }],
    pressRelease: [{
        title: {
            type: String
        },
        publisher: {
            type: String
        },
        date: {
            type: String
        },
        link: {
            type: String,
        },
    }],
    website: String,
    valuation: {
        preMoney: String,
        discounted: String,
        certifiedBy: String,
        currentlyRaising: String
    }

},   {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });


organisationSchema.virtual('totalFunding').get(function(){
    return this.fundingHistory.reduce((total, item) => {
        return total + item.fundingAmount
    }, 0)
})



const Organisation = mongoose.model('Organisation', organisationSchema)

module.exports = Organisation
