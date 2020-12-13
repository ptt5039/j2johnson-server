import express from 'express';

export const authRouter = express.Router();

authRouter.get('/check-session', (req,res) => {
    res.json(req.session)
})