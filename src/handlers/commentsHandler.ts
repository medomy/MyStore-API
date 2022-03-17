import express from 'express';
import { CommentStore,comment } from '../models/comment';

const store = new CommentStore();

const index = async (req : express.Request , res : express.Response)=>{
    try{
        const comments = await store.index();
        res.json(comments);
    }catch(err){
        res.status(400)
        res.json(`error is : ${err}`)
    }
}

const show = async (req : express.Request , res : express.Response)=>{
    try{
        const comment = await store.show(req.params.id);
        res.json(comment);
    }catch(err){
        res.status(400)
        res.json(`error is : ${err}`)
    }
}

const destroy = async (req : express.Request , res : express.Response)=>{
    try{
        const comment = await store.delete(req.params.id);
        res.json(comment);
    }catch(err){
        res.status(400)
        res.json(`error is : ${err}`)
    }
}
const create = async (req : express.Request , res : express.Response)=>{
    try{
        const sentComment : comment ={
            userId : req.body.userId,
            commentTitle : req.body.commentTitle,
            commentBody : req.body.commentBody,
            rating : req.body.rating
        } 
        const createdComment = await store.create(sentComment);
        res.json(createdComment);
    }catch(err){
        res.status(400);
        res.json(`error is : ${err}`);
    }
}

const update = async (req : express.Request , res : express.Response)=>{
    try{
        const originalComment = await store.show(req.params.id);
        const updatedComment : comment ={
            userId : req.body.userId ? req.body.userId : originalComment.userId,
            commentTitle : req.body.commentTitle ? req.body.commentTitle : originalComment.commentTitle,
            commentBody : req.body.commentBody ? req.body.commentBody : originalComment.commentBody,
            rating : req.body.rating ? req.body.rating : originalComment.rating
        }
        const updatecomment = await store.update(req.params.id,updatedComment); 
        res.json(updatecomment);
    }catch(err){
        res.status(400);
        res.json(`error is : ${err}`);
    }
}

const commentsHandler = (app : express.Application)=>{
    app.get('/comments' , index);
    app.get('/comments/:id' , show);
    app.post('/comments' , create);
    app.put('/comments/:id' , update);
    app.delete('/comments/:id' , destroy);
}
export default commentsHandler;