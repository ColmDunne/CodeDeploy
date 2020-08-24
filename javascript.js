$.getJSON("https://api.thevirustracker.com/free-api?global=stats",function(api) {

    var total = api.results[0].total_cases;
    var active = api.results[0].total_active_cases;
    var newCases = api.results[0].total_new_cases_today;
    var TotalDeaths = api.results[0].total_deaths;
    var newDeaths = api.results[0].total_new_deaths_today;
    var totalRecovered = api.results[0].total_recovered;
    $(".total").append('<strong>Total Cases:</strong>' + total);
    $(".active").append('<strong>Active Cases:</strong>' + active);
    $(".newDeaths").append('<strong>New Deaths:</strong>' + newDeaths);
    $(".deaths").append('<strong>Total Deaths:</strong>' + TotalDeaths);
    $(".recovered").append('<strong>Total Recovered:</strong>' + totalRecovered);
    $(".newCases").append('<strong>Number of New Cases Today:</strong>' + newCases);
});

function myFunction(code) {
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
        createChart(code);
    });
}

var xlabels = [];
var ylabels = [];
var ylabels2 = [];
var ylabels3 = [];

function createChart(code) {
    console.log('We get to here');
    api_url = 'https://api.covid19api.com/total/country/' + code;
    chartIt();
}
    
async function chartIt() {  
    await getData();
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Number of Confirmed Cases',
                data: ylabels,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1
            },
            {
                label: 'Number of Active Cases',
                data: ylabels2,
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 1
            },
            {
                label: 'Number of Recovered Cases',
                data: ylabels3,
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        }
    });
    $(".chart").html(myChart);
}


async function getData() {
    if (xlabels.length > 0 || ylabels.length > 0 || ylabels2 > 0 || ylabels3 > 0) {
        clearData();
    } 
    const response = await fetch(api_url);
    const data = await response.text();
    const api = JSON.parse(data);
    for (i = 0; i < api.length; i++) {
        var UnFormattedDate = api[i].Date;
        var FormattedDate = UnFormattedDate.substring(0,10);
        xlabels.push(FormattedDate);
        ylabels.push(api[i].Confirmed);
        ylabels2.push(api[i].Active);
        ylabels3.push(api[i].Recovered);
    }
}   

function clearData() {
    xlabels = [];
    ylabels = [];
    ylabels2 = [];
    ylabels3 = [];
}


var modal = document.querySelector('.modal');
var closeBtn = document.getElementsByClassName('closeBtn')[0];
closeBtn.addEventListener('click',closeModal);
window.addEventListener('click',outsideClick);

function openModal() {
    modal.style.display = 'block';
}

function closeModal () {
    $(".myChart").remove();
    var element = document.createElement("CANVAS");
    element.setAttribute('class','myChart');
    element.setAttribute('id','chart');
    document.getElementById('modal-body').appendChild(element);
    modal.style.display = 'none';
}

function outsideClick(e) {
    if (e.target == modal) {
        $(".myChart").remove();
        var element = document.createElement("CANVAS");
        element.setAttribute('class','myChart');
        element.setAttribute('id','chart');
        document.getElementById('modal-body').appendChild(element);
        modal.style.display='none'; 
    }
}
var flags = document.querySelectorAll(".flag");

for (i=0; i<flags.length;i++) {
    flags[i].addEventListener('click',openModal);
}
