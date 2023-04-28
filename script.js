// variables
span = document.querySelector(".span");
total_carb = 0
total_fat = 0
total_prot = 0
total_cal = 0
total_serving = 0
prot_avg = []
fat_avg = []
dish = ""
weight = 0

window.onload = function(){
        console.log("Loaded")
}

function show(name , gram){
        search = name
        g = gram
        const options = {
                method: 'GET',
                headers: {
                        'X-API-Key': 't3x+TqMtG320rhk1nKmcRg==kh61bOUxm7940MQJ'
                        // 'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
                }
        };
        
        fetch(`https://api.calorieninjas.com/v1/nutrition?query=${search}`, options)
                .then(response => response.json())
                .then(response => 
                        {
                                console.log(response["items"][0])
                                // selecting table element
                                var table = document.querySelector(".table")
                                var row = table.insertRow()
                                // assigning fetched data to variables
                                try{
                                        name = response["items"][0]["name"]
                                        carb = (response["items"][0]["carbohydrates_total_g"] / 100 )* gram
                                        protien = (response["items"][0]["protein_g"] / 100 ) * gram
                                        fat = (response["items"][0]["fat_total_g"] / 100 ) * gram
                                        cal = (response["items"][0]["calories"] / 100 ) * gram
                                        serv = (response["items"][0]["serving_size_g"] / 100 ) * gram
                                        
                                        // adding protien and fat to avg array
                                        prot_avg.push(protien) 
                                        fat_avg.push(fat)

                                        // inserting cells and injecting data
                                        row.insertCell().innerHTML = ((name).substring(0,1).toUpperCase() + (name.substring(1).toLowerCase())) ;
                                        row.insertCell().innerHTML = Math.round(cal * 100) / 100
                                        row.insertCell().innerHTML = Math.round(carb * 100) / 100 + "g"
                                        row.insertCell().innerHTML = Math.round(protien * 100) / 100 + "g"
                                        row.insertCell().innerHTML = Math.round(fat * 100) / 100 + "g"
                                        row.insertCell().innerHTML = Math.round(serv * 100) / 100 + "g"

                                        // adding to total
                                        total_carb += carb
                                        total_prot += protien
                                        total_fat += fat
                                        total_cal += cal
                                        total_serving += serv

                                        // changing total on screen
                                        document.querySelector(".l2").innerHTML = Math.round(total_cal * 100) / 100 
                                        document.querySelector(".l3").innerHTML = Math.round(total_carb * 100) / 100 + "g"
                                        document.querySelector(".l4").innerHTML = Math.round(total_prot * 100) / 100 + "g"
                                        document.querySelector(".l5").innerHTML = Math.round(total_fat * 100) / 100 + "g"
                                        document.querySelector(".l6").innerHTML = Math.round(total_serving * 100) / 100 + "g"

                                        // updating meter span tag
                                        calcAvg()
                                        }
                                catch(TypeError)
                                {
                                        alert("Selected item not in the database")
                                }
                        }
                )
                
}




function calcAvg(){
        document.querySelector(".hide").style.display = "block"
        sum_p = 0
        sum_f = 0
        for(i=0 ; i<prot_avg.length ; i++){
                sum_p += prot_avg[i];
                sum_f += fat_avg[i];
        }
        score = Math.round((sum_p/prot_avg.length)/(sum_f/fat_avg.length) * 100) / 100
        console.log(score)

        if(score > 1.5)
        span.innerHTML = ("Extremely Healthy")
        else if(score > 1 && score < 1.5)
        span.innerHTML = ("Healthy")
        else if(score < 1 )
        span.innerHTML = ("Not Healthy")
        document.querySelector(".span2").innerHTML = `
                What you can do to burn it all ! <br>
                Walking : ${(Math.round((30/170)*total_cal) * 100) / 100}min <br>
                Running : ${(Math.round((1/11.4)*total_cal) * 100) / 100}min <br>
                Swimming : ${(Math.round((30/250)*total_cal) * 100) / 100}min <br>
                Cycling : ${(Math.round((30/298)*total_cal) * 100) / 100}min <br>
                Weightlifting : ${(Math.round((30/160)*total_cal) * 100) / 100}min <br>
                `
}

function submitForm(event){
        event.preventDefault()
        
        text  = document.getElementById("name")
        text.style.display = "none"
        dish = text.value
        console.log(text.value)
        text.value = ""
        grams = document.getElementById("gram")
        grams.style.display = "inline-block"
        grams.focus()
        
}
function form2(event){
        scrollTo(0 , 380)
        event.preventDefault()
        weight = grams.value
        console.log(weight)
        show(dish , weight)
        grams.value = ""
        grams.style.display = "none"
        text.style.display = "inline-block"
        text.focus()
                
}