const mongoose = require('mongoose')
const PaymentSchema = new mongoose.Schema({
    payment: {type: String, required: true},
    date: {type: String},
    time: {type: String}
},
{collection: 'Payment_method'}
)

const model = mongoose.model('PaymentSchema', PaymentSchema)

module.exports = model