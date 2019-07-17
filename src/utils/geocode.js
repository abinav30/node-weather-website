const request=require('request');

const geocode=(address,callback)=>{
    let url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJpbmF2MSIsImEiOiJjanhtOWxsdjIwMWtyM2NwbDM5YjJrZGhpIn0.-gsSWoKeOkOMTU8HyTTZhA&limit=1`;
    request({url:url, json:true}, (error, response)=>{
        let {features} = response.body;
        
        let [cordinates]=features;
       
       try{
           if(features.length===0){
               callback("Unable to find location");
           }
           else{
               callback(undefined, {
                  latitude: cordinates.center[1],
                  longitude: cordinates.center[0],
                  location: cordinates.place_name
               })
          }
       }
       catch(error){
           callback("unable to connect to service");
       }
   });

};
module.exports=geocode;