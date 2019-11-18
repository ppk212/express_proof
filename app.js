var express = require('express');
var path = require('path');
var app = express();
var Caver = require('caver-js');

const cav = new Caver('https://api.baobab.klaytn.net:8651');

const ca = '0x95472375f3aFB033572d8C0266A8C664dDA1b0F3';

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_customer",
				"type": "address"
			},
			{
				"name": "_date",
				"type": "uint256"
			}
		],
		"name": "insure",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_customer",
				"type": "address"
			},
			{
				"name": "_insure_date",
				"type": "uint256"
			}
		],
		"name": "setInsureDate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_customer",
				"type": "address"
			},
			{
				"name": "_car_name",
				"type": "string"
			},
			{
				"name": "_car_price",
				"type": "uint256"
			},
			{
				"name": "_car_class",
				"type": "uint8"
			},
			{
				"name": "_car_cc",
				"type": "uint256"
			},
			{
				"name": "_model_year",
				"type": "uint256"
			}
		],
		"name": "createCar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_customer",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_birth",
				"type": "uint256"
			}
		],
		"name": "createMember",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customer",
				"type": "address"
			}
		],
		"name": "getInsuranceInfo",
		"outputs": [
			{
				"name": "finalScore",
				"type": "uint256"
			},
			{
				"name": "accident_count",
				"type": "uint256"
			},
			{
				"name": "insur_date",
				"type": "uint256"
			},
			{
				"name": "_recent_pay_day",
				"type": "uint256"
			},
			{
				"name": "violation_count",
				"type": "uint256"
			},
			{
				"name": "car",
				"type": "uint8"
			},
			{
				"name": "model_year",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "payAuto",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_customer",
				"type": "address"
			},
			{
				"name": "_speeding_rate",
				"type": "uint256"
			},
			{
				"name": "_sharp_turn_rate",
				"type": "uint256"
			},
			{
				"name": "_abrupt_deceleration_rate",
				"type": "uint256"
			},
			{
				"name": "_rapid_acceleration_rate",
				"type": "uint256"
			}
		],
		"name": "setScore",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "payFirst",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "returnBalance",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customer",
				"type": "address"
			}
		],
		"name": "getCustomerInfo",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "birth",
				"type": "uint256"
			},
			{
				"name": "insur_date",
				"type": "uint256"
			},
			{
				"name": "violation_count",
				"type": "uint256"
			},
			{
				"name": "accident_count",
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
				"name": "_customer",
				"type": "address"
			}
		],
		"name": "getCarInfo",
		"outputs": [
			{
				"name": "car_name",
				"type": "string"
			},
			{
				"name": "car_price",
				"type": "uint256"
			},
			{
				"name": "car_class",
				"type": "uint8"
			},
			{
				"name": "car_cc",
				"type": "uint256"
			},
			{
				"name": "model_year",
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
				"name": "_customer",
				"type": "address"
			}
		],
		"name": "getTotalInsurance",
		"outputs": [
			{
				"name": "finalScore",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customer",
				"type": "address"
			}
		],
		"name": "getScore",
		"outputs": [
			{
				"name": "total",
				"type": "uint256"
			},
			{
				"name": "speeding_rate",
				"type": "uint256"
			},
			{
				"name": "sharp_turn_rate",
				"type": "uint256"
			},
			{
				"name": "abrupt_deceleration_rate",
				"type": "uint256"
			},
			{
				"name": "rapid_acceleration_rate",
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
				"name": "_customer",
				"type": "address"
			}
		],
		"name": "getBirth",
		"outputs": [
			{
				"name": "_birth",
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
				"name": "_customer",
				"type": "address"
			}
		],
		"name": "getIsSetted",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

const belt_contract = new cav.klay.Contract(abi, ca);

var wallet;

var auth = {
    accessType: 'keystore',
    keystore: '',
    password: ''
};

app.use(express.static(path.join('assets')));

// app.get('/test', async (req, res) => {
    
//     console.log('test start');
    
//     const blockNumber = await cav.klay.getBlockNumber();
//     console.log('test blockNumber =>', blockNumber);

//     res.set("Content-Type", "text/plain");
//     res.status(200);
//     res.send("" + blockNumber);
// });

app.get('/login', async (req, res) => {
    console.log('login start');
    console.log(req.query.keystore);
    console.log(req.query.password);

    var privateKey;
    try {
        console.log("decrypt before");
        privateKey = await cav.klay.accounts.decrypt(req.query.keystore, req.query.password).privateKey;
        console.log("decrypt success");

        console.log("Private Key = " + privateKey);
        const walletInstance = await cav.klay.accounts.privateKeyToAccount(privateKey);
        console.log(walletInstance);

        cav.klay.accounts.wallet.add(walletInstance);
        wallet = walletInstance;
        console.log("wallet = walletInstance");

        res.set("Content-Type", "text/plain");
        res.status(200);
        res.send("" + walletInstance.address);

    } catch(e) {
        res.set("Content-Type", "text/plain");
        res.status(200);
        res.send("Password is wrong!");
    } 
});

