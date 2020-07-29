const r=require('request')

const forecast=(address,callback)=>{
   const url='http://api.weatherstack.com/current?access_key=e0bc11ebc739dc5dd5d2d1dd8348b435&query='+encodeURIComponent(address)
   r({url,json:true},(error,{body}={})=>{
       if(error){
           callback('Network Problem',undefined)
       }else if(!body.current){
           callback('Select the location Properly',undefined)
       }else{
           callback(undefined,body.current.weather_descriptions+".It is currently "+body.current.temperature+" degree out but it feels like "+body.current.feelslike+" degree out. Humidity in weather is "+body.current.humidity+"%")
        
       }
    } )
 }

 module.exports=forecast