const r=require('request')

const forecast=(address,callback)=>{
   const url='http://api.weatherstack.com/current?access_key=e0bc11ebc739dc5dd5d2d1dd8348b435&query='+encodeURIComponent(address)
   r({url,json:true},(error,{body}={})=>{
       if(error){
           callback('Network Problem',undefined)
       }else if(!body.current){
           callback('Select the location Properly',undefined)
       }else{
           callback(undefined,body.current.weather_descriptions+"\nIt is currently "+body.current.temperature+" degree out.It feels like "+body.current.feelslike+" degree out")
       }
    } )
 }

 module.exports=forecast