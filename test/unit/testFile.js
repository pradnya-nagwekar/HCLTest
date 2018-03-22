
describe("Testing es6 classes",()=>{

    describe("Testing class MidPriceData",()=>{
        const MidPriceData = require('../../es6/model/MidPriceData');
        let midPrice;
        beforeEach(()=>{
          midPrice = new MidPriceData();
        })
        afterEach(()=>{
          midPrice = undefined;
        })
        it("Testing midprice initialization",()=>{
            expect(midPrice.midPriceArray).toEqual([]);
        })
        it("Testing updateMidPrice method",()=>{
            midPrice.updateMidPrice(12.3,34.5);
            expect(midPrice.midPriceArray.length).toEqual(1);
        });
    });

    describe("Testing class CurrencyPair",()=>{
        const CurrencyPair = require('../../es6/model/CurrencyPair');

        it("Test CurrencyPair object initialization",()=>{
          let currencyPair = new CurrencyPair({name:'currencyPair',bestBid:'43.5', bestAsk:'45.6',
                                               lastChangeAsk:'45.4',lastChangeBid:'76.5'});
            expect(currencyPair.name).toEqual('currencyPair');
            expect(currencyPair.bestBid).toEqual('43.5');
            expect(currencyPair.bestAsk).toEqual('45.6');
            expect(currencyPair.lastChangeAsk).toEqual('45.4');
            expect(currencyPair.lastChangeBid).toEqual('76.5');
        });
    });

    describe("Testing class CurrencyPairsModel",()=>{
      const CurrencyPairsModel = require('../../es6/model/CurrencyPairsModel');
      let currencyPairsModel;
      beforeEach(()=>{
        currencyPairsModel = new CurrencyPairsModel();
      });
      afterEach(()=>{
        currencyPairsModel = undefined;
      });
      it("Test CurrencyPairsModel initialization",()=>{
        expect(currencyPairsModel.allCurrencyPairsData).toEqual([]);
      });
      it("Test isNewCurrencyPair method",()=>{
          currencyPairsModel.allCurrencyPairsData.push({name:'a'});
          let resultTrue = currencyPairsModel.isNewCurrencyPair("d");
          let resultFalse = currencyPairsModel.isNewCurrencyPair("a");
          expect(resultTrue).toBeTruthy();
          expect(resultFalse).toBeFalsy();
      });
      it("Test if sortData method is getting called",()=>{
        spyOn(currencyPairsModel,"sortData");
        //calling addNewCurrencyPairsRecord method
        currencyPairsModel.addNewCurrencyPairsRecord({name:'currencyPair',bestBid:'43.5', bestAsk:'45.6',
                                             lastChangeAsk:'45.4',lastChangeBid:'76.5'});
        expect(currencyPairsModel.sortData).toHaveBeenCalled();
        //calling updateCurrencyPairsRecord method
        currencyPairsModel.updateCurrencyPairsRecord({name:'currencyPair',bestBid:'43.5', bestAsk:'95.6',
                                             lastChangeAsk:'4.4',lastChangeBid:'66.5'});
        expect(currencyPairsModel.sortData).toHaveBeenCalled();
      })
   });
});
