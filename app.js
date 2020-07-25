var Web3 = require('web3');

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://watson.thomasrob.in:1883');
client.publish('init', 'node app online');

const { convertCSVToArray } = require('convert-csv-to-array');
const converter = require('convert-csv-to-array');

var eMethod = "init";
var placeFrom = "init";
var placeTo = "init";
var currentLoc = "init";
var weight = "init";
var refno = "init";

client.on('connect', () => {
    client.subscribe('Shipments')
  })

client.on('message', function (topic, message) {
    
    console.log("triggered");
    client.publish('init', message);
    handleMessage(topic, message);
});


var accountAddress = '0xe04078F48A7DfAc7a65De40c6bD053079f0814eD';

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://ioet.thomasrob.in:8080"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

var rpds = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_placeFrom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_placeTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_currentLoc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_weight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_refNo",
				"type": "uint256"
			}
		],
		"name": "addShipment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_shipmentId",
				"type": "uint256"
			}
		],
		"name": "shippedEvent",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shipmentId",
				"type": "uint256"
			}
		],
		"name": "get",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "placeFrom",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "placeTo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "currentLoc",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "weight",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refNo",
						"type": "uint256"
					}
				],
				"internalType": "struct Shipping.Shipment",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_refNo",
				"type": "uint256"
			}
		],
		"name": "getRef",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getShipment",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getShipments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "placeFrom",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "placeTo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "currentLoc",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "weight",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refNo",
						"type": "uint256"
					}
				],
				"internalType": "struct Shipping.Shipment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "shipmentCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "shipments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "placeFrom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "placeTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "currentLoc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "refNo",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
], '0xCD6EB5Af559fEC548e64b799561778FF3794DBA9');
var version = web3.version; // "1.0.0"
console.log(version);



function handleMessage(topic, message) {

    var msg = message.toString();
    console.log('message: ' + msg);
    
    const arrayofObjects = convertCSVToArray(msg, {
        separator: ',', 
    });

    eMethod = arrayofObjects[0][0];
   

  

    console.log('Method Called : ' + eMethod);

    if(eMethod == 'addShipment'){

        placeFrom = arrayofObjects[0][1];
        placeTo = arrayofObjects[0][2];
        currentLoc = arrayofObjects[0][3];
        weight = arrayofObjects[0][4];
        refno = arrayofObjects[0][5];

        rpds.methods.addShipment(placeFrom,placeTo,currentLoc,weight,refno).send({from: accountAddress})
                    .then(function(receipt){
                        console.log(receipt);
                    });

    }
    else if(eMethod == 'getRef'){
        refno = arrayofObjects[0][1];

        rpds.methods.getRef(refno).call({from: accountAddress}, function(error, result){

            if(!error) {
                console.log(result);     //console.log(JSON.stringify(result));
                client.publish('responseTopic', JSON.stringify(result));
                
            }
            else
                console.error(error);
        });


    }





}
/*
rpds.methods.getShipments().call({from: '0xe04078F48A7DfAc7a65De40c6bD053079f0814eD'}, function(error, result){

    if(!error) {
        console.log(result);     //console.log(JSON.stringify(result));
        
    }
    else
        console.error(error);
});
*/