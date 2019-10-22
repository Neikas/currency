function createTable( date , tableID) {
    console.log(tableID);
    fetch('http://localhost:4567/getJSON/'+ date,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then(function (response ) {
        console.log(this);
        response.json().then((data) => {
            data.items.item.forEach((item , index) => {
                var table = document.getElementById(("tableCurrency"+ tableID ));
                if(index === 0){
                    var tableRow = table.insertRow(index);
                    _.mapObject(item , function (val , key){
                        var row = tableRow.insertCell(-1);
                        row.outerHTML = "<th>"+val+"</th>";
                    });
                }else {
                    var tableRow = table.insertRow(index);
                    _.mapObject(item , function (val , key){
                        var row = tableRow.insertCell(-1);
                        row.innerHTML = val;
                    });
                }
            });
        });

    }).catch(function (reason) {
        //error
    });

}

createTable("2019-09-09" , "1");
createTable("2019-09-10" , "2");
