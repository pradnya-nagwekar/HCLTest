module.exports = class MidPriceData{
    constructor(){
        this.midPriceArray = [];
    }

    updateMidPrice(bestAsk,bestBid){
        var midPrice = (parseFloat(bestAsk)+parseFloat(bestBid))/2
        //if midprice array length exceeds 30, remove first element and add new midprice to end of array.
        //This will make sure that mid price changes only over last 30 seconds are recorded.
        if(this.midPriceArray.length==30){
            this.midPriceArray.shift();
            this.midPriceArray.push(midPrice);

         }else if(this.midPriceArray.length<30){
            this.midPriceArray.push(midPrice);
         }
         //console.log(this.midPriceArray);
    }
}
