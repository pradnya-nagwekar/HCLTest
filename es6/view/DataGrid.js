var CurrencyPairsModel = require('../model/CurrencyPairsModel');
var SparkLine = require('../../site/sparkline');

module.exports = class DataGrid{
    clearTable(){
    var table = document.getElementById("currencyPairData");

    var totalRows = table.rows.length;
    for (var i = totalRows; i > 1; i--) {
            table.deleteRow(i-1);
        }
    }
    renderTable(dataModel){
        let allCurrencyPairsData = dataModel.allCurrencyPairsData

        let table = document.getElementById("currencyPairData");
        let totalRows = allCurrencyPairsData.length;
        for(let i=0;i<totalRows;i++){
            let newRow = table.insertRow(i+1);//header should not be recreated
            let columnData = Object.values(allCurrencyPairsData[i]); //get all values
            let totalColumns =columnData.length
            for(var j=0;j<totalColumns-1;j++){
                var newColumn = newRow.insertCell(j);
                newColumn.innerText = columnData[j]

            }
            //add midprice data with sparkline in last columnData

            var sparkColumn = newRow.insertCell(j);
            const sparkElement = document.createElement('span');
            const sparkLine = new SparkLine(sparkElement);
            sparkLine.draw(columnData[j].midPriceArray);
            sparkColumn.appendChild(sparkElement);








}


}
}
