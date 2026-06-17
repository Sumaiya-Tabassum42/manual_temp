const N8N_WEBHOOK_URL =
  "https://n8n.mysoftheaven.com/webhook/contemporary-card";


export async function generateCard(articleUrl) {

  console.log("Sending to n8n:", articleUrl);


  const response = await fetch(
    N8N_WEBHOOK_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        article_url: articleUrl,
      }),
    }
  );


  console.log("n8n response status:", response.status);


  const data = await response.json();


  console.log("n8n data:", data);


  return data;
}