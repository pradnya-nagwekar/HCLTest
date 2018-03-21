
describe("Testing es6 classes",()=>{

    describe("Testing class MidPriceData",()=>{
        const MidPriceData = require('../../es6/model/MidPriceData');
        let midPrice = new MidPriceData()
        it("Test MidPriceData object initialization",()=>{
            expect(midPrice.midPriceArray).toEqual([]);
        });

        it("Testing updateMidPrice method",()=>{
            midPrice.updateMidPrice(12.3,34.5);
            expect(midPrice.midPriceArray.length).toEqual(1);
        });

    });

    describe("Testing class CurrencyPair",()=>{
        const CurrencyPair = require('../../es6/model/CurrencyPair');
        let currencyPair = new CurrencyPair({name:'currencyPair',bestBid:'43.5', bestAsk:'45.6',
                                             lastChangeAsk:'45.4',lastChangeBid:'76.5'});
        it("Test CurrencyPair object initialization",()=>{
            expect(currencyPair.name).toEqual('currencyPair');
            expect(currencyPair.bestBid).toEqual('43.5');
            expect(currencyPair.bestAsk).toEqual('45.6');
            expect(currencyPair.lastChangeAsk).toEqual('45.4');
            expect(currencyPair.lastChangeBid).toEqual('76.5');
        });

    });

    /*describe("Testing class CurrencyPairsModel",()=>{
      const CurrencyPairsModel = require('../../es6/model/CurrencyPairsModel');

      let currencyPairsModel = new CurrencyPairsModel()

      it("Test CurrencyPairsModel initialization",()=>{
        expect(currencyPairsModel.allCurrencyPairsData).toEqual([]);
      });

      it("Test isNewCurrencyPair",()=>{
        currencyPairsModel.allCurrencyPairsData.push({name:'a'});
      ///  let resultTrue = currencyPairsModel.isNewCurrencyPair({name:"d"});
      //  let resultFalse = currencyPairsModel.isNewCurrencyPair({name:"a"});
      //  console.log(resultTrue);
      //  console.log(resultFalse);

      //  expect(resultTrue).toBeTruthy();
//expect(resultFalse).toBeFalsy();
      });


    });*/

});
