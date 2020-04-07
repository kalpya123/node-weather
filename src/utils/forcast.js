const request = require('request')

    const forcast = (latitude, longitude, callback) => { //for forcast 

    const url ='http://api.weatherstack.com/current?access_key=8d9c76e4053722ea1c354482b8328823&query='+latitude+','+longitude //geting value from api

    request({ url, json: true }, (error, { body }) => { //request from url and body of that json (api)
        if (error) {
            callback('Unable to connect to weather service!', undefined)//if error mostly not connected to internet
        } else if (body.error) {
            callback('Unable to find location', undefined)//if enable to find loaction
        } else {
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress.') //geting values from api json  of that like array body of that current  
            
        }
    }
    )}



    //const url ='http://api.weatherstack.com/current?access_key=8d9c76e4053722ea1c354482b8328823&query='+latitude+','+longitude


module.exports=forcast