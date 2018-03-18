var CurrencyPair = require('./CurrencyPair');

module.exports = class CurrencyPairsModel{
constructor(){
  this.allCurrencyPairsList = [];
  this.allCurrencyPairsData = [];
}

isNewCurrencyPair(name){
  if(!this.allCurrencyPairsList.includes(name)){
    this.allCurrencyPairsList.push(name);
    return true;
 }
 else {
   return false
 }
}

addNewCurrencyPairsData(currencyPairObject){
  this.allCurrencyPairsData.push(currencyPairObject)
}

updateCurrencyPairsData(currencyPairObject){
//  currencyPairTobeUpdated = this.allCurrencyPairsData.find((item)=>item.name == currencyPairsObject.name);
  var currencyPairIndexToBeUpdated = this.allCurrencyPairsData.findIndex((item) =>item.name == currencyPairObject.name);
  var currencyPairTobeUpdated = new CurrencyPair(currencyPairObject.name,currencyPairObject.bestBid,currencyPairObject.bestAsk,
                                              currencyPairObject.openBid,currencyPairObject.openAsk,currencyPairObject.lastChangeAsk,
                                            currencyPairObject.lastChangeBid);
this.allCurrencyPairsData.splice(currencyPairIndexToBeUpdated,1,currencyPairTobeUpdated);

}

sortData(){

this.allCurrencyPairsData.sort(function(CPA,CPB){
  return (CPA.lastChangeBid - CPB.lastChangeBid)
});

}



}
