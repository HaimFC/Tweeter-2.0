import { useEffect, useRef } from "react";
import { useTweets } from "../context/TweetsContext";
import TweetCard from "./TweetCard";
import "./TweetList.css";

function TweetList() {
  const { tweets, loadMore, hasMore } = useTweets();
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loadMore]);

  return (
    <div className="tweet-list">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
      <div ref={loaderRef} style={{ height: "1px", visibility: "hidden" }} />
    </div>
  );
}

export default TweetList;
