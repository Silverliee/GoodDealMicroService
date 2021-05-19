const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const organizationSchema = new Schema({
	name: String,
});

const organizationModel = mongoose.model('Organization',organizationSchema);

module.exports = {
	organizationSchema,
	organizationModel
}