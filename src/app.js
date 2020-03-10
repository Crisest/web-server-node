const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express confih
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
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


app.get('/help', (req, res)=>{
    res.render('help', {
        msg: 'If you need some help please call me ;)',
        title: "Help",
        name: 'Yorguin'
    })
})

app.get('/help/*', (req, res) =>{
    res.render("404", {
        title: '404',
        name: 'Yorguin Muyrillo',
        errorMessage: 'Page article not found'
    })
})

app.get('*', (req, res) =>{
    res.render("404", {
        title: '404',
        name: 'Yorguin Muyrillo',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})