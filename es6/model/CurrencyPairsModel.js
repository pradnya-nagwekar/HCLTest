let CurrencyPair = require('./CurrencyPair');
let Event = require('../Event');
module.exports = class CurrencyPairsModel{
    constructor(){
        this.allCurrencyPairsData = [];
        //event for mode updates
        this.modelUpdated = new Event(this);
    }

    isNewCurrencyPair(name){
        if(this.allCurrencyPairsData.find((item)=>item.name == name)==undefined){
            return true;
        }
        else {
            return false;
        }

    }
    addNewCurrencyPairsRecord(currencyPair){
        //using destructuring to call CurrencyPair construct
        let newCurrencyPair = new CurrencyPair(currencyPair);
        this.allCurrencyPairsData.push(newCurrencyPair);

        //sort data after update
        this.sortData();
        //notify all observers for model updated
        this.modelUpdated.notify();
    }

    updateCurrencyPairsRecord(currencyPair){

        //get item to be updated
        let currencyPairTobeUpdated = this.allCurrencyPairsData.find(item =>item.name == currencyPair.name);
        //get index to be updated
        let currencyPairIndexToBeUpdated = this.allCurrencyPairsData.findIndex(item =>item.name == currencyPair.name);

        //update data except the midPriceArray
        currencyPairTobeUpdated.bestBid = currencyPair.bestBid;
        currencyPairTobeUpdated.bestAsk = currencyPair.bestAsk;
        currencyPairTobeUpdated.lastChangeAsk = currencyPair.lastChangeAsk;
        currencyPairTobeUpdated.lastChangeBid = currencyPair.lastChangeBid;

        //update currencyPair in model
        this.allCurrencyPairsData.splice(currencyPairIndexToBeUpdated,1,currencyPairTobeUpdated);

        //sort data after update
        this.sortData();
        this.modelUpdated.notify();

    }

    sortData(){
        this.allCurrencyPairsData.sort((a,b)=>a.lastChangeBid - b.lastChangeBid)
    }

    updateMidPriceArray(){
        setInterval(()=>{
          //for every second, for every currency pair, update midPrice value.
            let currencyList = this.allCurrencyPairsData;
            let len = currencyList.length;
            for(var i=0;i<len;i++){
                currencyList[i].midPriceData.updateMidPrice(currencyList[i].bestBid,currencyList[i].bestAsk);
             }

        },1000)

     }

}
