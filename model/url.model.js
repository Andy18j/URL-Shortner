const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})


const urlModel = mongoose.model("Url",urlSchema)


module.exports ={
    urlModel
}