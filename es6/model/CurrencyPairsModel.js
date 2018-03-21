const CurrencyPair = require('./CurrencyPair');
const Event = require('../Event');

module.exports = class CurrencyPairsModel{
    constructor(){
        this.allCurrencyPairsData = [];
        //event for mode updates
        this.modelUpdated = new Event(this);
    }

    /**
    isNewCurrencyPair-checks if given currency pair is new or existing currency CurrencyPair
    @param {string} name- the currency pair name to be checked
    */
    isNewCurrencyPair(name){
        return this.allCurrencyPairsData.find((item)=>item.name == name)?false:true;
    }

    /**
    addNewCurrencyPairsRecord -add new currency pair record model
    @param{Object}currencyPair - stomp message object recieved.
    */
    addNewCurrencyPairsRecord(currencyPair){
        //using destructuring to call CurrencyPair construct
        let newCurrencyPair = new CurrencyPair(currencyPair);
        this.allCurrencyPairsData.push(newCurrencyPair);
        //sort data after update
        this._sortData();
        //notify all observers for model updated
        this.modelUpdated.notify();
    }
    /**
    updateCurrencyPairsRecord - updates existing currency pair object in model
    @param{Object}-currencyPair:Object - stomp message object recieved.
    */
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
        this._sortData();
        this.modelUpdated.notify();
    }

    /**
    _sortData()-sorts model data in ascending order of lastChangeBid
    */
    _sortData(){
        this.allCurrencyPairsData.sort((a,b)=>a.lastChangeBid - b.lastChangeBid)
    }

    /**
    updateMidPriceArray()-updates midPriceArray array of each Currency Pair object every second
    Takes latest bestBid and bestAsk vales of each currency pair object updates mid price array
    of each item is allCurrencyPairsData.
    */
    updateMidPriceArray(){
        setInterval(()=>{
            //for every second, for every currency pair, update midPrice value.
            this.allCurrencyPairsData.forEach(item=>{
               item.midPriceData.updateMidPrice(item.bestBid,item.bestAsk);
            });
        },1000);
     }

}
