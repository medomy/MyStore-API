import express from 'express';
import { product , ProductsStore } from '../models/product';

const store = new ProductsStore();

const index = async (req : express.Request , res : express.Response)=>{
    try{
        const products =await store.index();
        res.json(products)

    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const show = async (req : express.Request , res : express.Response)=>{
    try{
        const product = await store.show(req.params.id);
        res.json(product);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}
const create = async (req : express.Request , res : express.Response)=>{
    try{
        const product : product = {
            title : req.body.title ? req.body.title : "no title",
            price : req.body.price ? req.body.price : 0,
            description : req.body.description ?req.body.description : "no description",
            categoryid : req.body.categoryid ? req.body.categoryid : 1,
            company : req.body.company ? req.body.company : "no company",
            photosrc : req.body.photoSrc ? req.body.photoSrc : "no photo"
        }
        const createdProduct = await store.create(product);
        res.json(createdProduct);
    }catch(err){
        res.status(400);
        console.log(err);
        res.json(err);
    }

}
const update = async (req : express.Request , res : express.Response)=>{
    try{
        const myProduct = await store.show(req.params.id);
        const updateProduct: product ={
            title : req.body.title ? req.body.title : myProduct.title,
            price : req.body.price ? req.body.price : myProduct.price,
            description : req.body.description ?req.body.description : myProduct.description,
            categoryid : req.body.categoryid ? req.body.categoryid : myProduct.categoryid,
            company : req.body.company ? req.body.company : myProduct.company,
            photosrc : req.body.photosrc ? req.body.photosrc : myProduct.photosrc
        }
        const updatedProduct = await store.update(req.params.id , updateProduct);
        res.json(updatedProduct); 
    }catch(err){
        res.status(400);
        console.log(err);
        res.json(err);
    }

}

const remove = async (req : express.Request , res : express.Response)=>{
    try{
        const deletedProduct = await store.delete(req.params.id);
        res.json(deletedProduct);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}
const productsHandler = (app : express.Application)=>{
    app.get('/products' , index);
    app.get('/products/:id' , show);
    app.post('/products' , create);
    app.put('/products/:id' , update);
    app.delete('/products/:id' , remove);
}
export default productsHandler;