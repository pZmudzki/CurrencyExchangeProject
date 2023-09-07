import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.exchangeratesapi.io/v1/";
const API_KEY = "040567a8c7de5496e88817165f583ccd";

const API_URL2 = "https://v6.exchangerate-api.com/v6/55c6b9038b481972059cf568";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "symbols?access_key=" + API_KEY);
    // console.log(response.data.symbols);
    const result = response.data.symbols;
    const keys = Object.keys(result);
    // const values = Object.values(result);
    // console.log(values);
    // console.log(keys);
    // keys.forEach((key, index) => {
    //   console.log(`${key}: ${result[key]}`);
    // });
    res.render("index.ejs", { result: result, keys: keys });
  } catch (error) {
    console.log("error");
  }
});

app.post("/", async (req, res) => {
  // const amount = req.body.amount;
  // console.log(req.body);
  try {
    const responseSymbols = await axios.get(
      API_URL + "symbols?access_key=" + API_KEY
    );
    // console.log(response.data.symbols);
    const result = responseSymbols.data.symbols;
    const keys = Object.keys(result);
    // console.log(req.body);

    // CONVERTING
    const baseCurr = req.body.fromCurrency;
    const targetCurr = req.body.toCurrency;
    const amount = req.body.amount;

    const responseConvert = await axios.get(
      API_URL2 + "/pair/" + baseCurr + "/" + targetCurr + "/" + amount
    );

    const conversionRate = responseConvert.data.conversion_rate;
    const conversionResult = responseConvert.data.conversion_result;

    res.render("index.ejs", {
      result: result,
      keys: keys,
      baseCurr: baseCurr,
      targetCurr: targetCurr,
      amount: amount,
      conversionRate: conversionRate,
      conversionResult: conversionResult,
    });
  } catch (error) {
    console.log("error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
