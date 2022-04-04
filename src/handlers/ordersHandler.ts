import express from 'express';
import { OrderStore , order, Status } from '../models/order';

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
            userid : req.body.userid,
            address : req.body.address,
            totalprice : req.body.totalprice,
            status : Status.pending
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
        //console.log("originalOrder",originalOrder);
        const updatedOrder : order={
            products_ids_qtys : req.body.products_ids_qtys ? req.body.products_ids_qtys : originalOrder.products_ids_qtys,
            userid : req.body.userid ? req.body.userId : originalOrder.userid,
            address : req.body.address ? req.body.address : originalOrder.address,
            totalprice : req.body.totalprice ? req.body.totalprice : originalOrder.totalprice,
            status : req.body.status ? req.body.status : originalOrder.status
        }
        //console.log("updatedOrder",updatedOrder);
        const updateOrder = await store.update(req.params.id ,updatedOrder );
        res.json(updateOrder);

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