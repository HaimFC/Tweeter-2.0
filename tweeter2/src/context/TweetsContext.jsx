import { createContext, useContext, useEffect, useState } from "react";
import { fetchTweets, createTweet } from "../lib/api";
import { useAuth } from "./AuthContext";

export const TweetsContext = createContext();

export function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  // ניתן לבטל את זה ע"י שינוי לערך false
  const enablePolling = true;
  const pollingIntervalMs = 60000; // דקה אחת

  const getTweets = async () => {
    setLoading(true);
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
    if (!user) return;

    getTweets();

    let interval;
    if (enablePolling) {
      interval = setInterval(getTweets, pollingIntervalMs);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user]);

  const addTweet = async (content) => {
    const userName = user?.email || "Guest";
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
