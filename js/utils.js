function daysMonth(month, year){
    let days;
    if(month == 1){
        if(!(year % 100) || !((year % 4) || (year % 400) )) days = 29;
        else days = 28;
    }
    else if (month == 3 || month == 5 || month == 8 || month == 10) {
            days = 30
    }
    else days = 31;
    return days;
}

function stringTime(i, j) {
    var s = '';
    if (i < 10) s += '0' + i + ':'; else s+= i + ':';
    if (j < 10) s += '0' + j; else s += j;
    return s; 
}

function convert(str, delimiter = ',') {
    var titles = str.slice(0, str.indexOf('\n')).split(delimiter);
    var rows = str.slice(str.indexOf('\n') + 1).split('\n');
    return rows.map(row => {
      var values = row.split(delimiter);
      return titles.reduce((object, curr, i) => (object[curr] = values[i], object), {})
    });
  };

async function getFile(){
    return fetch("casino.csv").then(response => {return response.text()}).then(text => {return text});
}

async function getFileCaller() {
    const txt = await this.getFile();
    return convert(txt);
}

function colorClass(i){
    switch (i) {
        case "1": return "one";
        case "2": return "two";
        case "3": return "coin";
        case "4": return "pach";
        case "5": return "five";
        case "6": return "ten";
        case "7": return "cash";
        case "8": return "crazy";
    }
}

function idString(r){
    return r["Month"].charAt(0).toLowerCase() + r["Day"] + "," + r["Time"];
}