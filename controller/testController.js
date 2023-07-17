exports.testController = (req,res)=>{
    const {name}= req.body;
    res.status(200).send(`name is nothing ${name}`)
}