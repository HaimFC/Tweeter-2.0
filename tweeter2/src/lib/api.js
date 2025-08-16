import { supabase } from "./supabaseClient";

// שליפת כל הציוצים מהשרת
export async function fetchTweets() {
  const { data, error } = await supabase
    .from("Tweets")
    .select("*")
    .order("date", { ascending: false }); // ציוצים מהחדש לישן

  if (error) {
    throw new Error(error.message || "Failed to fetch tweets");
  }

  return data;
}

// יצירת ציוץ חדש
export async function createTweet(tweet) {
  const { data, error } = await supabase
    .from("Tweets")
    .insert([tweet]) // מכניס כ-object יחיד
    .select();       // מחזיר את מה שנוצר

  if (error) {
    throw new Error(error.message || "Failed to create tweet");
  }

  return data;
}
