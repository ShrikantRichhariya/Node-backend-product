const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config');
const Users = require('./db/Users');
const Products = require('./db/Product');


app.use(express.json());
app.use(cors());


app.post("/register",async(req,res) =>{
   let user = new Users(req.body);
   let result = await user.save();
   res.send(result);
})

app.post("/login",async(req,res) =>{
  
   if(req.body.password && req.body.email) {
     let user =  await Users.findOne(req.body).select("-password");
     if(user){
      res.send(user);
     }else{
       res.send("Please enter correct login credentials");
     }
  
   }

})

app.post ("/add-product",async(req,res) =>{
  let product = new Products(req.body);
  let result = await product.save();
  res.send(result);

})
app.put("/product/:id",async(req,res) =>{

  let result = await Products.updateOne(
    {_id:req.params.id},
    {
      $set:req.body
    }
    )
   res.send(result);
})
app.get("/products",async(req,res) =>{
  let product = await Products.find();
  if(product.length > 0){
    res.send(product)
  } else{
    res.send("product not found")
  }
})

app.get("/product/:id",async(req,res) =>{
  let result = await Products.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  } else{
    res.send("product not found")
  }
})

app.delete("/product/:id",async(req,res) =>{
  let result = await Products.deleteOne({_id:req.params.id});
  res.send(result);
})

app.listen(5000);

