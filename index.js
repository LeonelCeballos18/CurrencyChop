import express from "express";
import axios from "axios"

//API a usar https://currencyapi.com/docs

const app = express();
const port = 3000;
const ApiUrl = "https://api.coingecko.com/api/v3"
const apiKey = "?x_cg_demo_api_key=CG-F1TnaAfdS3FyGboUQ4kEsnTt";
const config = {
    headers : { "x-cg-pro-api-key" : "CG-F1TnaAfdS3FyGboUQ4kEsnTt" }
};

app.use(express.static("public"));

app.get("/", async function(req, res){
    const result = await axios.get(ApiUrl + "/coins/list" + apiKey);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
})

app.listen(port);