import adminModel from "../modals/adminModal.js";
const check=async(req,res)=>{
   try {
    console.log('hiiiiiii')
        res.status(200).json('its working')
   } catch (error) {
    console.log(error)
        res.status(400).json(error)
   }
}

const add=async(req,res)=>{
    console.log(req.body)
    let admin=await adminModel.create({username:req.body.name,password:req.body.pass})
    console.log(admin)
    res.json(admin)
}

export {
    check,
    add
}