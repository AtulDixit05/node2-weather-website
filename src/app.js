const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
//setting up paths
const publicDirectoryPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
app.use('/static',express.static(publicDirectoryPath))
//view engine setting
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)


// app.get('',(req,res)=>{
//     res.send('hi')
// })

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Application'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Weather App',
        name :'Atul Dixit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helptext:'How we can help you sir..?' 
    }) 
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'can not find the Address value'
        })
    }
        geocode(req.query.address,(error,{location}={})=>
        {
            if(error)
            {
                return res.send({
                    Error:'error'
                })
            }
            forecast(location,(error,forecastdata)=>{
                if(error)
                {
                    return res.send({
                        Error:'error'
                    })   
                }
                    res.send({
                    location,
                    forecast:forecastdata,
                    address:req.query.address
                })
                // console.log(chalk.yellow.inverse.bold('Location :'),chalk.yellow(location))
                // console.log(chalk.green.inverse(forecastdata))
                 })
        })
})


// // app.get('/abc',(req,res)=>{
// //     res.send("Help me please")
// // })

// app.get('/help/*',(req,res)=>{
//     res.render('404',{
//         title:'Error 404',
//         errormessage:'Help article not found'
//     })
// })

// app.get('*',(req,res)=>{
//     res.render('404',{
//         title:'Error 404',
//         errormessage:'Page not found'
//     })
// })



// app.get('/about',(req,res)=>{
//     res.send("<h1>This our about us page</h1>")
// })


// app.get('/bittle',(req,res)=>{
//     res.send('bittle')
// })

app.listen(3000,()=>{
    console.log("server upon 3000 port number")
})