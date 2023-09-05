import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.exchangeratesapi.io/v1/";
const API_KEY = "040567a8c7de5496e88817165f583ccd";

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
    res.render("index.ejs", { content: error.response.data });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
