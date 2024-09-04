const express = require("express")
const {urlModel} = require("../model/url.model")
const shortid = require("shortid")
const {auth} = require('../auth/middleware');

const urlRouter = express.Router()

urlRouter.post("/shorten",auth,async(req,res)=>{
    const { originalUrl } = req.body;
    const user = req.userId;
  
    try{
        const shortUrl = shortid.generate();
        const newUrl = new urlModel({ originalUrl, shortUrl, user: user });
        await newUrl.save();
        res.json({ originalUrl, shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}`});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: error.message});
    }
})

urlRouter.get("/:shortUrl",async(req,res)=>{
    try{
        const url = await urlModel.findOne({shortUrl: req.params.shortUrl});
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
            res.redirect(url.originalUrl);
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: error.message });
    }
})






module.exports = {
    urlRouter
}