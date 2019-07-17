let weatherSelector=document.querySelector('form');
let search=document.querySelector('#address');
let address=document.querySelector("#location");
let weather=document.querySelector("#weather");

weatherSelector.addEventListener('submit',(e)=>{
    e.preventDefault(); //Default behavious here is to reload the page after a search query is used
    const location=search.value;
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            address.textContent=data.error;
        }
        else{
            //console.log(data);
        address.textContent=data.title;
       // console.log(data.location);
        weather.textContent=data.forecast;
       // console.log(data.forecastdata);
        }
    });
})


})

/* http://localhost:3249*/
