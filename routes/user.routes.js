const express=require("express")
const {UserModel}=require("../model/user.model")

const userRouter=express.Router()


userRouter.post("/",async(req,res)=>{ 
    try{
        const user=new UserModel(req.body)
        await user.save()
        res.status(200).send({"msg":"The new user has been added"})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.get("/",async(req,res)=>{
    try{
        const users=await UserModel.find(req.query)
        res.status(200).send({"msg":"The list of all the users",users})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.patch("/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
        await UserModel.findByIdAndUpdate({_id:userID},req.body)
        res.status(200).send({"msg":`The user with ID:${userID} has been updated`})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.delete("/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
        await UserModel.findByIdAndDelete({_id:userID})
        res.status(200).send({"msg":`The user with ID:${userID} has been deleted`})
    } catch(err){
        res.status(400).send({"error":err})
    }
})

module.exports={
    userRouter
}
