import { useState } from "react";
import "./TweetForm.css";

const MAX_CHARS = 140;

function TweetForm({ onAdd, disabled }) {
  const [text, setText] = useState("");

  const remaining = MAX_CHARS - text.length;
  const overLimit = remaining < 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (overLimit || !text.trim() || disabled) return;
    await onAdd(text.trim());
    setText("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        className={`form-textarea ${overLimit ? "form-textarea--error" : ""}`}
        placeholder="What you have in mind..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      {overLimit && (
        <div className="form-error">
          The tweet can't contain more than 140 chars.
        </div>
      )}
      <div className="form-actions">
        <span className={`char-counter ${overLimit ? "char-counter--bad" : ""}`}>
          {Math.max(remaining, 0)} left
        </span>
        <button
          type="submit"
          className="btn"
          disabled={overLimit || !text.trim() || disabled}
        >
          {disabled ? "Posting..." : "Tweet"}
        </button>
      </div>
    </form>
  );
}

export default TweetForm;
