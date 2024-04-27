const Caterer = require('../models/caterer-model')
const {validationResult} = require('express-validator')
const catererCtrl = {}

catererCtrl.createCatererService = async(req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body = req.body
        console.log(body)
        const catererService = new Caterer(body)
        catererService.userId = req.user._id
        await catererService.save()
        res.status(201).json(catererService)    
    }
    catch(err){
        console.log(err)
        res.status(400).json(err.message)
    }
},
catererCtrl.verify = async(req,res) => {
    try{
        const catererId = req.params.id
        const caterer = await Caterer.findById(catererId)
        if (!caterer) {
            return res.status(404).json({ message: 'Caterer not found' })
        }
        caterer.isVerified = true
        await caterer.save()
        res.status(200).json({ message: 'Caterer verified successfully' });
    }
    catch(err){
        res.status(400).json(err.message)
    }
},
catererCtrl.catererItems = async(req,res) => {
    try{
        const caterers = await Caterer.find()
        res.json(caterers)
    }
    catch(err){
        res.status(400).json(err.message)
    }
},
catererCtrl.catererByLocation = async(req, res) => {
    try{
        const {location} = req.params
        const caterers = await Caterer.find({location: location})
        res.status(200).json(caterers)
    }
    catch(err){
        res.status(400).json(err.messsage)

    }
},
catererCtrl.updateCaterer = async(req,res) => {
    try{
        const id = req.params.id
        const body = req.body
        const caterers = await Caterer.findOneAndUpdate({ _id: id }, body, { new: true })
        res.json(caterers)
    }
    catch(err){
        res.status(400).json(err)
    }
},
catererCtrl.deleteCaterer = async(req,res) => {
    try{
        const id = req.params.id
        const body = req.body
        const caterers = await Caterer.findOneAndDelete({ _id: id }, body, { new: true })
        res.json(caterers)
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = catererCtrl