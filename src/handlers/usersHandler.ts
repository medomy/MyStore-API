import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import { UserStore, user } from '../models/user-authentication'
import validateUser from '../services/validationMiddlewares/validate';


dotenv.config();
const store = new UserStore()
const tokenSecret : string = process.env.TOKEN_SECRET? process.env.TOKEN_SECRET : "";

const index = async (req : express.Request , res : express.Response)=>{
    try{
        const users = await store.index();
        res.json(users);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const show = async (req : express.Request , res : express.Response)=>{
    try{
        const user = await store.show(req.params.id);
        // const token = jwt.sign({user : user} , tokenSecret);
        // res.json(token);
        res.json(user);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const create = async (req : express.Request , res : express.Response)=>{
    try{
        const sentUser : user= {
            username : req.body.username,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            password : req.body.password,
            photourl : req.body.photourl ? req.body.photourl : "https://www.w3schools.com/howto/img_avatar.png",
            email : req.body.email,
            country : req.body.country,
            mobilephone : req.body.mobilephone
        };
        const createdUser = await store.create(sentUser);
        const token = jwt.sign({user : createdUser} , tokenSecret);
        res.json(token);
        //res.json(createdUser);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const update = async (req : express.Request , res : express.Response)=>{
    try{
        const user = await store.show(req.params.id);
        const sentUser : user= {
            username : req.body.username ? req.body.username : user.username,
            first_name : req.body.first_name ? req.body.first_name : user.first_name,
            last_name : req.body.last_name ? req.body.last_name : user.last_name,
            password : req.body.password ? req.body.password : user.password,
            photourl : req.body.photourl ? req.body.photourl : user.photourl,
            email : req.body.email ? req.body.email : user.email,
            country : req.body.country ? req.body.country : user.country,
            mobilephone : req.body.mobilephone ? req.body.mobilephone : user.mobilephone
        };
        const updatedUser = await store.update(req.params.id,sentUser);
        const token = jwt.sign({user : updatedUser} , tokenSecret);
        res.json(token);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const destroy = async (req : express.Request , res : express.Response)=>{
    try{
        const user = await store.delete(req.params.id);
        const token = jwt.sign({user : user} , tokenSecret);
        res.json(token);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}
const authenticate = async (req: express.Request, res: express.Response) => {
    try {
        const authenticatedUser = await store.signIn(req.body.userName, req.body.password);
        const token = jwt.sign({ user: authenticatedUser }, tokenSecret);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(`error is ${err}`);
    }
}

const getAllCartItems = async (req: express.Request, res: express.Response) =>{
    try{
        const cartItems = await store.getCartItems(req.params.id);
        res.json(cartItems);
    }catch(err){
        res.status(400);
        res.json(`error is ${err}`);
    }
}

const addToCart = async (req: express.Request, res: express.Response) =>{
    try{
        const addtoCart = await store.addCartItem(req.body.quantity, req.params.id, req.body.productid);
        res.json(addtoCart);
    }catch(err){
        res.status(400);
        res.json(`error is ${err}`);
    }
}
const removeFromCart = async (req: express.Request, res: express.Response) =>{
    try{
        const removedItem = await store.removeFromCart(req.params.id , req.body.productid);
        res.json(removedItem);
    }catch(err){
        res.status(400);
        res.json(`error is ${err}`);
    }
}
const removeAllFromCart = async (req: express.Request, res: express.Response) =>{
    try{
        const removedItems = await store.removeAllFromCart(req.params.id);
        res.json(removedItems);
    }catch(err){
        res.status(400);
        res.json(`error is ${err}`);
    }
}

const usersHandler = (app : express.Application)=>{
    app.get('/users' , index);
    app.get('/users/:id' , show);
    app.get('/users/:id/cart' , getAllCartItems)
    app.post('/users' ,validateUser, create);
    app.post('/users/:id/cart' , addToCart)
    app.post('/users/authinticate' , authenticate);
    app.put('/users/:id' , update);
    app.delete('/users/:id' , destroy)
    app.delete('/users/:id/cart' , removeFromCart);
    app.delete('/users/:id/allCart' , removeAllFromCart);
}
export default usersHandler;