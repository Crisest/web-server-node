const request = require("request")

const forecast = (lat, lon, callback) =>{
    const url = 'https://api.darksky.net/forecast/e59b6b6157477dc87d710b94b338ccb0/' + lat + ',' + lon + '?units=si'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to reach weather service!', undefined)
        } else if (body.error){
            callback('Unable to find Location', undefined)
        }
        else{
            callback(undefined,{
                message: body.daily.data[0].summary + ' It is ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain,'
            })
        }
    })
}
module.exports = forecast