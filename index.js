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
    let defaultCoin;
    function getCoinById(id) { //It gotten the default coin to show in the view
        defaultCoin = coins.data.find(function(coin) {
            return coin.id === id;
        });
    }
    getCoinById("bitcoin");

    const rates = exchangeRates.data.rates;
    let defaultRate;
    function getRateByName(name) { //It gotten the default exchange rate to show in the view
        defaultRate = rates[name];
    }
    getRateByName("usd");

    res.render("index.ejs", { coins: coins.data, rates: exchangeRates.data, dfc: defaultCoin, dfr: defaultRate});
})

app.listen(port);