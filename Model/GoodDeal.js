const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {categorySchema} = require('./Category');
const {organizationSchema} = require('./Organization');

const goodDealSchema = new Schema({
		title: String,
		description: String,
		category: {type: [categorySchema], default: undefined},
		organization: {type: [organizationSchema], default: undefined},
		startDate: String,
		endDate: String,
		Longitude: Number,
		latitude: Number
	}
)

module.exports = mongoose.model('GoodDeal',goodDealSchema);