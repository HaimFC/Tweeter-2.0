import "./TweetCard.css";

function TweetCard({ tweet }) {
  return (
    <article className="card">
      <header className="card-head">
        <span className="card-user">{tweet.userName}</span>
        <time className="card-date" dateTime={tweet.date}>
          {new Date(tweet.date).toLocaleString()}
        </time>
      </header>
      <p className="card-text">{tweet.content || <i>(empty)</i>}</p>
    </article>
  );
}

export default TweetCard;
