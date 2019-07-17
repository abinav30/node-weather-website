const path=require('path');

const express=require('express');
const hbs=require('hbs');
const geocode=require("../src/utils/geocode");
const forecast=require('../src/utils/forecast');

//The express library is called from the npm package installed here.What express exposes is a function
//This function is called to crete a server here which goes by the variable name app
//when we type app.com, we are issuing a get request whose response is written as the callback function returned below

// __dirname and __filename are the two variables that denote the current wotrking file and directories in node js
//This path goes to the web developer bootcamp projects reference page that were made by me
//path.join(__dirname, "../../../../Web developer bootcamp projects")
//Here we go back to the node js path to views

let mainDir = path.join(__dirname, "../public");
let viewsPath=path.join(__dirname, "../webpage-templates/views");
let partialsPath=path.join(__dirname,"../webpage-templates/partials");

const app=express();
const port = process.env.PORT||3249;

//Static means that the assets in the directory provided here are considered static and do not change when we refresh a page
//If we need to create dynamic pages, we need a diffferent approach


//Set-up handlebars engine and views location

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//set-up static directory to serve

app.use(express.static(mainDir))

app.get('', (req,res)=>{
    res.render('index',{
        // weather:"Clear Skies",
        title:"Weather" ,
        name:"Abinav Murugadass"
    });

});

app.get('/help', (req,res)=>{
    res.render('help',{
        help:" for weather",
        title:"help",
        name:"Abinav Murugadass"
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:"about me",
        name:"Abinav Murugadass"
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"No Location entered!"
        })
    }
    let address=req.query.address;
    geocode(address,(error, {latitude, longitude, location}={})=>{
       
        if(error){
            return res.send({
                error:"No results found for this location",
            })
            // res.render("error",{
            //     title:"Error 404 ",
            //     footer:"Location not found!"

            // });
        }
       
        else{
        //console.log(data);
        forecast(latitude, longitude, (error,forecastdata)=>{
            if(error){
                return console.log(error);
            }
            // console.log(location);
            // console.log(forecastdata);
            res.send({
                forecast:forecastdata,
                title:location,
                name:"Abinav Murugadass",
                address:address,
            });
        })
    }
    });

    
})

// app.get('/products',(req,res)=>{
//     console.log(req.query);
//     res.send({
//         products:[25],
//     })
// })

//catches any request to a help page not present
app.get('/help/*',(req,res)=>{
    res.render("error",{
        title:"Error 404 ",
        footer:"help article not found!"
    })
})

//catches any invvalid url request
app.get('*',(req,res)=>{
    res.render("error",{
        title:"Error 404",
        footer:"Page Not Found!"
    });
})

//This here sets the server up and the server starts listening on port no:3249;
app.listen(port, ()=>{
    console.log("server up and running on port " + port);
});
