module.exports = class CurrencyPair {
  constructor(name,bestBid,bestAsk,openBid,openAsk,lastChangeAsk,lastChangeBid) {
    this.name = name;
    this.bestBid = bestBid;
    this.bestAsk =bestAsk;
    this.openBid = openBid;
    this.openAsk = openAsk;
    this.lastChangeAsk=lastChangeAsk;
    this.lastChangeBid= lastChangeBid;
  }

}
