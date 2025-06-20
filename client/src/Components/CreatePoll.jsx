import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function CreatePoll() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  const validInputs = () => {
    const errs = [];
    if (!question.trim()) errs.push('Question cannot be empty!');
    if (!option1.trim() || !option2.trim() || !option3.trim() || !option4.trim())
      errs.push('All options must be filled!');
    const normalizedOptions = [option1, option2, option3, option4].map((op) =>
      op.trim().toLowerCase()
    );
    if (new Set(normalizedOptions).size !== 4)
      errs.push('Options must be unique!');
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');
    const validationErrors = validInputs();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await axios.put('http://localhost:8000/polls/create', {
        question,
        option1,
        option2,
        option3,
        option4,
      });
      setSuccess('Poll created successfully!');
      setQuestion('');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
      setTimeout(() => {
        navigate('/view');
      }, 1000);
    } catch (error) {
      setErrors(['Failed to create poll.']);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>Question</label>
        <textarea
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <label>Option1</label>
        <input
          type="text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        />
        <label>Option2</label>
        <input
          type="text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />
        <label>Option3</label>
        <input
          type="text"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        />
        <label>Option4</label>
        <input
          type="text"
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
        />
        <button type="submit" disabled={validInputs().length > 0}>
          Post
        </button>
      </form>
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </section>
  );
}
