const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString+file.originalname);
    }
})

const fileFilter = (req, file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype==='image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
    // cb(null, false);
    // cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5 //upto 5 mb
    },
    fileFilter: fileFilter
});

const Product = require('../models/product');

router.get('/', (req, res, next)=>{
    // res.status(200).json({
    //     message: 'Handling GET requests to /products'
    // })
    Product.find()
    .select('name price _id productImage ownerName descriptionRegardingAvailability fuelType seats mobileNumber')
    .exec()
    .then(docs=>{
        console.log(docs);
        const response = {
            count: docs.length,
            products: docs.map(doc=>{
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    ownerName: doc.ownerName,
                    descriptionRegardingAvailability: doc.descriptionRegardingAvailability, 
                    fuelType: doc.fuelType,
                    seats: doc.seats,
                    mobileNumber: doc.mobileNumber,
                    request: {
                        type: 'GET',
                        url: 'http://car-rental-api-node.herokuapp.com/products/'+doc.id
                    }
                }
            })
        }
        if(docs.length>0){
            res.status(200).json(response);
        }else{
            res.status(404).json({
                message: 'No enteries found'
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

router.post('/', upload.single('productImage'), (req, res, next)=>{
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // }
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path,
        ownerName: req.body.ownerName,
        descriptionRegardingAvailability: req.body.descriptionRegardingAvailability, 
        fuelType: req.body.fuelType,
        seats: req.body.seats,
        mobileNumber: req.body.mobileNumber
    });
    product
    .save()
    .then((result)=>{
        console.log(result);
        res.status(201).json({
            message: 'Created Product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result.id,
                ownerName: result.ownerName,
                descriptionRegardingAvailability: result.descriptionRegardingAvailability, 
                fuelType: result.fuelType,
                seats: result.seats,
                mobileNumber: result.mobileNumber,
                request:{
                    type: 'GET',
                    url: 'http://car-rental-api-node.herokuapp.com/products/'+result.id
                }
            }
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    // if(id==='special'){
    //     res.status(200).json({
    //         message: 'You discovered a special ID',
    //         id: id
    //     });
    // }else{
    //      res.status(200).json({
    //          message: 'You passed an ID',
    //      });
    // }
    console.log(id);
    if(id==='sortByPrice'){
        console.log("sort by Price inside");
        Product.find().sort('price')
        .select('name price _id productImage ownerName descriptionRegardingAvailability fuelType seats mobileNumber')
        .exec()
        .then(docs=>{
            console.log(docs);
            const response = {
                count: docs.length,
                products: docs.map(doc=>{
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        ownerName: doc.ownerName,
                        descriptionRegardingAvailability: doc.descriptionRegardingAvailability, 
                        fuelType: doc.fuelType,
                        seats: doc.seats,
                        mobileNumber: doc.mobileNumber,
                        request: {
                            type: 'GET',
                            url: 'http://car-rental-api-node.herokuapp.com/products/'+doc.id
                        }
                    }
                })
            }
            if(docs.length>0){
                // const sortedByPrice = response.sort(function(a,b){
                //     return a.price-b.price
                // });
                res.status(200).json(response);
                // res.status(200).json({
                //     sort: 'Price'
                // })
            }else{
                res.status(404).json({
                    message: 'No enteries found'
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });



    }else if(id==='Petrol'){
        // res.status(200).json({
        //     sort: 'petrol'
        // })

        var total = 0;
        Product.find()
        .select('name price _id productImage ownerName descriptionRegardingAvailability fuelType seats mobileNumber')
        .exec()
        .then(docs=>{
            console.log(docs);
            const response = {
                products: docs.map(doc=>{
                    if(doc.fuelType=='Petrol'){
                        total++;
                        return {
                            name: doc.name,
                            price: doc.price,
                            productImage: doc.productImage,
                            _id: doc._id,
                            ownerName: doc.ownerName,
                            descriptionRegardingAvailability: doc.descriptionRegardingAvailability, 
                            fuelType: doc.fuelType,
                            seats: doc.seats,
                            mobileNumber: doc.mobileNumber,
                            request: {
                                type: 'GET',
                                url: 'http://car-rental-api-node.herokuapp.com/products/'+doc.id
                            }
                        }
                    }
                })
            }
            if(total>0){
                // const sortedByPrice = response.sort(function(a,b){
                //     return a.price-b.price
                // });
                res.status(200).json({count:total,response});
                // res.status(200).json({
                //     sort: 'Price'
                // })
            }else if(total===0){
                res.status(200).json({
                    message: 'No Petrol Vehicles'
                })
            }else{
                res.status(404).json({
                    message: 'No enteries found'
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });


    }else if(id==='Diesel'){
        // res.status(200).json({
        //     sort: 'diesel'
        // })
        var total = 0;
        Product.find()
        .select('name price _id productImage ownerName descriptionRegardingAvailability fuelType seats mobileNumber')
        .exec()
        .then(docs=>{
            console.log(docs);
            const response = {
                // count: docs.length,
                products: docs.map(doc=>{
                    if(doc.fuelType==='Diesel'){
                        total = total+1;
                        return {
                            name: doc.name,
                            price: doc.price,
                            productImage: doc.productImage,
                            _id: doc._id,
                            ownerName: doc.ownerName,
                            descriptionRegardingAvailability: doc.descriptionRegardingAvailability, 
                            fuelType: doc.fuelType,
                            seats: doc.seats,
                            mobileNumber: doc.mobileNumber,
                            request: {
                                type: 'GET',
                                url: 'http://car-rental-api-node.herokuapp.com/products/'+doc.id
                            }
                        }
                    }
                })
            }
            if(total>0){
                // const sortedByPrice = response.sort(function(a,b){
                //     return a.price-b.price
                // });
                res.status(200).json({count:total,response});
                // res.status(200).json({
                //     sort: 'Price'
                // })
            }else if(total===0){
                res.status(200).json({
                    message: 'No Diesel Vehicle'
                })
            }else{
                res.status(404).json({
                    message: 'No enteries found'
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    

    }else if(id==='CNG'){
        // res.status(200).json({
        //     sort: 'CNG'
        // })

        var total = 0;
        Product.find()
        .select('name price _id productImage ownerName descriptionRegardingAvailability fuelType seats mobileNumber')
        .exec()
        .then(docs=>{
            console.log(docs);
            const response = {
                // count: docs.length,
                products: docs.map(doc=>{
                    if(doc.fuelType==='CNG'){
                        total = total+1;
                        return {
                            name: doc.name,
                            price: doc.price,
                            productImage: doc.productImage,
                            _id: doc._id,
                            ownerName: doc.ownerName,
                            descriptionRegardingAvailability: doc.descriptionRegardingAvailability, 
                            fuelType: doc.fuelType,
                            seats: doc.seats,
                            mobileNumber: doc.mobileNumber,
                            request: {
                                type: 'GET',
                                url: 'http://car-rental-api-node.herokuapp.com/products/'+doc.id
                            }
                        }
                    }
                })
            }
            if(total>0){
                // const sortedByPrice = response.sort(function(a,b){
                //     return a.price-b.price
                // });
                res.status(200).json({count:total,response});
                // res.status(200).json({
                //     sort: 'Price'
                // })
            }else if(total===0){
                res.status(200).json({
                    message: 'No CNG Vehicle'
                })
            }else{
                res.status(404).json({
                    message: 'No enteries found'
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });


    }else{


        Product.findById(id)
        .select('name price _id productImage ownerName descriptionRegardingAvailability fuelType seats mobileNumber')
        .exec()
        .then(doc=>{
            console.log("From database "+doc)
            if(doc){
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'To get all products click below link',
                        url : 'http://car-rental-api-node.herokuapp.com/products'
                    }
                });
            }else{
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error: err});
        });
    }
 });

 router.patch('/:productId',(req,res,next)=>{
    // res.status(200).json({
    //     message: 'Updated product',
    // });
    const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
    //   console.log(result);
        res.status(200).json({
            message: 'product updated',
            request: {
                type: 'GET',
                url : 'http://car-rental-api-node.herokuapp.com/products/'+id
            }
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

 router.delete('/:productId',(req,res,next)=>{
    // res.status(200).json({
    //     message: 'deleted product',
    // });
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url : 'http://car-rental-api-node.herokuapp.com/products',
                body : {name: 'String', price: 'Number'}
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

    // router.get('/:sortByPrice',(req, res, next)=>{
    //     res.status(200).json({
            
    //     })
    // })
 });

module.exports = router;