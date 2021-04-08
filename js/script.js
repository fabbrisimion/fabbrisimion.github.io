window.addEventListener("DOMContentLoaded", () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();

    var days, table, header, tbody;
    table = document.getElementById("table");
    header = document.getElementById("header");
    tbody = document.getElementsByTagName("tbody")[0];
    var day;
    var headerDays = [];
    var arrayData;

    days = daysMonth(month, year);

    function february(){
        for(var i = 24; i <= 28; i++){
            day = document.createElement("th");
            day.innerText = i.toString();
            header.append(day);
            headerDays.push("f"+i);
        }
    }
    
    function march(){
        for(var i = 1; i <= 31; i++){
            day = document.createElement("th");
            day.innerText = i.toString();
            header.append(day);
            headerDays.push("m"+i);
        }
    }

    function april(){
        for(var i = 1; i <= 8; i++){
            day = document.createElement("th");
            day.innerText = i.toString();
            header.append(day);
            headerDays.push("a"+i);
        }
    }

    february();
    march();
    april();

    for(var j = 0; j < 24; j++){
        for(var k = 0; k < 60; k++){
            var row = document.createElement("tr");
            var timeR = document.createElement("td");
            let time = stringTime(j,k);
            timeR.innerText = time; 
            row.appendChild(timeR);
            for(let l = 0; l < 31; l++){
                let td = document.createElement("td");
                td.id = headerDays[l] + "," + time;
                row.appendChild(td);
            }
            tbody.appendChild(row);
        }
    }
    
    fetch("csv/data.csv")
        .then(response => {       
            return response.text();
        })
        .then(text => {
            arrayData = convert(text);
        });

    function create(elem){
        var td = document.getElementById(idString(elem));
        console.log(td);
        var div = document.createElement("div");
        div.className = colorClass(elem["Spin"]);
        td.appendChild(div);
    }

    function populateTable(arr){
        var n = arr.length;
        for(let i = 0; i < n; i++){
            create(arr[i]);
        }
    }

    var check = setInterval(function(){
        if(arrayData != undefined){
            clearInterval(check);
            populateTable(arrayData);
        }},50);
});