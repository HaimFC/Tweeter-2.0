import { supabase } from "./supabaseClient";

export async function fetchTweets(page = 1, limit = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("Tweets")
    .select("*")
    .range(from, to)
    .order("date", { ascending: false });

  if (error) throw new Error(error.message || "Failed to fetch tweets");

  return data;
}

export async function createTweet(tweet) {
  const { data, error } = await supabase
    .from("Tweets")
    .insert([tweet]) 
    .select();      

  if (error) {
    throw new Error(error.message || "Failed to create tweet");
  }

  return data;
}
