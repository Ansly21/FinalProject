const mongoose = require('mongoose')
const AddressSchema = new mongoose.Schema({
    Province: {type: String},
    City: {type: String},
    Barangay: {type: String},
    Houseno: {type: String},
    Street: {type: String},
    Landmark: {type: String},
},
{collection: 'Address_Details'}
)

const model = mongoose.model('AddressSchema', AddressSchema)

module.exports = model