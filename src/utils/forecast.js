const request=require('request')
const forecast=(latitude,longitude,callback)=> {
const url ='https://api.darksky.net/forecast/ff94ce486ab300fd6bece2e22dbc8d25/'+latitude+','+longitude

    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to loaction services!',undefined)
        } else if(body.error) {
            callback('Incorrect coordinates! Please try again',undefined)
        }
        else {
            callback(undefined, 
                body.daily.data[0].summary+'It is currently '+ body.currently.temperature +' degrees out. There is a '+ body.currently.precipProbability+'% chance of rain' 
            )
        }
    })
}

module.exports=forecast