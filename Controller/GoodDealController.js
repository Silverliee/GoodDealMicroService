const express = require('express');
const router = express.Router();
const goodDealModel = require('../Model/GoodDeal');
const {getGeocodeInformations} = require('../middleware/GoogleMapService');

// Get Request Here
router.get('/', async(req, res) => {
	await goodDealModel.find()
		.then(products => res.status(200).json(products))
		.catch(error => res.status(400).json({error}));
});
router.get('/department',async(req,res) => {
	const goodDeals = await goodDealModel.find();
	if(goodDeals.length === 0) {
		res.status(200).json({message: "IL y a une erreur, veuillez contacter l'équipe StudHelp"});
	}
	let goodDealInTheDepartment = [];
	for (let i = 0; i < goodDeals.length; i++) {
		let goodDealDepartment = await getGeocodeInformations(goodDeals[i].address).then(r => r.data.results[0].address_components[3].long_name);
		if(req.body.department === goodDealDepartment) {
			goodDealInTheDepartment.push(goodDeals[i]);
		}
	}
	res.status(200).json(goodDealInTheDepartment);
})
router.get('/:id', async(req, res) => {
	await goodDealModel.findOne({_id: req.params.id})
		.then(product => res.status(200).json(product))
		.catch(error => res.status(404).json({error}));
});
// Post Request Here
router.post('/', async(req, res) => {
	const goodDeal = new goodDealModel({
		...req.body
	});
	await goodDeal.save()
		.then(() => res.status(201).json({message: "Le bon plan a été crée !"}))
		.catch(error => res.status(400).json({error}));
});
// Put request Here
router.put('/:id', async(req, res) => {
	await goodDealModel.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
		.then(() => res.status(201).json({message: "Le bon plan a bien été modifié"}))
		.catch(error => res.status(400).json({error}));
});
//Delete Request here
router.delete('/:id', async(req, res) => {
	await goodDealModel.deleteOne({_id: req.params.id})
		.then(() => res.status(200).json({message: "Le bon plan a bien été supprimé"}))
		.catch(error => res.status(400).json({error}));
});
module.exports = router;