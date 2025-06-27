class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news')
    }

    // [GET] /:slug
    show(req, res) {
        res.send('Here we go!!!')
    }
}

module.exports = new NewsController()
