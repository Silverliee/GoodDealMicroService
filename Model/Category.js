const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const categorySchema = new Schema({
	title: String,
});

const categoryModel = mongoose.model('Category',categorySchema);

module.exports = {
	categorySchema,
	categoryModel
}