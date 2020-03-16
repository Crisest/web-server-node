

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

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

app.get('/weather', (req, res) =>{

    if(!req.query.address){
        return res.send('Error, You must provide a search criteria')
    }
    else{
        const input = req.query.address
        geocode(input, (error, {latitude, longitude, location} = {}) => {
            if(error){
            return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData.message,
                location: location,
                address: req.query.address
            })        
            })  
        })
    }
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search criteria'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

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
    res.render('404', {
        title: '404',
        name: 'Yorguin Muyrillo',
        errorMessage: 'Page article not found'
    })
})

app.get('/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Yorguin Muyrillo',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Sever is up on port ' + port)
})

