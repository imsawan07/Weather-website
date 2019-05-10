
const path = require('path')
const express =require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

 
app.set('view engine','hbs')
app.set('views',w=viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=> {
    res.render('index',{
        title: 'Weather',
        name: 'Sawan Patidar'
    }) 
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About me',
        name: 'Sawan Patidar'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title:'Help',
        name: 'Sawan Patidar'
    })
})


app.get('/weather',(req,res)=> {
    
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=> {
            if(error){
                return res.send({error})
            }

            forecast(latitude,longitude,(error,forecastData)=> {
                if(error) {
                    return res.log({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
    })
})
   
   
   
    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is Snowing',
    //     location: 'I am in indore'
    // })


app.get('/products',(req,res)=> {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Sawan Patidar',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Sawan Patidar',
        errorMessage: 'Page Not Found!'
    })   
}) 

app.listen(3000,()=> {
    console.log('Server is up on port 3000.')
})