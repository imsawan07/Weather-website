const request=require('request')
const forecast=(latitude,longitude,callback)=> {
const url ='https://api.darksky.net/forecast/ff94ce486ab300fd6bece2e22dbc8d25/'+latitude+','+longitude+'?units=si'

    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to loaction services!',undefined)
        } else if(body.error) {
            callback('Incorrect coordinates! Please try again',undefined)
        }
        else {
            callback(undefined, 
                body.daily.data[0].summary+'It is currently '+ body.currently.temperature +' degree celsius out. The maximum temperature of today is '+body.daily.data[0].temperatureMax+' and the minimum temperature is '+body.daily.data[0].temperatureMin
            )
        }
    })
}

module.exports=forecast