import "./TweetList.css";
import TweetCard from "./TweetCard.jsx";

function TweetList({ tweets }) {
  if (!tweets.length) {
    return <div className="empty">No tweets yet. Be the first!</div>;
  }

  return (
    <div className="list">
      {tweets.map((t) => (
        <TweetCard key={t.id} tweet={t} />
      ))}
    </div>
  );
}

export default TweetList;
