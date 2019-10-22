fetch('http://localhost:4567/getJSON/2018-10-22',{
    method: "GET",
    headers: {
        "Accept": "application/json"
    }
}).then(function (response) {
    response.json().then((data) => {
       data.items.item.forEach((item , index) => {
           var table = document.getElementById("tableCurrency");
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