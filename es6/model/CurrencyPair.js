var MidPriceData = require('./MidPriceData');
module.exports = class CurrencyPair {
  constructor({name,bestBid,bestAsk,lastChangeAsk,lastChangeBid}) {
    this.name = name;
    this.bestBid = bestBid;
    this.bestAsk =bestAsk;
    this.lastChangeAsk=lastChangeAsk;
    this.lastChangeBid= lastChangeBid;
    this.midPriceData = new MidPriceData();
  }
}
