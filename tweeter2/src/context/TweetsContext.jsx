import { createContext, useContext, useEffect, useState, useRef } from "react";
import { fetchTweets, createTweet } from "../lib/api";
import { useAuth } from "./AuthContext";

export const TweetsContext = createContext();

export function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useAuth();

  const TWEETS_PER_PAGE = 10;

  const getTweets = async (append = false) => {
    setLoading(true);
    try {
      const data = await fetchTweets(page, TWEETS_PER_PAGE);
      if (data.length < TWEETS_PER_PAGE) setHasMore(false);
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTweets((prev) => (append ? [...prev, ...sorted] : sorted));
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
  }, [user]);

  useEffect(() => {
    document.body.style.cursor = loading ? "wait" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [loading]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page === 1) return;
    getTweets(true);
  }, [page]);

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
    <TweetsContext.Provider
      value={{ tweets, loading, posting, error, addTweet, loadMore, hasMore }}
    >
      {children}
    </TweetsContext.Provider>
  );
}

export function useTweets() {
  return useContext(TweetsContext);
}
