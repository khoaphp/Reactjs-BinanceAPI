var express = require("express");
var app = express();
app.listen(3001);

// https://testnet.binance.vision/
const ccxt = require ('ccxt');
const binance = new ccxt.binance({
    apiKey:"",
    secret:""
});
binance.setSandboxMode(true);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.post("/balance", function(req, res){
    binance.fetchBalance().then((data)=>{
        // console.log(data.ETH);
        // console.log(data.BTC);
        // console.log(data.BNB);
        // console.log(data.USDT);
        res.json({result:true, symbols:[
            {symb:"ETH", free:data.ETH.free, used:data.ETH.used, total:data.ETH.total},
            {symb:"BTC", free:data.BTC.free, used:data.BTC.used, total:data.BTC.total},
            {symb:"BNB", free:data.BNB.free, used:data.BNB.used, total:data.BNB.total},
            {symb:"USDT",free:data.USDT.free, used:data.USDT.used, total:data.USDT.total},
        ]});
    });
});

app.post("/userSendOrder", function(req, res){
    var amount = parseFloat(req.body.amount);
    console.log(amount);
    binance.createMarketOrder("BNB/USDT", "buy", amount).then((data)=>{
        res.json(data);
    })
})