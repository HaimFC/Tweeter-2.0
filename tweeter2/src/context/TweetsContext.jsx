import { createContext, useContext, useEffect, useState } from "react";
import { fetchTweets, createTweet } from "../lib/api";

export const TweetsContext = createContext();

export function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  const getTweets = async () => {
    try {
      const data = await fetchTweets();
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTweets(sorted);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch tweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTweets();
    const interval = setInterval(getTweets, 5000);
    return () => clearInterval(interval);
  }, []);

  const addTweet = async (content) => {
    const userName = localStorage.getItem("username") || "Guest";
    const newTweet = {
      content,
      userName,
      date: new Date().toISOString(),
    };

    setPosting(true);
    try {
      const created = await createTweet(newTweet);
      setTweets((prev) => [created[0], ...prev]);
      setError(null);
    } catch (err) {
      setError(err.message || "Error creating tweet");
    } finally {
      setPosting(false);
    }
  };

  return (
    <TweetsContext.Provider value={{ tweets, loading, posting, error, addTweet }}>
      {children}
    </TweetsContext.Provider>
  );
}

export function useTweets() {
  return useContext(TweetsContext);
}
