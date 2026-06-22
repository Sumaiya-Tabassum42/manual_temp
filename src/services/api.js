const API_URL = "http://localhost:3000/generate-card";


export async function generateCard(articleUrl) {

  console.log("Sending to backend:", articleUrl);


  const response = await fetch(
    API_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        articleUrl: articleUrl,
      }),
    }
  );


  const data = await response.json();

  console.log("Backend response:", data);


  if (!response.ok) {
    throw new Error(data.error || "Backend error");
  }


  return data;
}