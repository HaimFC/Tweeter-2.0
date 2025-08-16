const BASE_URL = "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export async function fetchTweets() {
  const res = await fetch(`${BASE_URL}/Tweets?select=*`, { headers });
  if (!res.ok) {
    throw new Error("Failed to fetch tweets");
  }
  return res.json();
}

export async function createTweet(tweet) {
  const res = await fetch(`${BASE_URL}/Tweets`, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation", 
    },
    body: JSON.stringify(tweet),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to create tweet");
  }
  return res.json(); 
}
