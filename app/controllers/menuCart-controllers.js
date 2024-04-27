const MenuCart=require('../models/menuCart-model')
const {validationResult}=require('express-validator')
const menuCartCtrl={}

menuCartCtrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {eventId,itemId,userId}=req.body
    const menuCart=await MenuCart.create({eventId,itemId,userId})
    res.json(menuCart)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
    
}

menuCartCtrl.update=async(req,res)=>{
    try{
        const {eventId,itemId,userId}=req.body
        const updateItem=await MenuCart.findByIdAndUpdate({_id:id},{eventId,itemId,userId},{new:true})
        if (!updatedItem) {
            return res.status(404).json({ message: 'MenuCart item not found' });
          }
      
        res.json(updateItem)
       }catch(err){
    console.log(err)
    res.status(500).json({error:'could not update'})
}
}


menuCartCtrl.remove=async(req,res)=>{
    try{
        const id=req.params.id
        const removeItem=await MenuCart.findByIdAndDelete({_id:id},body,{new:true})
        if (!deletedItem) {
            return res.status(404).json({ message: 'MenuCart item not found' });
          }
          res.json(removeItem)

    } catch(err){
        console.log(err)
        res.status(500).json({error:'could not remove item'})
    }
}

module.exports=menuCartCtrl