app.get('/viewCarInfo', async (req, res) => {
    try {
        await belt_contract.methods.getCarInfo(wallet.address).call( function(error, result) {

            var json_result = JSON.stringify(result);

            res.set("Content-Type", "text/plain");
            res.status(200);
            res.send("" + json_result);
        });
    } catch(e) {
        console.log(e);
    }
});

app.get('/editCarInfo', async (req, res) => {
    try {
        await belt_contract.methods.createCar(wallet.address, req.query.car_name, req.query.car_price, req.query.car_type, req.query.car_cc, req.query.made_year).send({
            from: wallet.address,
            gas: 1500000,
            value: 0,
        }, function(error, result) {
            console.log(res);
            res.set("Content-Type", "text/plain");
            res.status(200);
            res.send("수정완료");
        });
    } catch(e) {
        console.log(e);
    }
});

app.get('/getIsSetted', async (req, res) => {
    try {
        await belt_contract.methods.getIsSetted(wallet.address).call( function(error, result) {
            res.set("Content-Type", "text/plain");
            res.status(200);
            res.send(result);
        });
    } catch(e) {
        console.log(e);
    }
}),

app.get('/getBirth', async (req, res) => {
    try {
        await belt_contract.methods.getBirth(wallet.address).call( function(error, result) {
            res.set("Content-Type", "text/plain");
            res.status(200);
            res.send(result);
        });
    } catch(e) {
        console.log(e);
    }
}),

app.get('/editDrivingScore', async (req, res) => {
    try {
        await belt_contract.methods.getScore(wallet.address, req.query.speeding_rate, req.query.sharp_turn_rate, req.query.abrupt_deceleration_rate, req.query.rapid_acceleration_rate ).send({
			from: wallet.address,
			gas: 1500000,
			value: 0,
		}, function(error, result) {
            console.log(result);
            var json_result = JSON.stringify(result);

            res.set("Content-Type", "text/plain");
            res.status(200);
            res.send("" + json_result);
        });
    } catch(e) {
        console.log(e);
    }
});

app.get('/viewDrivingScore', async (req, res) => {
    try {
        await belt_contract.methods.getScore(wallet.address).call( function(error, result) {
            console.log(result);
            var json_result = JSON.stringify(result);

            res.set("Content-Type", "text/plain");
            res.status(200);
            res.send("" + json_result);
        });
    } catch(e) {
        console.log(e);
    }
});

app.get('/viewInsuranceFee', async (req, res) => {
    try {
        await belt_contract.methods.getInsuranceInfo(wallet.address).call( function(error, result) {
            console.log(result);
            var json_result = JSON.stringify(result);

            res.set("Content-Type", "text/plain");
            res.status(200);
            res.send("" + json_result);
        });
    } catch(e) {
        console.log(e);
    }
});

app.get('/insure', async (req, res) => {
    try {
        const date = new Date().format("yyyyMMdd");
        console.log(date);
        alert(date);

        await belt_contract.methods.getInsuranceInfo(wallet.address).call( function(error, result) {
            console.log(result);
            var json_result = JSON.stringify(result);

            res.set("Content-Type", "text/plain");
            res.status(200);
            res.send("" + json_result);
        });
    } catch(e) {
        console.log(e);
    }
});

app.get('/doInsure', async (req, res) => {
    try {
		await belt_contract.methods.insure(wallet.address, req.query.date).send({
			from: wallet.address,
			gas: 1500000,
			value: 0,
		}, function(error, result) {
			console.log(result);
	
			res.set("Content-Type", "text/plain");
			res.status(200);
			res.send("" + result);
		}); 
    } catch(e) {
		console.log(e);
		alert(e);
	}
	
});

app.get('/enroll-member', async (req,res) => {
    // 넘어온 req.query.name, req.query.birth_day를 스마트 컨트랙트로 전송
    await belt_contract.methods.createMember(wallet.address, req.query.name, req.query.birth_day).send({
        from: wallet.address,
        gas: 1500000,
        value: 0,
    }, function(error, result) {
        console.log("IN ENROLLED");
        console.log(result);
        
        res.set("Content-Type", "text/plain");
        res.status(200);
        res.send("Enroll Done!");
    });
});

app.get('/dashboard', async (req,res) =>{
    // console.log("start");
    // const contract = await cav.klay.Contract(abi);
    // console.log("contract ok");
    // const con = contract.at("0xc977136eaf1b876bcef1d1385ef3404fc863230d");
    // console.log("con ok");
    // const num = await con.getBlockNumber();
    // console.log("num ok");

    let result = {};

    result.key1 = "value1";
    result.key2 = "value2";
    result.key3 = "value3";

    res.set("Content-Type", "text/plain");
    res.status(200);
    res.send(result); // json 형태로 내려옴
    // JSON.parse
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

