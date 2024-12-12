import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "gahana";
const yourPassword = "sooraj";
const yourAPIKey = "a0a67265-b645-44ed-8177-f1634f64cc5c";
const yourBearerToken = "039a70c2-d514-4312-8c52-52a65e993ccb";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    const response = await axios.get(API_URL + "random");
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try {
    const response = await axios.get(API_URL + "all?page=1", {
      auth: { username: yourUsername, password: yourPassword },
    });
    res.render("index.ejs", {
      content: JSON.stringify(response.data),
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  try {
    const result = await axios.get(
      API_URL + `filter?score=5&apiKey=${yourAPIKey}`,
      {}
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the  endpoint
  try {
    const result = await axios.get(API_URL+`secrets/42`,{
      headers:{
        Authorization: `Bearer ${yourBearerToken}`
      }
    })
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch (err) {
    console.error(err.message);
    
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
