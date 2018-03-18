var CurrencyPairsModel = require('../model/CurrencyPairsModel');

module.exports = class DataGrid{
  clearTable(){
    var table = document.getElementById("currencyPairData");
  //  var rows=table.getElementsByTagName('tr');
    var totalRows = table.rows.length;
    for (var i = totalRows; i > 1; i--) {
            table.deleteRow(i-1);
        }
    }
renderTable(dataModel){
var table = document.getElementById("currencyPairData");
var totalRows = dataModel.length;
for(var i=0;i<totalRows;i++){
  var newRow = table.insertRow(i+1);
  var columnData = Object.values(dataModel[i]);
  for(var j=0;j<columnData.length;j++){
    var column = newRow.insertCell(j);
    column.innerText = columnData[j]

}



}


}
}
