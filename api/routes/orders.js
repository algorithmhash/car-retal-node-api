const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

router.get('/',(req,res,next)=>{
    // res.status(200).json({
    //     message: 'Orders were fetched'
    // });
    Order.find()
    .select('product quantity _id name price productImage ownerName descriptionRegardingAvailability fuelType seats mobileNumber')
    .populate('product', 'name')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc=>{
                return {
                    _id : doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    ownerName: doc.ownerName,
                    descriptionRegardingAvailability: doc.descriptionRegardingAvailability,
                    fuelType: doc.fuelType,
                    seats: doc.seats,
                    mobileNumber: doc.mobileNumber,
                    request : {
                        type : 'GET',
                        url: 'http://localhost:3000/orders/'+doc._id
                    }
                }
            }),
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
});

router.post('/',(req,res,next)=>{
    // const order = {
    //     productId: req.body.productId,
    //     quantity: req.body.quantity
    // }
    Product.findById(req.body.productId)
    .then(product=>{
        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }else{
            const order = new Order({
                _id: req.body.productId,
                quantity: req.body.quantity,
                // product: req.body.productId,
                productImage: product.productImage,
                name: product.name,
                price: product.price,
                ownerName: product.ownerName,
                descriptionRegardingAvailability: product.descriptionRegardingAvailability,
                fuelType: product.fuelType,
                seats: product.seats,
                mobileNumber: product.mobileNumber
            });
            return order
            .save()
            .then(result=>{
                    Product.deleteOne({_id: req.body.productId})
                    .exec()
                    .then(result=>{
                            res.status(200).json({
                                message: 'Order placed',
                            createdOrder: {
                                _id: result._id,
                                product: product.product,
                                quantity: product.quantity,
                                productImage: product.productImage,
                                name: product.name,
                                price: product.price,
                                ownerName: product.ownerName,
                                descriptionRegardingAvailability: product.descriptionRegardingAvailability,
                                fuelType: product.fuelType,
                                seats: product.seats,
                                mobileNumber: product.mobileNumber
                            },
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/orders/'+result._id
                            },
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
    // res.status(201).json({
    //     message: 'Orders were created',
    //     order: order
    // });
});

router.get('/:orderId',(req,res,next)=>{
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order=>{
        if(!order){
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                description : 'GET DETAILS OF ALL ORDERS by below link',
                url: 'http://localhost:3000/orders'
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
    // res.status(200).json({
    //     message: 'Order details',
    //     orderId: req.params.orderId
    // });
});

router.delete('/:orderId',(req,res,next)=>{

    Order.findById(req.params.orderId)
    .then(order=>{
        if(!order){
            res.status(404).json({message:"Product Not Found"})
        }else{
            // res.status(200).json({message:"Product Found"})
            const product = new Product({
                _id: req.params.orderId,
                name: order.name,
                price: order.price,
                productImage: order.productImage,
                ownerName: order.ownerName,
                descriptionRegardingAvailability: order.descriptionRegardingAvailability, 
                fuelType: order.fuelType,
                seats: order.seats,
                mobileNumber: order.mobileNumber
            });
            product
            .save()
            .then((result)=>{
                
                Order.deleteOne({_id: req.params.orderId})
                .exec()
                .then(result=>{
                    res.status(200).json({
                        message: 'order deleted and now available for orders',
                        request: {
                            type: 'POST',
                            url: 'http://localhost:3000/orders',
                            body: {productId: 'ID', quantity: 'Number'}
                        },
                        createdProduct: {
                            name: order.name,
                            price: order.price,
                            productImage: order.productImage,
                            ownerName: order.ownerName,
                            descriptionRegardingAvailability: order.descriptionRegardingAvailability, 
                            fuelType: order.fuelType,
                            seats: order.seats,
                            mobileNumber: order.mobileNumber,
                            request:{
                                type: 'GET',
                                url: 'http://localhost:3000/products/'+result.id
                            }
                        }
                    })
                })
                .catch(err=>{
                    res.status(500).json({
                        error: err
                    })
                });
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({
                    error: err
                })
            });
        }
    })
    .catch(err=>{
        res.status(500).json({error: err})
    })

});

module.exports = router;