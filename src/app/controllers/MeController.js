const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class MeController {
    // [GET] me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.countDocumentsWithDeleted({ deleted: true }),
            Course.find({}).sortable(req),
        ])
            .then(([deletedCount, courses]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                })
            })
            .catch(next)
    }

    // [GET] me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) =>
                res.render('me/trash-courses', { courses: multipleMongooseToObject(courses) })
            )
            .catch(next)
    }
}

module.exports = new MeController()
