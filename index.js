import express from "express";
import axios from "axios"

//API a usar https://currencyapi.com/docs

const app = express();
const port = 3000;
const ApiUrl = "https://api.coingecko.com/api/v3"
const apiKey = "x_cg_demo_api_key=CG-F1TnaAfdS3FyGboUQ4kEsnTt";

app.use(express.static("public"));

app.get("/", async function(req, res){
    const coins = await axios.get(ApiUrl + "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en&" + apiKey);
    const exchangeRates = await axios.get(ApiUrl + "/exchange_rates?" + apiKey);
    res.render("index.ejs", { coins: coins.data, rates: exchangeRates.data});
})

app.listen(port);