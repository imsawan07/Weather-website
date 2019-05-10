const request = require('request')
const geocode = (address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F3YW4wNyIsImEiOiJjanZldzRhYjYxemx4M3lubWYwZ3Jzazh3In0.gdsINX-XEulBiB1PbEzCvg&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to loaction services!',undefined)
        } else if(body.features.length===0) {
            callback('Unable to find location! Try again with another location',undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode