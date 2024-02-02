import express from "express";
import axios from "axios"
import bodyParser from "body-parser";

//API a usar https://currencyapi.com/docs

const app = express();
const port = 3000;
const ApiUrl = "https://api.coingecko.com/api/v3"
const apiKey = "x_cg_demo_api_key=CG-F1TnaAfdS3FyGboUQ4kEsnTt";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async function(req, res){
    const coins = await axios.get(ApiUrl + "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en&" + apiKey);
    const exchangeRates = await axios.get(ApiUrl + "/exchange_rates?" + apiKey);
    res.render("index.ejs", { coins: coins.data, rates: exchangeRates.data});
})

app.post("/exchange", async function(req, res){
    try {
        const coin = req.body.selectedCoin; //Its not the ID its the value of the coin, its needed to be changed
        console.log(coin);
        //const convertion = await axios.get(ApiUrl + `/coins/${coin}?tickers=false&market_data=true&` + apiKey); //Data to get convertion
        //const coins = await axios.get(ApiUrl + "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en&" + apiKey); //All the coins
        //const exchangeRates = await axios.get(ApiUrl + "/exchange_rates?" + apiKey); //All the exchange rates
        res.render("index.ejs");
        res.redirect("/")
    } catch (error) {
        res.status(404).send(error.message);
    }
})

app.listen(port);