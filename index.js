/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')


CurrencyPairModel = require('./es6/model/CurrencyPairsModel');
DataGrid = require('./es6/view/DataGrid');
MidPriceData = require('./es6/model/MidPriceData');



// Change this to get detailed logging from the stomp library
global.DEBUG = false
currencyPairsModel = new CurrencyPairModel();
dataGrid = new DataGrid(currencyPairsModel);

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url);

//update midprice every second
currencyPairsModel.updateMidPriceArray();
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {

 client.subscribe("/fx/prices",function(data){

		const message = JSON.parse(data.body);

    //check if message is for a new currency pair or already existing currency pair
		if(currencyPairsModel.isNewCurrencyPair(message.name)){
      //add new currency pair
			currencyPairsModel.addNewCurrencyPairsRecord(message);
		}
		else {
      //update exisitng currency pair
			currencyPairsModel.updateCurrencyPairsRecord(message);
		}

});
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})



const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])
