/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false
var currencyPairList = [];
var dataObject = {};
var fulldata = [];
var compareCurrencyPair = function(a,b){
	return a.lastChangeBid - b.lastChangeBid;
}

function isNewCurrencyPair(name){
		 if(!currencyPairList.includes(name)){
			 currencyPairList.push(name);
			 return true;			 
		}
		else {
			return false
		}
}

function addNewRow(data){
	
	
	var columnData = Object.values(data);
	var newRow = document.createElement('tr');
	for(i=0;i<columnData.length;i++){
		var cell = newRow.insertCell(i);
		cell.innerHTML = columnData[i];		
	}
	var table = document.getElementById("currencyPairData");
	var rows = table.getElementsByTagName("tr");
	var r = rows[rows.length - 1];
	r.parentNode.insertBefore(newRow, r);
	
	
}




function updateCurrencyPair(data){
		updateIndex = fulldata.findIndex((item) =>item.name == data.name);
		var columnData = Object.values(data);
		var newRow = document.createElement('tr');
		for(i=0;i<columnData.length;i++){
		var cell = newRow.insertCell(i);
		cell.innerHTML = columnData[i];		
		}
		var table = document.getElementById("currencyPairData");
		var rows = table.getElementsByTagName("tr");
		//var r = rows[updateIndex];
		//r.parentNode.deleteRow(updateIndex);
		table.deleteRow(updateIndex);
		var r = rows[updateIndex];
		r.parentNode.insertBefore(newRow,r);
		
	
	
	
}



const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url);
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  
 client.subscribe("/fx/prices",function(data){
		var message = JSON.parse(data.body);	 
		
if(isNewCurrencyPair(message.name)){
dataObject = {
	"name": message.name,
	"bestBid": message.bestBid,
	"bestAsk": message.bestAsk,
	"openBid": message.openBid,
	"openAsk": message.openAsk,
	"lastChangeAsk": message.lastChangeAsk,
	"lastChangeBid": message.lastChangeBid
}



fulldata.push(dataObject);
//fulldata.sort(compareCurrencyPair);
console.log(fulldata);

addNewRow(dataObject);


}
else{
	currencyPair = fulldata.find((item)=>item.name == message.name)
	if(currencyPair.lastChangeBid < message.lastChangeBid){
		currencyPair.bestBid = message.bestBid;
		currencyPair.lastChangeBid = message.lastChangeBid;
		currencyPair.bestAsk = message.bestAsk;		
		currencyPair.openBid = message.openBid;
		currencyPair.openAsk = message.openAsk
		currencyPair.lastChangeAsk = message.lastChangeAsk;
		updateIndex = fulldata.findIndex((item) =>item.name == message.name);
		fulldata.splice(updateIndex,1,currencyPair);
		console.log(fulldata);
		updateCurrencyPair(currencyPair);
	}
	
	//fulldata.sort(compareCurrencyPair)
	
	//
	
	
	
}



});
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})



const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])