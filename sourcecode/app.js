
const axios = require('axios').default;
import './scss/main.scss';





const app = async() => {
    try{  
        const response = await axios.get('https://covid-19-data.p.rapidapi.com/totals', {
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
                "x-rapidapi-key":"7da1759178msh229dd905e210446p1bb084jsn5dd0818fa88c"
                }
        })

       let datos = response.data

        console.log(datos[0])

        //console.log(data[0].deaths)
        
        let recovered = document.getElementById('recovered');
        let confirmed = document.getElementById('confirmed');
        let critical = document.getElementById('critical');
        let death = document.getElementById('death');
        let parsedRecovered = datos[0].recovered
        let parsedConfirmed = datos[0].confirmed
        let criticalConfirmed = datos[0].critical
        let deathConfirmed = datos[0].deaths

        recovered.innerText = parsedRecovered.toLocaleString()
        confirmed.innerText = parsedConfirmed.toLocaleString()
        critical.innerText = criticalConfirmed.toLocaleString()
        death.innerText = deathConfirmed.toLocaleString()




    } catch(err){
        console.log(err)
    }
}





document.querySelector('#countryForm').addEventListener('submit', async(e) => {

    e.preventDefault();

    const countryCode = document.querySelector('#countryCode').value

    try{

        const response = await axios.get('https://covid-19-data.p.rapidapi.com/country/code', {
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
                "x-rapidapi-key":"7da1759178msh229dd905e210446p1bb084jsn5dd0818fa88c"
                },
                "params":{
                    "format":"json",
                    "code":countryCode
                    }
        })

        let datos2 = response.data

        console.log(datos2)

        let countryname = document.getElementById('country');

        countryname.innerText= datos2[0].country

        //data = {a:  datos2[0].confirmed, b: datos2[0].critical, c: datos2[0].deaths, d: datos2[0].recovered}

        //console.log(data)


        var ctx = document.getElementById('myChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data:[datos2[0].confirmed,datos2[0].critical,datos2[0].deaths,datos2[0].recovered],
                    backgroundColor:[
                        "#FF9B04",
                        "#FF0000",
                        "#972727",
                        "#13FF52"
                    ]
                }],

                labels: [
                    'Confirmed',
                    'Critical',
                    'Deaths',
                    'Recovered'
                ]
            },
            options: {}
        });

        

//.range(["#FF9B04", "#FF0000", "#972727", "#13FF52",])
//var datass = {a:  data[0].confirmed, b: data[0].critical, c: data[0].deaths, d: data[0].recovered}




    } catch(err){
        console.log(err)
    }
    //de jp
    //console.log(countryCode)
    //https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
    //data eneterd with enter() and removed with exit().remove()
})


app();