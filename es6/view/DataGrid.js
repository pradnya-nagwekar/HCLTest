var CurrencyPairsModel = require('../model/CurrencyPairsModel');
var SparkLine = require('../../site/sparkline');

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
  var DM = dataModel.allCurrencyPairsData
  //var MP =dataModel.midPriceData
var table = document.getElementById("currencyPairData");
var totalRows = DM.length;
for(var i=0;i<totalRows;i++){
  var newRow = table.insertRow(i+1);
  var columnData = Object.values(DM[i]);

  for(var j=0;j<columnData.length-1;j++){
    var column = newRow.insertCell(j);
    column.innerText = columnData[j]

}
if(columnData[j].midPriceArray.length>0){
  var sparkColumn = newRow.insertCell(j);
  const sparkElement = document.createElement('span');
  const sparkLine = new SparkLine(sparkElement);
  sparkLine.draw(columnData[j].midPriceArray);
  sparkColumn.appendChild(sparkElement);
}

/*if(MP.length != 0)
{
  var x = MP.findIndex((item)=>item.name == columnData[0])
  if(MP[x]){
    var MPA = MP[x].midPriceArray;
    if(MPA.length != 0 && MPA.length == 30){
      var sparkColumn =newRow.insertCell(j);
      const sparkElement = document.createElement('span');

      const sparkline = new Sparkline(sparkElement);
      sparkline.draw(MPA);
      sparkColumn.appendChild(sparkElement);
  }
}
}*/





}


}
}
