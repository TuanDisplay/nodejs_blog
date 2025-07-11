const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const Course = new Schema(
    {
        name: { type: String, require: true },
        desc: { type: String },
        thumbnail: { type: String },
        videoId: { type: String, require: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Course', Course)
