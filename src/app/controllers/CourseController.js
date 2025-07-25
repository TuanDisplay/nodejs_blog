const Course = require('../models/Course')
const { mongooseToObject } = require('../../utils/mongoose')

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => res.render('courses/show', { course: mongooseToObject(course) }))
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = { ...req.body }
        formData.thumbnail = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        const course = new Course(formData)
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById({ _id: req.params.id })
            .then((course) => res.render('courses/edit', { course: mongooseToObject(course) }))
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const formData = { ...req.body }
        formData.thumbnail = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.findByIdAndDelete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'force-delete':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action not found!' })
                break
        }
    }
}

module.exports = new CourseController()
