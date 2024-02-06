const express=require("express")
const {ProductModel}=require("../model/product.model")

const productRouter=express.Router()


productRouter.post("/",async(req,res)=>{ 
    try{
        const product=new ProductModel(req.body)
        await product.save()
        res.status(200).send({"msg":"The new product has been added"})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

productRouter.get("/",async(req,res)=>{
    try{
        const products=await ProductModel.find(req.query)
        res.status(200).send({"msg":"The list of all the products",products})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

module.exports={
    productRouter
}
