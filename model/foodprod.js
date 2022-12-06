const mongoose = require('mongoose')
const FoodSchema = new mongoose.Schema({
    food_id: {type: Number, required: true, unique: true},
    food_name: {type: String, required: true, unique: true},
    food_description: {type: String, required: true},
    food_price: {type: String, required: true},
},
{collection: 'Food_Product'}
)

const model = mongoose.model('FoodSchema', FoodSchema)

module.exports = model