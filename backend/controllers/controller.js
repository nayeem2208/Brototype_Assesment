import adminModel from "../modals/adminModal.js";
const check=(req,res)=>{
    console.log('haaai')
    res.send('hallo')
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