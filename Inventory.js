const fs=require('fs');

class Product{
    constructor(id,name,price,quantity,expiryDate,category,supplier){
        this.id=id;
        this.name=name;
        this.price=price;
        this.quantity=quantity;
        this.expiryDate=expiryDate;
        this.category=category;
        this.supplier=supplier;
    }

    show(){
        return{
            id:this.id,
            name:this.name,
            price:this.price,
            quantity:this.quantity,
            expiryDate:this.expiryDate,
            category:this.category,
            supplier:this.supplier
        }
    }
    

}

class Category{
    constructor(name){
        this.name=name;
        this.subcategory=new Set();
    }
    addsub(sub){
        this.subcategory.add(sub);
    }
    show(){
        return{
            name:this.name,
            subcategory:[...this.subcategory]
        }
    }
}

class Suppliers{
    constructor(name,contact){
        this.name=name;
        this.contact=contact;
        this.products=new Set();
    }
    addProduct(productname){
        this.products.add(productname);
    }

    show(){
        return{
            id:this.id,
            name:this.name,
            contact:this.contact,
            products:[...this.products]
        }
    }
}


class Inventory{

    constructor(){
        this.products=new Map();
        this.categories=new Map();
        this.suppliers=new Map();
    }

    addproduct(product){

        //Add products to the map
        if(this.products.has(product.id)){
            console.log("Product already exists");
            return;
        }
        else{
            this.products.set(product.id,product);
        }

        //Add suppliers and the object to the suppliers map

        if(!this.suppliers.has(product.supplier.id)){
            this.suppliers.set(product.supplier, new Suppliers(product.supplier, "", ""));
        }
        // Add product to the suppliers 
        this.suppliers.get(product.supplier).addProduct(product.id);

        //Add subcategories to the categories

        if(!this.categories.has(product.category)){
            this.categories.set(product.category,new Category(product.category))
        }

        this.categories.get(product.category).addsub(product.category)
        //display products
         if(this.products.size==0){
            console.log("No products available");
         }
         else{

            this.products.forEach((product) => {
                console.log(`${product.name},${product.quantity}`);
            
            });

            }}

           
        retrieve (productName){
           const product=[...this.products.values()].find((product) => product.name==productName);
              if(product){
                product.display();
              }
              else{
                console.log("Product not found");
              }


        }

        //get data from file

        writefile(filename){
            const inventory={
               "products": [...this.products.values()].map((product) => product.show()),
                "suppliers": [...this.suppliers.values()].map((supplier) => supplier.show()),
                "categories": [...this.categories.values()].map((category) => category.show()),
            }
            fs.writeFileSync(filename,JSON.stringify(inventory,null,4));
        }




    }

function exec(){

    const In=new Inventory();

    const product1=new Product("3","Milk",50,100,"05-12-2021","Dairy","Supplier1");
    const product2=new Product("4","pepper",100,200,"12-12-2023","food","Supplier2");
    In.addproduct(product1);
    In.addproduct(product2);
    In.retrieve("Milk");
    In.retrieve("pepper");
    In.writefile("Inventory.json");


}

exec();

    

    



