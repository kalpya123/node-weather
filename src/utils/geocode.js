const request= require('request')

const geocode=(address,callback)=>//geocode address for 
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FscHlhIiwiYSI6ImNrOGsyanV6YzBlNzkzZXFxaHpndTB0ZXAifQ.Ggm41b-W6rlc-W8cxjoF2g&limit=1'//geting api
request({url:url,json:true},(error,response)=>
{
if(error)
{
    callback('unable to connect to location services',undefined)//if internet not found error //error
}
else if(response.body.features.length===0)
{
callback('unable to find location try another search',undefined)//if data not found this error //data 
}

else{
    callback(undefined,{ //this will print orignal data 
        latitude:response.body.features[0].center[0],
        longitude:response.body.features[0].center[1],
     location:response.body.features[0].place_name
    })
}
})
}
module.exports= geocode