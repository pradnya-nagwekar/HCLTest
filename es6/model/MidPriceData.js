module.exports = class MidPriceData{
    constructor(){
        this.midPriceArray = [];
    }
    /**
    updateMidPrice-updates mid price array with new mid price value
    These values are sent every second. Mid price is calculated by adding bestBid to bestAsk
    and dividing by 2. At any point, if array length exceeds 30, first item is array is removed
    and new item is added at the end.
    @param-{string}:bestAsk- best Ask value for currency pair
    @param-{string}:bestBid - best Bid value for currency pair
    */
    updateMidPrice(bestAsk,bestBid){
        let midPrice = (parseFloat(bestAsk)+parseFloat(bestBid))/2;
        if(this.midPriceArray.length==30){
            this.midPriceArray.shift();
            this.midPriceArray.push(midPrice);
         }else if(this.midPriceArray.length<30){
            this.midPriceArray.push(midPrice);
         }
    }
}
