require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const OpenAI = require("openai");


const app = express();


app.use(cors());
app.use(express.json());


// OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});



// Test
app.get("/", (req, res) => {
  res.send("Backend is running");
});




// Image proxy (for html2canvas download)
app.get("/proxy-image", async (req, res) => {

  try {

    const imageUrl = req.query.url;


    if (!imageUrl) {
      return res.status(400).send("Image URL missing");
    }


    const response = await axios.get(imageUrl, {

      responseType: "arraybuffer",

      headers: {
        "User-Agent":
        "Mozilla/5.0"
      }

    });


    res.set(
      "Content-Type",
      response.headers["content-type"]
    );


    res.send(response.data);


  } catch(error) {

    console.log(
      "Image proxy error:",
      error.message
    );

    res.status(500).send("Image failed");

  }

});





// Generate card
app.post("/generate-card", async (req,res)=>{


try {


const {articleUrl}=req.body;



if(!articleUrl){

return res.status(400).json({
error:"Article URL missing"
});

}



console.log(
"Fetching:",
articleUrl
);




// Fetch page

const response = await axios.get(
articleUrl,
{

headers:{
"User-Agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
},

timeout:15000

}
);



const html=response.data;



const $=cheerio.load(html);





// TITLE

const title =

$("h1")
.first()
.text()
.trim();






// CONTENT

const content =

$("article p")
.map((i,el)=>$(el).text())
.get()
.join("\n\n");






// IMAGE EXTRACTION

let image = "";


image =

$('meta[property="og:image"]')
.attr("content")

||

$('meta[name="twitter:image"]')
.attr("content")

||

$("article img")
.first()
.attr("src")

||

"";





// Fix relative image URLs

if(image && image.startsWith("/")){

const base =
new URL(articleUrl).origin;

image =
base + image;

}





// DATE

let date = "";


date =

$('meta[property="article:published_time"]').attr("content")

||

$('meta[name="date"]').attr("content")

||

$('meta[name="pubdate"]').attr("content")

||

$('time').attr("datetime")

||

$("time").first().text().trim()

||

"";



console.log("RAW DATE:", date);

let formattedDate = "";

if (date) {

  const d = new Date(date);

  if (!isNaN(d.getTime())) {

    formattedDate = d.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

  }

}


if (!formattedDate) {

  formattedDate =
  new Date().toLocaleDateString("bn-BD", {
    day:"numeric",
    month:"long",
    year:"numeric"
  });

}


console.log(
"FORMATTED DATE:",
formattedDate
);




// SOURCE

const source =

new URL(articleUrl)
.hostname
.replace("www.","");






console.log(
"TITLE:",
title
);


console.log(
"IMAGE:",
image
);


console.log(
"DATE:",
date
);





// OpenAI Bengali headline

const aiResponse =

await client.chat.completions.create({

model:"gpt-4o-mini",


messages:[


{

role:"system",

content:

`
You are a senior Bengali newspaper editor.

Convert English sports news into professional Bengali newsroom content.

Rules:

Headline:
- Write a natural Bengali headline.
- Never translate word by word.
- Write like Prothom Alo or BBC Bangla.
- Keep it short and news-focused.
- Mention result, score, goalscorer or important event when available.

Summary:
- Write a 150-200 word Bengali summary of the article.
- Make it suitable for a news card.
- Keep it factual and easy to read.
- Write approximately 5-6 short lines.
- Do not add information that is not in the article.

Language:
- Use natural Bengali.
- Keep common international sports terms in Bengali transliteration.
  Examples:
  Champion → চ্যাম্পিয়ন
  Football → ফুটবল
  Match → ম্যাচ
  Goal → গোল
  Player → খেলোয়াড়
  Ranking → র‍্যাঙ্কিং


  Before outputting any headline:

Ask internally:
"Is this a complete, natural Bengali newsroom sentence?"

If not, rewrite fully (do not patch).

Hashtags:
- Generate 6-7 relevant hashtags.
- Hashtags must be in English.
- Use only topic-related hashtags.
- Do not use Bengali hashtags.

Return ONLY valid JSON:

{
  "headline": "",
  "summary": "",
  "hashtags": []
}
`

},


{

role:"user",

content:

`
English title:

${title}


Article:

${content.substring(0,5000)}

`

}


],


temperature:0.4


});






const aiText =
aiResponse
.choices[0]
.message
.content
.trim()
.replace(/```json/g,"")
.replace(/```/g,"");


const aiData = JSON.parse(aiText);


const banglaHeadline =
aiData.headline;


const summary =
aiData.summary;


const hashtags =
aiData.hashtags;






// FINAL IMAGE URL FOR REACT

let finalImage=image;


if(image){

const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
finalImage = `${backendUrl}/proxy-image?url=${encodeURIComponent(image)}`;
}





res.json({

headline: banglaHeadline,

summary: summary,

hashtags: hashtags,

image_url: finalImage,

date: formattedDate || date,

source: source

});




}

catch(error){


console.error(error);


res.status(500).json({

error:
error.message

});


}



});






app.listen(3000,()=>{

console.log(
"Backend running on http://localhost:3000"
);

});