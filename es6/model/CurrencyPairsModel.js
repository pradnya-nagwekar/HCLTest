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
  var newCurrencyPair = new CurrencyPair(currencyPairObject.name,currencyPairObject.bestBid,currencyPairObject.bestAsk,
                                              currencyPairObject.openBid,currencyPairObject.openAsk,currencyPairObject.lastChangeAsk,
                                            currencyPairObject.lastChangeBid);
  this.allCurrencyPairsData.push(newCurrencyPair)
}

updateCurrencyPairsData(currencyPairObject){
  var currencyPairTobeUpdated = this.allCurrencyPairsData.find((item)=>item.name == currencyPairObject.name);
  var currencyPairIndexToBeUpdated = this.allCurrencyPairsData.findIndex((item) =>item.name == currencyPairObject.name);
  /*var currencyPairTobeUpdated = new CurrencyPair(currencyPairObject.name,currencyPairObject.bestBid,currencyPairObject.bestAsk,
                                              currencyPairObject.openBid,currencyPairObject.openAsk,currencyPairObject.lastChangeAsk,
                                            currencyPairObject.lastChangeBid);*/
currencyPairTobeUpdated.bestBid = currencyPairObject.bestBid;
currencyPairTobeUpdated.bestAsk = currencyPairObject.bestAsk;
currencyPairTobeUpdated.openBid = currencyPairObject.openBid;
currencyPairTobeUpdated.openAsk = currencyPairObject.openAsk;
currencyPairTobeUpdated.lastChangeAsk = currencyPairObject.lastChangeAsk;
currencyPairTobeUpdated.lastChangeBid = currencyPairObject.lastChangeBid;

this.allCurrencyPairsData.splice(currencyPairIndexToBeUpdated,1,currencyPairTobeUpdated);

}

sortData(){

this.allCurrencyPairsData.sort(function(CPA,CPB){
  return (CPA.lastChangeBid - CPB.lastChangeBid)
});

}

updateMidPriceArray(){
    self = this;
    var currencyList = self.allCurrencyPairsData;
    setInterval(function(){
    //  for(var i=0;i<self.allCurrencyPairsData.length;i++){
          //for(var j =0;i<self.midPriceData.length;j++){
          //  if(self.allCurrencyPairsData[i].name == self.midPriceData[j].name){
            //var index = self.midPriceData.findIndex((item)=>item.name = self.allCurrencyPairsData[i].name)
            //    self.midPriceData[index].updateMidPrice(self.allCurrencyPairsData[i].bestAsk,self.allCurrencyPairsData[i].bestBid)
            //}

    for(var i=0;i<currencyList.length;i++){
    currencyList[i].midPriceData.updateMidPrice(currencyList[i].bestBid,currencyList[i].bestAsk);
    }


  },1000);

 }

//}
}
