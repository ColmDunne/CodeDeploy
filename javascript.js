$.getJSON("https://covid19-server.chrismichael.now.sh/api/v1/AllReports",function(api){
    console.log(api);

    var total = api.reports[0].table[0][0].TotalCases;
    var active = api.reports[0].table[0][0].ActiveCases;
    var newCases = api.reports[0].table[0][0].NewCases;
    var TotalDeaths = api.reports[0].table[0][0].TotalDeaths;
    var newDeaths = api.reports[0].table[0][0].NewDeaths;
    var totalRecovered = api.reports[0].table[0][0].TotalRecovered;
    var newRecovered = api.reports[0].table[0][0].NewRecovered;


    
    
   $(".total").append('<strong>Total Cases:</strong>' + total);
   $(".active").append('<strong>Active Cases:</strong>' + active);
   //$(".newDeaths").append('<strong>New Deaths:</strong>' + newDeaths);
   $(".deaths").append('<strong>Total Deaths:</strong>' + TotalDeaths);
   $(".newRecovered").append('<strong>New Recovered Cases:</strong>' + newRecovered);
   $(".recovered").append('<strong>Total Recovered:</strong>' + totalRecovered);
   $(".newCases").append('<strong>Number of New Cases Today:</strong>' + newCases);

});
function myFunction(code){
    $.getJSON('https://api.thevirustracker.com/free-api?countryTotal=' + code ,function(country) {

        var total = country.countrydata[0].total_cases;
        var active = country.countrydata[0].total_active_cases;
        var recovered = country.countrydata[0].total_recovered;
        var deaths = country.countrydata[0].total_deaths;
        var newCases = country.countrydata[0].total_new_cases_today;
        var newDeaths = country.countrydata[0].total_new_deaths_today;
        var countryName = country.countrydata[0].info.title;

        $(".countryTotal").html('<strong>Total Cases:</strong>' + total);
        $(".countryActive").html('<strong>Active Cases:</strong>' + active);
        $(".countryRecovered").html('<strong>Recovered Cases:</strong>' + recovered);
        $(".countryDeaths").html('<strong>Total Deaths:</strong>' + deaths);
        $(".countryNewCases").html('<strong>Cases Today:</strong>' + newCases);
        $(".countryNewDeaths").html('<strong>Deaths Today:</strong>' + newDeaths); 
        $(".countryName").html(countryName);
    
        
});
}


 /*$.getJSON('https://covid19-server.chrismichael.now.sh/api/v1/AllReports' ,function(api) {
    console.log(api)

    var total = api.reports[0].table[0][0].TotalCases;
    var active = api.reports[0].table[0][0].ActiveCases;
    var newCases = api.reports[0].table[0][0].NewCases;
    var TotalDeaths = api.reports[0].table[0][0].TotalDeaths;
    var newDeaths = api.reports[0].table[0][0].NewDeaths;
    var totalRecovered = api.reports[0].table[0][0].TotalRecovered;
    var newRecovered = api.reports[0].table[0][0].newRecovered;
    console.log(active);

});*/





var modal = document.querySelector('.modal');

//Get close button
var closeBtn=document.getElementsByClassName('closeBtn')[0];
//Listen for close click
closeBtn.addEventListener('click',closeModal);
//Listen for outside click
window.addEventListener('click',outsideClick);


function openModal() {
    modal.style.display = 'block';
}
function closeModal () {
    modal.style.display = 'none';
}
//Function to close modal if outside click
function outsideClick(e){
    if(e.target == modal){
        modal.style.display='none'; 
    }
}
var flags = document.querySelectorAll(".flag");

for (i=0; i<flags.length;i++){
    flags[i].addEventListener('click',openModal);
}
