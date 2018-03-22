var CurrencyPairsModel = require("../model/CurrencyPairsModel");
var SparkLine = require("../../site/sparkline");
module.exports = class DataGrid{
  constructor(model){
    this._model = model;
    //attach event listener for model updates
    this._model.modelUpdated.attach(()=>{
      this.clearTable();//clear existing grid
      this.renderTable();//render grid with updated data
    })
  }
    /**
    clearTable - clears full table data
    */
    clearTable(){
    let table = document.getElementById("currencyPairData");
    let totalRows = table.rows.length;
    for (let i = totalRows; i > 1; i--) { //header should not be deleted
            table.deleteRow(i-1);
        }

    }
    /**
    renderTable - renders table with current modelUpdated
    */
    renderTable(){
        let allCurrencyPairsData = this._model.allCurrencyPairsData;
        let table = document.getElementById("currencyPairData");

        allCurrencyPairsData.forEach((item,index)=>{
            //header should not be recreated.
            let newRow = table.insertRow(index+1);
            //get all values for columns
            let columnData = Object.values(item);
            columnData.forEach((item,index)=>{
                if(index < columnData.length-1){
                  //create columns with data
                  let newColumn = newRow.insertCell(index);
                  newColumn.innerText = item;
                }
                else if(index == columnData.length-1){
                  //add midprice data with sparkline in last columnData
                    let sparkColumn = newRow.insertCell(index);
                    const sparkElement = document.createElement("span");
                    const sparkLine = new SparkLine(sparkElement);
                    sparkLine.draw(columnData[index].midPriceArray);
                    sparkColumn.appendChild(sparkElement);
                 }
            });
        });
    }
}
