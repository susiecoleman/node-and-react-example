import React, { useState, useEffect, FormEvent } from 'react';

const callApi = async () => {
  const response = await fetch('/api/greet');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

const App: React.FC = () => {
  const [response, setResponse] = useState('');
  const [post, setPost] = useState('');
  const [responseToPost, setResponseToPost] = useState('');

  useEffect(() => {
    callApi()
      .then(res => setResponse(res.express))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post }),
    });
    const body = await response.text();

    setResponseToPost(body);
  };

  return (
    <div className="App">
      <p>{response}</p>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input
          type="text"
          value={post}
          onChange={e => setPost(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{responseToPost}</p>
    </div>
  );
};

export default App;
