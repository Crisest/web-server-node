const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express confih
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location D:\NodeJS\web-server\templates\partials web-server\templates\partials\header.hbs
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Yorguin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yorguin'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'forecast',
        location: 'locationStirng'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        msg: 'If you need some help please call me ;)'
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})