import express from 'express';
import { OrderStore , order } from '../models/order';

const store = new OrderStore();

const index =async (req : express.Request , res : express.Response)=>{
    try{
        const orders = await store.index();
        res.json(orders);
    }catch(err){
        res.status(400);
        res.json(`error is : ${err}`);

    }
}
const show = async (req : express.Request , res : express.Response)=>{
    try{
        const order = await store.show(req.params.id);
        res.json(order);
    }catch(err){
        res.status(400);
        res.json(`error is : ${err}`);
    }
}

const destroy = async (req : express.Request , res : express.Response)=>{
    try{
        const order = await store.delete(req.params.id);
        res.json(order);
    }catch(err){
        res.status(400);
        res.json(`error is : ${err}`);
    }
}

const create = async (req : express.Request , res : express.Response)=>{
    try{
        const sentOrder : order ={
            products_ids_qtys : req.body.products_ids_qtys,
            userId : req.body.userId,
            address : req.body.address,
            totalPrice : req.body.totalPrice
        } 
        const createdOrder = await store.create(sentOrder);
        res.json(createdOrder);
    }catch(err){
        res.status(400);
        res.json(`error is : ${err}`);
    }
}
const update = async (req : express.Request , res : express.Response)=>{
    try{
        const originalOrder = await store.show(req.params.id);
        const updatedOrder : order={
            products_ids_qtys : req.body.products_ids_qtys ? req.body.products_ids_qtys : originalOrder.products_ids_qtys,
            userId : req.body.userId ? req.body.userId : originalOrder.userId,
            address : req.body.address ? req.body.address : originalOrder.address,
            totalPrice : req.body.totalPrice ? req.body.totalPrice : originalOrder.totalPrice
        }

    }catch(err){
        res.status(400);
        res.json(`error is : ${err}`);
    }
}

const ordersHandler = (app : express.Application)=>{
    app.get('/orders' , index);
    app.get('/orders/:id' , show);
    app.post('/orders' , create);
    app.put('/orders/:id' , update);
    app.delete('/orders/:id' , destroy);
}
export default ordersHandler;