
import express from 'express'
import { category , CategoriesStore } from "../models/category";

const store = new CategoriesStore();

const index = async(req : express.Request , res : express.Response)=>{
    try{
        const categories =await store.index();
        res.json(categories);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}
const show = async(req : express.Request , res : express.Response)=>{
    try{
        const category =await store.show(req.params.id);
        res.json(category);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req : express.Request , res : express.Response)=>{
    try{
        const category : category = {
            name : req.body.name ? req.body.name : "no name",
            photoUrl : req.body.photoUrl ? req.body.photoUrl : "no photo",
            description : req.body.description ?req.body.description : "no description",
        }
        const createdCategory = await store.create(category);
        res.json(createdCategory);
    }catch(err){
        res.status(400);
        console.log(err);
        res.json(err);
    }
}

const update = async (req : express.Request , res : express.Response)=>{
    try{
        const myCategory = await store.show(req.params.id);
        const updateCategory: category ={
            name : req.body.name ? req.body.name : myCategory.name,
            photoUrl : req.body.price ? req.body.price : myCategory.photoUrl,
            description : req.body.description ?req.body.description : myCategory.description,
            
        }
        const updatedCategory = await store.update(req.params.id , updateCategory);
        res.json(updatedCategory); 
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const remove = async(req : express.Request , res : express.Response)=>{
    try{
        const category =await store.delete(req.params.id);
        res.json(category);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const categoriesHandler = (app : express.Application)=>{
    app.get('/categories' , index);
    app.get('/categories/:id' , show);
    app.post('/categories' , create);
    app.put('/categories/:id' , update);
    app.delete('/categories/:id' , remove);
}
export default categoriesHandler;