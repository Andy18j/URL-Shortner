const express = require("express")
const {urlModel} = require("../model/url.model")
const shortid = require("shortid")
const {auth} = require('../auth/middleware');

const urlRouter = express.Router()


/**
 * @swagger
 * tags:
 *   name: URL Shortener
 *   description: URL shortening operations
 */

/**
 * @swagger
 * /urls/shorten:
 *   post:
 *     summary: Shorten a URL
 *     tags: [URL Shortener]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 description: The URL to be shortened
 *                 example: https://www.example.com/very-long-url
 *     responses:
 *       200:
 *         description: Successfully shortened URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                 shortUrl:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     summary: Redirect to the original URL
 *     tags: [URL Shortener]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: The shortened URL code
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: URL not found
 *       500:
 *         description: Internal server error
 */
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