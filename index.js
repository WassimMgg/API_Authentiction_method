import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "wassim";
const yourPassword = "mgg";
const yourAPIKey = "12484673-7a7a-4d71-bc3b-35b8f9f692cf";
const yourBearerToken = "fe98a212-370c-4758-bd47-98f1e0fc37cc";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = response.data;

    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});



app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint

  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {},
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.status(404).send(error.message);
  };
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  try {
    const response = await axios.get(" https://secrets-api.appbrewery.com/filter?score=5&apiKey=" + yourAPIKey);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

const config = {
  headers: {
    Authorization: `Bearer ${yourBearerToken}`
  }
};

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/2", config);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
