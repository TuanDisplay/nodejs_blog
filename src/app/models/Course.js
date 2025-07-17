const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, require: true },
        desc: { type: String },
        thumbnail: { type: String },
        videoId: { type: String, require: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    }
)

// Add plugins
mongoose.plugin(slug)
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' })
Course.plugin(AutoIncrement)

module.exports = mongoose.model('Course', Course)
