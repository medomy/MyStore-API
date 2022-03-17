import express from 'express';

const validateUser = (req:express.Request , res : express.Response , next : Function)=>{
    try{
        if(!req.body.userName){
            res.status(400);
            throw new Error("user name is required");
            
        }
        else if(!req.body.first_name){
            res.status(400);
            throw new Error("first name is required");
        }
        else if(req.body.first_name.length < 3){
            res.status(400);
            throw new Error("first name must be of at least 3 charachters");
        }
        else if(!req.body.last_name){
            res.status(400);
            throw new Error("last name is required");
        }
        else if(req.body.last_name.length < 3){
            res.status(400);
            throw new Error("last name must be of at least 3 charachters");
        }
        else if(!req.body.password){
            res.status(400);
            throw new Error("password is required");
        }
        else if(!req.body.email){
            res.status(400);
            throw new Error("email is required");
        }
        else if(!req.body.country){
            res.status(400);
            throw new Error("country is required");
        }
        else if(!req.body.mobilePhone){
            res.status(400);
            throw new Error("mobile number is required");
        }
        next();
    }catch(err){
        res.json(`error is ${err}`);
    }
}
export default validateUser;