var table = document.getElementsByTagName("tbody")[1];
var nextPage = document.getElementsByClassName("page-link")[11];
var row = table.firstElementChild;
var data = [];
var pages = 1;


function slotResult(res) {
    switch(res){
        case "ico-crazytime-1":
        case "ico-crazytime-slot-1":
            return 1;
        case "ico-crazytime-2":
        case "ico-crazytime-slot-2":
            return 2;
        case "ico-crazytime-slot-cf":
        case "ico-crazytime-cf":
            return 3;
        case "ico-crazytime-slot-pa": 
        case "ico-crazytime-pa":
            return 4;
        case "ico-crazytime-slot-5":
        case "ico-crazytime-5":
            return 5;
        case "ico-crazytime-slot-10": 
        case "ico-crazytime-10":
            return 6;
        case "ico-crazytime-slot-ch": 
        case "ico-crazytime-ch":
            return 7;
        case "ico-crazytime-slot-ct": 
        case "ico-crazytime-ct":
            return 8;
    }
}

var Row = function(r) {
    
    var c = r.children;
    var arr = [];
    
    let date = c[0].innerText;
    //month
    arr.push(date.substring(0,3));
    //day
    arr.push(date.substring(4,6).trim());
    //hour
    arr.push(date.substring(date.length-5));

    //slot result missed
    let miss = c[1];
    c[1].firstChild.classList.length == 0 ? arr.push(false) : arr.push(true);

    //slot
    arr.push(slotResult(c[1].firstChild.firstElementChild.className));

    //slot multiplier
    var slotMul = c[1].firstChild.innerText.trim().replace('X','');
    if (slotMul == "Miss") slotMul = "0";
    arr.push(parseInt(slotMul));
    
    //spin result
    arr.push(slotResult(c[2].firstChild.firstElementChild.className));
    
    //spin multiplier
    arr.push(parseInt(c[3].firstChild.innerText.trim().replace('X','')));

    //winners
    let winners = c[4].innerText.trim().replace(',','');
    if (winners != "") arr.push(parseInt(winners));
    else arr.push(0);
    
    //payout
    let payout = c[5].innerText.trim().replace('€','').replace(',','');
    if (payout != "") arr.push(parseInt(payout));
    else arr.push(0);

    return arr;
}

function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) bytes += 4;
        else if ( typeof value === 'string' ) bytes += value.length * 2;
        else if ( typeof value === 'number' ) bytes += 8;
        else if ( typeof value === 'object' && objectList.indexOf( value ) === -1)
        {
            objectList.push( value );
            for( var i in value ) stack.push(value[i]);
        }
    }
    return bytes;
}

function createData() {
    row = table.firstElementChild; 
    let entry = Row(row);
    
    if(pages == 431) return;

    while(row != null){
        entry = Row(row);
        row = row.nextElementSibling;
        if (data.length != 0)
            if (entry[9] == data[data.length-1][9] && 
                entry[8] == data[data.length-1][8]) {
                    continue;
            }
        data.push(entry);
    }
    pages++;
    console.log(data.length);
    nextPage.click();
     
}

function start(){
    var id = setInterval(createData, 4000);
    return id;  
}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}