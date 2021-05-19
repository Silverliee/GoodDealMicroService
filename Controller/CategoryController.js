const express = require('express');
const router = express.Router();
const {categoryModel: categoryModel} = require('../Model/Category');

// Get Request Here
router.get('/', async(req, res) => {
	await categoryModel.find()
		.then(products => res.status(200).json(products))
		.catch(error => res.status(400).json({error}));
});
router.get('/:id', async(req, res) => {
	await categoryModel.findOne({_id: req.params.id})
		.then(product => res.status(200).json(product))
		.catch(error => res.status(404).json({error}));
});
// Post Request Here
router.post('/', async(req, res) => {
	const animal = new categoryModel({
		...req.body
	});
	await animal.save()
		.then(() => res.status(201).json({message: "La catégorie a été crée !"}))
		.catch(error => res.status(400).json({error}));
});
// Put request Here
router.put('/:id', async(req, res) => {
	await categoryModel.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
		.then(() => res.status(201).json({message: "La catégorie a bien été modifié"}))
		.catch(error => res.status(400).json({error}));
});
//Delete Request here
router.delete('/:id', async(req, res) => {
	await categoryModel.deleteOne({_id: req.params.id})
		.then(() => res.status(200).json({message: "La catégorie a bien été supprimé"}))
		.catch(error => res.status(400).json({error}));
});
module.exports = router;