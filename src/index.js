const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')
const SortMiddleware = require('./app/middlewares/sortMiddleware')

const route = require('./routes')
const db = require('./config/db')

//Connect DB
db.connect()

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: require('./helpers/handlebars'),
    })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware)

route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
