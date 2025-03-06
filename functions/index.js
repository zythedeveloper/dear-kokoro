/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require('express');
const cors = require('cors')
const app = express();
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const algoliasearch = require('algoliasearch')
require('dotenv').config();
app.use(express.json());
app.use(cors());

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SUPER_API)
const index = client.initIndex('journals');


const API_KEY = process.env.CHAT_API_KEY
const ALGOLIA_SEARCH_KEY= process.env.ALGOLIA_SEARCH_KEY
const QUOTE_API_KEY = process.env.QUOTE_API_KEY

app.post('/chat', async (req,res)=>{
    const options = {
        method:"POST",
        headers:{
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 500,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions',options);
        const data = await response.json();
        res.send(data);
    }
    catch(err){
        console.log(err);
    }
})

app.post('/sentiment', async (req,res)=>{
    let text = req.body.message;
    var result= sentiment.analyze(text);
    const positive = result.positive;
    
    // Use the filter method to filter the calculation array
    const filteredCalculation = result.calculation.filter(item => {
        // Check if the item's key is in the allowed array
        const key = Object.keys(item)[0];
        return positive.includes(key);
    });
    let sentimentPositiveWords=[];
    for(let i=0;i< filteredCalculation.length;i++){
        let key;
        let value;
        key=Object.keys(filteredCalculation[i]);
        value=Object.values(filteredCalculation[i])
        sentimentPositiveWords.push({ word: key[0] , score:value[0]})
    }
    result.positiveCalculation= sentimentPositiveWords;
    res.send(result);
})

// Add a route handler to the app to generate the secured key
app.post('/search', (req, res) => {
    // @ts-ignore
    const uid = req.body.uid;
  
    // Create the params object as described in the Algolia documentation:
    // https://www.algolia.com/doc/guides/security/api-keys/#generating-api-keys
    const params = {
      // This filter ensures that only documents where owner == uid will be readable
      filters: `userId:${uid}`,
      // We also proxy the uid as a unique token for this key.
      userToken: uid,
    };
  
    // Call the Algolia API to generate a unique key based on our search key
    const key = client.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params);
  
    // Then return this key as {key: '...key'}
    res.json({key});
  });
  
app.post('/journal',(req,res)=>{
    try{
        console.log(req.body.document)
        index.saveObject(
        req.body.document
      ).wait().then(()=>{
        res.sendStatus(200)
      });
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
})

app.patch('/journal',(req,res)=>{
    try{
        index.partialUpdateObject(
            req.body.document
        ).wait().then(()=>{
            res.sendStatus(200)
          });
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
})

app.delete('/journal',(req,res)=>{
    try{
        index.deleteObject(req.body.id).wait().then(()=>{
            res.sendStatus(200)
          });
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
})
app.get('/quote',async(req,res)=>{
    var category = req.query.category;

    const options = {
        method:"GET",
        headers: {
            'X-Api-Key': `${QUOTE_API_KEY}`
        }
    }
    try{
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=' + category,options);
        const data = await response.json();
        console.log(data)
        res.send(data);
    }
    catch(err){
        console.log(err)
    }
})

exports.expressAPI = onRequest(app);

