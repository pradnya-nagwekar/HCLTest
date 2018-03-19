module.exports = class MidPriceData{
 constructor(){
  this.midPriceArray = [];
 }

 updateMidPrice(bestAsk,bestBid){
var midPrice = (parseFloat(bestAsk)+parseFloat(bestBid))/2
    if(this.midPriceArray.length==30){
      this.midPriceArray.shift();
        this.midPriceArray.push(midPrice);
    }else if(this.midPriceArray.length<30){
        this.midPriceArray.push(midPrice);
    }
    console.log(this.midPriceArray);

}
}
