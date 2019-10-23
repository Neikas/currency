function  getDataByDate( date) {
    return fetch('http://localhost:4567/getJSON/'+ date,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then(function (response ) {
        return response.json()
    }).then(data => {
        return data;
    }).catch(function (reason) {
        //error
    });
}
function setDateDefoult(){
    var dateFrom = document.getElementById('dateFrom').valueAsDate = new Date();
    var dateTo = document.getElementById("dateTo").valueAsDate = new Date() ;
}
function setData(data, tableID){
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
}
function getSantykis(data){
    var dataArr = data.items.item;
    var santykisArr = [];
    for(var i = 1 ; i < dataArr.length; i++){
        santykisArr.push(dataArr[i].santykis);
    }
    return santykisArr;
}
function calDifference(santykisFrom, santykisTo){
    var difference = [];
    santykisFrom.forEach((value, index) => {
        value = parseFloat(value.replace(",", "."));
        santykisTo[index] = parseFloat((santykisTo[index].replace(",", ".")));
        var goodValue = (value - santykisTo[index]).toFixed(4);
        difference.push(goodValue);
    });
    return difference;
}
function setDifrenceData(diffrence){
    diffrence.unshift("Pokytis");
    var table = document.getElementById("tableDifference");
    diffrence.forEach((value, index) => {
        if(index === 0){
            var tableRow = table.insertRow(index);
                var row = tableRow.insertCell(-1);
                row.outerHTML = "<th>"+value+"</th>";

        }else {
            var tableRow = table.insertRow(index);
                var row = tableRow.insertCell(-1);
                row.innerHTML = value;
    }
    });
}
function cleareTables(){
    document.getElementById(("tableCurrency1" )).innerHTML = "";
    document.getElementById(("tableCurrency2" )).innerHTML = "";
    document.getElementById(("tableDifference")).innerHTML = "";
}

(function mainController(){
    //seting time in inputs
    var santykisFrom = [];
    var santykisTo = [];
    setDateDefoult();
    //taking data from inputFrom and inputTo
    var dateFrom = document.getElementById("dateFrom").value;
    var dateTo = document.getElementById("dateTo").value;
    //getting data for tables
    var dataInputFrom = getDataByDate(dateFrom);
    var dataInputTo = getDataByDate(dateTo);
    //Waiting for promises finish and display data
    var stateFrom = false;
    var stateTo = false;
    dataInputFrom.then(data => {
        setData(data , "1");
        santykisFrom = getSantykis(data);

        dataInputTo.then(data => {
            setData(data, "2");
            santykisTo = getSantykis(data);
            var diffrence = calDifference(santykisFrom ,santykisTo );
            setDifrenceData(diffrence);
            document.getElementsByClassName("loader-wrapper")[0].className = "loader-wrapperOFF";
            document.getElementsByClassName("loader")[0].className = "loaderOFF";
        });
    });
    var btn = document.getElementById("btn");
    btn.addEventListener("click" , function() {
        document.getElementsByClassName("loader-wrapperOFF")[0].className = "loader-wrapper";
        document.getElementsByClassName("loaderOFF")[0].className = "loader";
        cleareTables();
        //taking data from inputFrom and inputTo
        var dateFrom = document.getElementById("dateFrom").value;
        var dateTo = document.getElementById("dateTo").value;
        //getting data for tables
        var dataInputFrom = getDataByDate(dateFrom);
        var dataInputTo = getDataByDate(dateTo);
        //Waiting for promises finish and display data
        var stateFrom = false;
        var stateTo = false;
        dataInputFrom.then(data => {
            setData(data , "1");
            santykisFrom = getSantykis(data);

            dataInputTo.then(data => {
                setData(data, "2");
                santykisTo = getSantykis(data);
                var diffrence = calDifference(santykisFrom ,santykisTo );
                setDifrenceData(diffrence);
                document.getElementsByClassName("loader-wrapper")[0].className = "loader-wrapperOFF";
                document.getElementsByClassName("loader")[0].className = "loaderOFF";
            });
        });
    });

})();
