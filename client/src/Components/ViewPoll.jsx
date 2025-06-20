import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ViewPoll() {
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  const fetchPoll = async () => {
    setLoading(true);
    setErrors([]);
    try {
      const res = await axios.get('http://localhost:8000/polls/fetch');
      setPoll(res.data);
      setSuccess('Poll loaded successfully!');
    } catch (err) {
      setErrors(['Failed to fetch poll. Try again.']);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  const options = [
    { text: poll?.option1, votes: poll?.option1Votes, percentage: poll?.option1Percentage },
    { text: poll?.option2, votes: poll?.option2Votes, percentage: poll?.option2Percentage },
    { text: poll?.option3, votes: poll?.option3Votes, percentage: poll?.option3Percentage },
    { text: poll?.option4, votes: poll?.option4Votes, percentage: poll?.option4Percentage }
  ];

  return (
    <section>
      <h2>Poll Results</h2>

      {loading && <p>Loading...</p>}

      {!loading && errors.length > 0 && (
        <div className="error">
          {errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
          <button onClick={fetchPoll}>Retry</button>
        </div>
      )}

      {!loading && poll && (
        <div className="poll-results">
          <h3>{poll.question}</h3>
          {options.map((opt, idx) => (
            <div className="result-bar" key={idx}>
              <div className="result-header">
                <strong>{opt.text}</strong>
                <span>{opt.votes} votes</span>
                <span>{opt.percentage?.toFixed(2)}%</span>
              </div>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{ width: `${opt.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {success && <div className="success">{success}</div>}
    </section>
  );
}
