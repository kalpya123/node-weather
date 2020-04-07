//this is main file 
const path = require('path')//to set path
const express = require('express')//to install module
const hbs = require('hbs')//to install hbs
const geocode= require('./utils/geocode')//path of geocode 
const forcast=require('./utils/forcast')//path of forcast
//const request= require('request')

const app = express()//express
const port=process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')//path of the directory
const viewsPath = path.join(__dirname, '../templates/views')//path of the directory
const partialsPath = path.join(__dirname, '../templates/partials')//path of the directory

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {//render always return html file
        title: 'Weather',//its object 
        name: 'kalpesh '
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kalpesh Dharpure '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Kalpesh Dharpure'
    })
})

app.get('/weather', (req, res) => { //for error weather to get address 
    if(!req.query.address)
   {
       return res.send({
      //  forecast: 'It is snowing',
        //location: 'Philadelphia'
     error:'you must provide adress'
    })
}
geocode(req.query.address,(error,{latitude,longitude,location}={})=>//geting from geocode 
{
if(error)
{
    return res.send({error})//geting error from geocode 
}
forcast(latitude,longitude,(error,forcastData)=>{
    if(error)
    {
        return res.send({error})//same as above 
    }
    res.send({
        forcast:forcastData,
        location,
        address:req.query.address
    })
})
})

//res.send({
  //forecast: 'It is snowing',
    //location: 'Philadelphia',
      //address: req.query.address
    //})
})



app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
  return res.send({
error:'you must provide search term'
})
    }
    
console.log(req.query.search)
res.send({
    products:[]
})
})

app.get('/help/*',(req,res)=>
{
    res.send('help artical not found ')
})
app.get('/help/*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'andrew mead',
    errormessage:'help articals not found '
})
})
app.get('*',(req,res)=>//if file or html not found 
{
res.render('404',{
    title:'404',
    name:'andrew mead',
 errormessage:'page not found'
})

})

app.listen(port, () => {//to start server 
    console.log('Server is up on port '+ port)
})