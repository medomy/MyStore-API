import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const myTokenSecret : string = process.env.TOKEN_SECRET?process.env.TOKEN_SECRET : "";
const verifyAuthToken = (req: express.Request, res: express.Response, next : Function) => {
    try {
        const authorizationHeader = req.headers.authorization ? req.headers.authorization : "";
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, myTokenSecret);
        next();
    } catch (error) {
        res.status(404);
        res.json(`error is ${error}`);
        return
    }
}
export default verifyAuthToken;