const request=require("request");
const forecast=(latitude,longitude,callback)=>{
    const url=`https://api.darksky.net/forecast/b41dccf2fad74917d851113e608181b9/${latitude},${longitude}?exclude=minutely,hourly&units=si`;
    request({url:url, json:true},(error,response)=>{
        try{
            if(response.body.error){
                callback(`Bad Request ${response.body.error}`);
            }
            else{
                let {daily,currently}=response.body;
                let data=daily.data[0].summary +"\n"+ "It is currently "+ currently.temperature+ " degree celcius outside and chances of rain are "+ currently.precipProbability+ " %";
             callback(undefined, data);
            }
             //console.log(response.body);
         }
         catch(error){
             callback('unable to connect to service');
         }
    }) ;
};
module.exports=forecast;