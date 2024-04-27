const Enquiry=require('../models/enquiry-model')
const {validationResult}=require('express-validator')
const enquiryCltr={}

enquiryCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {customerId,catererId,message}=req.body
        const enquiry=await Enquiry.create({customerId,catererId,message})
        res.status(200).json(enquiry)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

enquiryCltr.update=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    try{
        const id=req.params.id
        const body=req.body
        const updateEnquiry=await Enquiry.findOneAndUpdate({_id:id},body,{new:true})
        res.json(updateEnquiry)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

enquiryCltr.delete=async(req,res)=>{
    try{
        const id =req.params.id
        const body=req
        const deleteEnquiry=await Enquiry.findOneAndDelete({_id:id},body,{new:true})
        res.json(deleteEnquiry)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}

enquiryCltr.list=async(req,res)=>{
    try{
        const listEnquiry=await Enquiry.find()
        res.json(listEnquiry)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}
enquiryCltr.response=async(req,res)=>{
   const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })

        }
        try{
            const {_id,response}=req.body
            const responseEnquiry=await Enquiry.findOneAndDelete(_id,{response:response},{new:true})
            res.json(responseEnquiry)
    }catch(err){
        console.Console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}
module.exports=enquiryCltr