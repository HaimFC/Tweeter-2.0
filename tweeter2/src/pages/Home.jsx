import TweetForm from "../components/TweetForm.jsx";
import TweetList from "../components/TweetList.jsx";
import { useTweets } from "../context/TweetsContext.jsx";
import "./Home.css";

function Home() {
  const { tweets, addTweet, loading, posting, error } = useTweets();

  const handleAddTweet = (content) => {
    addTweet(content);
  };

  return (
    <div className="home">
      <div className="home-content">
        {error && <div className="alert error">⚠ {error}</div>}

        {loading && (
          <div className="loading-wrapper">
            <div className="loader" />
            <p className="loading-text">Loading...</p>
          </div>
        )}

        <TweetForm onAdd={handleAddTweet} disabled={loading || posting} />

        {!loading && <TweetList tweets={tweets} />}
      </div>
    </div>
  );
}

export default Home;
