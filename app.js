const express = require('express');
const app = express();
//import port from env
const port = process.env.PORT || 3000;
const fs = require('fs');

const data= JSON.parse(fs.readFileSync('Inventory.json'));



app.get('/products',(req,res)=>{
    res.send(data.products);
});


//Get expiry date

app.get('/expirydate/:productName',(req,res)=>{
    productName=req.params.productName;
    console.log(productName);
    const product=data.products.find((prod) => prod.name.toLowerCase()==productName.toLowerCase());
    if(product){
        res.send(product.expiryDate);
    }
    else{
        res.send("Product not found");
    }
});



app.get('/', (req, res) => {
    console.log("Hello world");
    res.send("Hello");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

